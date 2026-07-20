import { useState } from 'react';
import MimiAvatar from './MimiAvatar.jsx';
import { api, getApiUrl, setApiUrl } from '../api.js';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('Lourdes');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showServer, setShowServer] = useState(false);
  const [server, setServer] = useState(getApiUrl());

  async function submit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await api.login(username.trim(), password);
      sessionStorage.setItem('mimi-token', data.token);
      onLogin(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function saveServer() {
    setApiUrl(server);
    try {
      await api.health();
      setError('Servidor conectado correctamente.');
      setShowServer(false);
    } catch (err) {
      setError(`Servidor guardado, pero todavía no responde: ${err.message}`);
    }
  }

  return (
    <main className="login-screen">
      <section className="login-card soft-card">
        <MimiAvatar size="medium" />
        <p className="eyebrow">Un rinconcito solo para ti</p>
        <h1>El Refugio de Mimi</h1>
        <p className="login-copy">Aquí no tienes que fingir que estás bien. Puedes entrar despacito.</p>

        <form onSubmit={submit} className="login-form">
          <label>
            Tu nombre
            <input autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </label>
          <label>
            Palabra de acceso
            <input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <button className="primary-button" disabled={loading}>{loading ? 'Abriendo el refugio…' : 'Entrar con Mimi'}</button>
        </form>

        {error && <p className={`form-message ${error.startsWith('Servidor conectado') ? 'success' : ''}`} role="status">{error}</p>}

        <button className="text-button" type="button" onClick={() => setShowServer(!showServer)}>⚙ Configurar servidor</button>
        {showServer && (
          <div className="server-config">
            <label>
              Dirección del backend
              <input value={server} onChange={(e) => setServer(e.target.value)} placeholder="https://refugio-mimi-api.onrender.com" />
            </label>
            <button className="secondary-button" type="button" onClick={saveServer}>Guardar y comprobar</button>
          </div>
        )}
        <p className="tiny-note">Tu conversación no se publica en redes. La clave de la IA vive únicamente en el servidor.</p>
      </section>
    </main>
  );
}
