import { Link, useLocation } from 'react-router-dom';
import { BUSINESS_CONFIG, whatsappUrl } from '../data/catalog.js';

export default function Footer() {
  const location = useLocation();
  const isSubPage = location.pathname.startsWith('/carta') || location.pathname.startsWith('/club');
  const homeHref = (hash) => (isSubPage ? `/${hash}` : hash);

  return (
    <footer className="main-footer">
      <div className="container footer-container">
        <div className="footer-col brand-col">
          <div className="brand-identity">
            <img
              src="/assets/images/logo.svg"
              alt="Logo Ambrosía Bakery"
              className="brand-logo"
              width="54"
              height="54"
            />
            <div className="brand-names">
              <span className="brand-title">Ambrosía</span>
              <span className="brand-subtitle">Bakery</span>
            </div>
          </div>
          <p className="footer-tagline">
            Cookies artesanales que derriten, tortas clásicas, chipá y scones recién horneados. Ideal para desayunos, meriendas y regalos.
          </p>
          <div className="footer-social-links">
            <a
              href={BUSINESS_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              href={whatsappUrl('Hola!! 🍪')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <i className="fa-brands fa-whatsapp"></i>
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Nuestra Carta</h4>
          <ul className="footer-links">
            <li><Link to="/carta?cat=cookies">Cookies Clásicas</Link></li>
            <li><Link to="/carta?cat=rellenas">Cookies Rellenas</Link></li>
            <li><Link to="/carta?cat=tortas">Tortas Clásicas</Link></li>
            <li><Link to="/carta?cat=salados">Chipá & Scones</Link></li>
            <li><Link to="/carta?cat=boxes">Boxes & Regalos</Link></li>
            <li><a href={homeHref('#cotizador')}>Armá tu Box</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Ambrosía & Club</h4>
          <ul className="footer-links">
            <li><a href={homeHref('#cumpleanos')}>Servicios de Cumpleaños</a></li>
            <li><Link to="/club">Tarjeta de Fidelidad</Link></li>
            <li><a href={homeHref('#eventos')}>Alianzas & Colaboraciones</a></li>
            <li><a href={homeHref('#contacto')}>Ubicación y Horarios</a></li>
            <li><a href={homeHref('#faq')}>Preguntas Frecuentes</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Medios de Pago</h4>
          <p className="footer-small">Aceptamos transferencias, Mercado Pago y efectivo.</p>
          <div className="payment-badges-row">
            <span className="payment-chip">
              <i className="fa-solid fa-building-columns"></i> Transferencia
            </span>
            <span className="payment-chip">
              <i className="fa-solid fa-credit-card"></i> Mercado Pago
            </span>
            <span className="payment-chip">
              <i className="fa-solid fa-money-bill-wave"></i> Efectivo
            </span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p>© 2026 Ambrosía Bakery · Concepción del Uruguay · Todos los derechos reservados.</p>
          <div className="sodalis-credit">
            <span>
              Hecho por <strong>Sodalis</strong>
            </span>
            <a
              href="https://www.instagram.com/sodalis.software/"
              target="_blank"
              rel="noopener noreferrer"
              className="sodalis-ig-btn"
              aria-label="Instagram de Sodalis Software"
            >
              <i className="fa-brands fa-instagram"></i> @sodalis.software
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
