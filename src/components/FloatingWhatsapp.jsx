import { whatsappUrl } from '../data/catalog.js';

export default function FloatingWhatsapp() {
  return (
    <a
      href={whatsappUrl('Hola!! 🍪 Tengo una consulta.')}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp-bubble"
      aria-label="Contactar por WhatsApp"
    >
      <i className="fa-brands fa-whatsapp"></i>
      <span className="whatsapp-tooltip">¿Dudas? Escribinos por WhatsApp</span>
    </a>
  );
}
