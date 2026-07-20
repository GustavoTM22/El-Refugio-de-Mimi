export default function CrisisCard({ compact = false }) {
  const contact = JSON.parse(localStorage.getItem('mimi-trusted-contact') || 'null');
  return (
    <aside className={`crisis-card ${compact ? 'compact' : ''}`}>
      <div>
        <strong>No tienes que atravesar un momento peligroso sola.</strong>
        <p>Busca ahora a una persona de confianza o apoyo profesional. Mimi puede acompañarte, pero una persona real puede cuidarte directamente.</p>
      </div>
      <div className="crisis-actions">
        {contact?.phone && <a className="urgent-button" href={`tel:${contact.phone}`}>Llamar a {contact.name || 'mi persona de confianza'}</a>}
        <a className="urgent-button light" href="tel:+51113">Llamar a Línea 113 Salud</a>
      </div>
    </aside>
  );
}
