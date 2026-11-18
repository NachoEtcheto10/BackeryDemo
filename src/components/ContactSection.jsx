import { BUSINESS_CONFIG, whatsappUrl } from '../data/catalog.js';

export default function ContactSection() {
  return (
    <section className="contact-banner-section" id="contacto">
      <div className="container">
        <div className="contact-card contact-card-with-map">
          <div className="contact-info">
            <span className="section-subtitle">Estamos para ayudarte</span>
            <h3 className="contact-title">¿Se te antojó algo rico?</h3>
            <p>
              Escribinos por WhatsApp para hacer tu pedido, consultar el stock del día o pasar a retirar por nuestro local.
            </p>

            <div className="contact-details-list">
              <div className="contact-line">
                <i className="fa-solid fa-location-dot"></i>
                <a
                  href={BUSINESS_CONFIG.mapsPlaceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {BUSINESS_CONFIG.address}
                </a>
              </div>

              <div className="contact-line">
                <i className="fa-regular fa-clock"></i>
                <div className="contact-hours-text">
                  <strong>Horarios de atención</strong>
                  <span>Lunes a Domingos: 8:30 a 12:00 hs · 17:00 a 20:00 hs</span>
                  <small className="contact-hours-note">En feriados los horarios pueden variar</small>
                </div>
              </div>

              <div className="contact-line">
                <i className="fa-brands fa-instagram"></i>
                <a
                  href={BUSINESS_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {BUSINESS_CONFIG.instagramHandle}
                </a>
              </div>

              <div className="contact-line">
                <i className="fa-brands fa-whatsapp"></i>
                <span>Tel / WhatsApp: 03442 60-0219 (+54 9 3442 60-0219)</span>
              </div>
            </div>

            <div className="contact-inline-cta">
              <a
                href={whatsappUrl('Hola!! 🍪 Quisiera hacer un pedido.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp-lg"
              >
                <i className="fa-brands fa-whatsapp"></i> Pedir por WhatsApp
              </a>
              <span className="contact-badge-reply">
                <i className="fa-solid fa-star"></i> 5.0 ★ en Google Maps
              </span>
            </div>
          </div>

          <div className="contact-map-column">
            <div className="contact-map-wrapper">
              <iframe
                title="Mapa de ubicación de Ambrosía Bakery en Bv. Ricardo Balbín 2067, Concepción del Uruguay"
                src={BUSINESS_CONFIG.mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <a
              href={BUSINESS_CONFIG.mapsPlaceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-map-link"
            >
              <i className="fa-solid fa-diamond-turn-right"></i> Ver ficha y cómo llegar en Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
