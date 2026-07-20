import MimiAvatar from './MimiAvatar.jsx';

const phrases = [
  'No tienes que resolver todo hoy.',
  'Respirar también cuenta como avanzar.',
  'Tu alegría no desapareció: está descansando.',
  'Eres profundamente amada, incluso en los días silenciosos.',
  'Un paso pequeñito sigue siendo un paso.'
];

export default function Home({ onNavigate, user }) {
  const day = new Date().getDate();
  const phrase = phrases[day % phrases.length];
  return (
    <section className="page-section home-page">
      <div className="hero-copy">
        <p className="eyebrow">Bienvenida, {user?.name || 'Lourdes'}</p>
        <h1>Este lugar no te exige nada.</h1>
        <p>Solo quiere acompañarte, hacerte espacio y recordarte que no estás sola.</p>
      </div>
      <MimiAvatar />
      <div className="daily-note soft-card">
        <span>Una notita de hoy</span>
        <strong>“{phrase}”</strong>
      </div>
      <div className="home-grid">
        <button className="feature-card" onClick={() => onNavigate('chat')}><span>💬</span><strong>Hablar con Mimi</strong><small>Cuéntale cómo te sientes.</small></button>
        <button className="feature-card" onClick={() => onNavigate('calma')}><span>☁️</span><strong>Volver al presente</strong><small>Respiración y anclaje suave.</small></button>
        <button className="feature-card" onClick={() => onNavigate('musica')}><span>🎷</span><strong>Música para este momento</strong><small>Calma o un poquito de alegría.</small></button>
        <button className="feature-card" onClick={() => onNavigate('diario')}><span>🌷</span><strong>Guardar lo que siento</strong><small>Un diario privado en este dispositivo.</small></button>
      </div>
    </section>
  );
}
