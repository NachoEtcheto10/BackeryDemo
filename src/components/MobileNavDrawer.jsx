import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import { whatsappUrl } from '../data/catalog.js';

export default function MobileNavDrawer() {
  const { isMobileNavOpen, setIsMobileNavOpen } = useStore();
  const location = useLocation();
  const isSubPage = location.pathname.startsWith('/carta') || location.pathname.startsWith('/club');
  const close = () => setIsMobileNavOpen(false);
  const homeHref = (hash) => (isSubPage ? `/${hash}` : hash);

  return (
    <>
      <div
        className={`mobile-nav-backdrop ${isMobileNavOpen ? 'open' : ''}`}
        onClick={close}
      />
      <aside
        className={`mobile-nav-drawer ${isMobileNavOpen ? 'open' : ''}`}
        aria-label="Menú de navegación móvil"
      >
        <div className="mobile-nav-header">
          <div className="brand-identity">
            <img
              src="/assets/images/logo.svg"
              alt="Logo Ambrosía Bakery"
              className="brand-logo"
              width="40"
              height="40"
            />
            <span className="brand-title">Ambrosía</span>
          </div>
          <button
            type="button"
            className="mobile-nav-close-btn"
            aria-label="Cerrar menú"
            onClick={close}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <nav className="mobile-nav-links">
          <a href={homeHref('#inicio')} className="mobile-link" onClick={close}>
            Inicio
          </a>
          <Link to="/carta" className="mobile-link" onClick={close}>
            Nuestra Carta
          </Link>
          <a href={homeHref('#cotizador')} className="mobile-link" onClick={close}>
            Armá tu Box
          </a>
          <a href={homeHref('#cumpleanos')} className="mobile-link" onClick={close}>
            Cumpleaños
          </a>
          <Link to="/club" className="mobile-link font-bold text-[#B8761F]" onClick={close}>
            ★ Club Ambrosía (Fidelidad)
          </Link>
          <a href={homeHref('#eventos')} className="mobile-link" onClick={close}>
            Alianzas & Eventos
          </a>
          <a href={homeHref('#contacto')} className="mobile-link" onClick={close}>
            Contacto
          </a>
          <a href={homeHref('#faq')} className="mobile-link" onClick={close}>
            Preguntas Frecuentes
          </a>
        </nav>

        <div className="mobile-nav-footer">
          <a
            href={whatsappUrl('Hola!! 🍪')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp-full"
          >
            <i className="fa-brands fa-whatsapp"></i> Chatear por WhatsApp
          </a>
        </div>
      </aside>
    </>
  );
}
