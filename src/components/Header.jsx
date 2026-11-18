import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import { formatCurrency } from '../data/catalog.js';

export default function Header() {
  const { totals, setIsCartOpen, setIsMobileNavOpen, cartTriggerRef } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [badgeBump, setBadgeBump] = useState(false);
  const location = useLocation();
  const isCarta = location.pathname.startsWith('/carta');
  const isClub = location.pathname.startsWith('/club');
  const isSubPage = isCarta || isClub;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (totals.totalItems > 0) {
      setBadgeBump(true);
      const t = setTimeout(() => setBadgeBump(false), 380);
      return () => clearTimeout(t);
    }
  }, [totals.totalItems]);

  const homeHref = (hash) => (isSubPage ? `/${hash}` : hash);

  return (
    <header className={`main-header ${scrolled ? 'scrolled' : ''}`} id="mainHeader">
      <div className="container header-container">
        <Link to="/" className="brand-identity">
          <img
            src="/assets/images/logo.svg"
            alt="Logo Ambrosía Bakery"
            className="brand-logo"
            width="46"
            height="46"
          />
          <div className="brand-names">
            <span className="brand-title">Ambrosía</span>
            <span className="brand-subtitle">Bakery</span>
          </div>
        </Link>

        <button
          type="button"
          className="mobile-menu-btn"
          aria-label="Abrir menú de navegación"
          onClick={() => setIsMobileNavOpen(true)}
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        <nav className="nav-links" id="navLinks">
          <a href={homeHref('#inicio')} className={`nav-link ${!isSubPage ? 'active' : ''}`}>
            Inicio
          </a>
          <Link to="/carta" className={`nav-link ${isCarta ? 'active' : ''}`}>
            Carta
          </Link>
          <a href={homeHref('#cotizador')} className="nav-link">
            Armá tu Box
          </a>
          <a href={homeHref('#cumpleanos')} className="nav-link">
            Cumpleaños
          </a>
          <a href={homeHref('#eventos')} className="nav-link">
            Alianzas
          </a>
          <a href={homeHref('#contacto')} className="nav-link">
            Contacto
          </a>
          <Link to="/club" className={`nav-link nav-link-club ${isClub ? 'active' : ''}`}>
            <i className="fa-solid fa-award"></i> Club Ambrosía
          </Link>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            ref={cartTriggerRef}
            className="cart-trigger-btn"
            id="cartTriggerBtn"
            aria-label="Ver canasta de compras"
            onClick={() => setIsCartOpen(true)}
          >
            <div className="cart-icon-box">
              <i className="fa-solid fa-basket-shopping"></i>
              <span className={`cart-badge ${badgeBump ? 'bump' : ''}`} id="cartBadge">
                {totals.totalItems}
              </span>
            </div>
            <span className="cart-total-label" id="cartHeaderTotal">
              {formatCurrency(totals.total)}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
