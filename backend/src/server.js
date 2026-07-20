import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { scryptSync, timingSafeEqual } from 'node:crypto';
import jwt from 'jsonwebtoken';
import OpenAI from 'openai';
import { z } from 'zod';
import { hasDirectCrisisLanguage, crisisReply } from './safety.js';
import { MIMI_SYSTEM_PROMPT } from './prompt.js';

const required = ['APP_USERNAME', 'APP_PASSWORD_HASH', 'JWT_SECRET', 'OPENAI_API_KEY'];
const missing = required.filter((name) => !process.env[name]);
if (missing.length) console.warn(`Faltan variables: ${missing.join(', ')}`);

const app = express();
const port = Number(process.env.PORT || 8787);
const frontendOrigins = (process.env.FRONTEND_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.set('trust proxy', 1);
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({
  origin(origin, callback) {
    if (!origin || frontendOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Origen no autorizado.'));
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '32kb' }));

const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 8, standardHeaders: true, legacyHeaders: false });
const chatLimiter = rateLimit({ windowMs: 60 * 1000, limit: 12, standardHeaders: true, legacyHeaders: false });


function verifyPassword(password, stored) {
  if (!stored || !stored.includes(':')) return false;
  const [salt, expectedHex] = stored.split(':');
  try {
    const actual = scryptSync(password, salt, 64);
    const expected = Buffer.from(expectedHex, 'hex');
    return expected.length === actual.length && timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

function auth(req, res, next) {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ error: 'Sesión no válida.' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'La sesión terminó. Vuelve a entrar.' });
  }
}

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'El Refugio de Mimi', aiConfigured: Boolean(process.env.OPENAI_API_KEY) }));

const loginSchema = z.object({ username: z.string().min(1).max(60), password: z.string().min(1).max(200) });
app.post('/api/auth/login', loginLimiter, async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Completa los datos de acceso.' });
  const usernameOk = parsed.data.username.trim().toLocaleLowerCase('es') === process.env.APP_USERNAME?.trim().toLocaleLowerCase('es');
  const passwordOk = verifyPassword(parsed.data.password, process.env.APP_PASSWORD_HASH);
  if (!usernameOk || !passwordOk) return res.status(401).json({ error: 'El nombre o la palabra de acceso no coinciden.' });
  const token = jwt.sign({ sub: 'lourdes', name: 'Lourdes' }, process.env.JWT_SECRET, { expiresIn: '12h', issuer: 'refugio-mimi' });
  return res.json({ token, user: { name: 'Lourdes' } });
});

const chatSchema = z.object({
  message: z.string().trim().min(1).max(1200),
  history: z.array(z.object({ role: z.enum(['user', 'assistant']), content: z.string().max(1800) })).max(12).default([])
});

app.post('/api/chat', auth, chatLimiter, async (req, res) => {
  const parsed = chatSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'El mensaje no pudo procesarse.' });
  const { message, history } = parsed.data;

  if (hasDirectCrisisLanguage(message)) return res.json({ reply: crisisReply, crisis: true });

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const moderation = await client.moderations.create({ model: 'omni-moderation-latest', input: message });
    const categories = moderation.results?.[0]?.categories || {};
    const selfHarm = categories['self-harm'] || categories['self-harm/intent'] || categories['self-harm/instructions'];
    if (selfHarm) return res.json({ reply: crisisReply, crisis: true });

    const conversation = history.slice(-10).map((item) => ({ role: item.role, content: item.content }));
    if (!conversation.length || conversation.at(-1)?.content !== message) conversation.push({ role: 'user', content: message });

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || 'gpt-5-mini',
      instructions: MIMI_SYSTEM_PROMPT,
      input: conversation,
      max_output_tokens: 320,
      store: false
    });

    return res.json({ reply: response.output_text?.trim() || 'Estoy aquí contigo, mi Lourdes. Podemos ir despacito.', crisis: false });
  } catch (error) {
    console.error('Error de IA:', error?.status || error?.message || error);
    return res.status(503).json({ error: 'Mimi necesita un momentito para volver a conectarse. Prueba otra vez en unos segundos.' });
  }
});

app.use((err, _req, res, _next) => {
  console.error(err.message);
  res.status(500).json({ error: 'Ocurrió un error inesperado en el refugio.' });
});

app.listen(port, '0.0.0.0', () => console.log(`Refugio de Mimi API activo en el puerto ${port}`));
