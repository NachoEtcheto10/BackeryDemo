import { whatsappUrl } from '../data/catalog.js';

const BIRTHDAY_SERVICES = [
  {
    icon: 'fa-solid fa-cake-candles',
    title: 'Tortas Clásicas',
    desc: 'Lemon Pie, Rogel, Brownie o Selva Negra recién hechas por encargo para el momento de las velitas.'
  },
  {
    icon: 'fa-solid fa-cookie-bite',
    title: 'Mesa Dulce & Salada',
    desc: 'Bandejas combinadas de cookies XL, chipá calentito y scones de queso listos para servir.'
  },
  {
    icon: 'fa-solid fa-gift',
    title: 'Souvenirs para Invitados',
    desc: 'Mini cajitas individuales o bolsitas con cookies y tarjetita personalizada con el nombre del cumpleañero.'
  }
];

export default function BirthdaySection() {
  return (
    <section className="birthday-section" id="cumpleanos">
      <div className="container">
        <div className="birthday-banner">
          <div className="birthday-header">
            <span className="section-subtitle">
              <i className="fa-solid fa-cake-candles"></i> Celebrá con Ambrosía
            </span>
            <h2 className="section-title">Servicios para tu Cumpleaños</h2>
            <p className="section-description">
              Armamos propuestas a medida para festejos íntimos o reuniones grandes en Concepción del Uruguay.
            </p>
          </div>

          <div className="birthday-grid">
            {BIRTHDAY_SERVICES.map((item) => (
              <article key={item.title} className="birthday-card">
                <div className="birthday-icon">
                  <i className={item.icon}></i>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>

          <div className="birthday-cta-row">
            <span className="birthday-note">
              <i className="fa-regular fa-calendar"></i> Reservá tu fecha con al menos 72 hs de anticipación
            </span>
            <a
              href={whatsappUrl('Hola!! 🎂 Quisiera consultar por el servicio de cumpleaños (tortas y mesa dulce).')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <i className="fa-brands fa-whatsapp"></i> Consultar por mi Cumpleaños
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
