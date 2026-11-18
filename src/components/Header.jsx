import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import { formatCurrency } from '../data/catalog.js';

export default function Header() {
  const { totals, currentUser, setIsCartOpen, setIsMobileNavOpen, cartTriggerRef } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isCarta = location.pathname.startsWith('/carta');
  const isClub = location.pathname.startsWith('/club');
  const isAuth =
    location.pathname.startsWith('/cuenta') ||
    location.pathname.startsWith('/ingresar') ||
    location.pathname.startsWith('/login') ||
    location.pathname.startsWith('/registro') ||
    location.pathname.startsWith('/crear-cuenta');
  const isAdmin = location.pathname.startsWith('/admin');
  const isSubPage = isCarta || isClub || isAuth || isAdmin;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const homeHref = (hash) => (isSubPage ? `/${hash}` : hash);

  return (
    <header className={`main-header ${scrolled ? 'scrolled' : ''}`} id="mainHeader">
      <div className="container header-container">
        <Link to="/" className="brand-identity">
          <motion.img
            whileHover={{ rotate: [-3, 3, 0], scale: 1.06 }}
            transition={{ duration: 0.4 }}
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
          <motion.div whileHover={{ y: -2, scale: 1.03 }} whileTap={{ scale: 0.96 }}>
            <Link to="/club" className={`nav-link nav-link-club ${isClub ? 'active' : ''}`}>
              <i className="fa-solid fa-award"></i> Club Ambrosía
            </Link>
          </motion.div>
        </nav>

        <div className="header-actions !gap-2.5">
          <Link
            to="/cuenta"
            aria-label={currentUser ? `Mi cuenta (${currentUser.name})` : 'Iniciar sesión o crear cuenta'}
            title={currentUser ? `Mi cuenta (${currentUser.name})` : 'Iniciar sesión / Crear cuenta'}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border text-sm transition ${
              isAuth
                ? 'border-[#4A2511] bg-[#4A2511] text-[#FFF8EC]'
                : 'border-[#4A2511]/20 bg-white text-[#4A2511] hover:border-[#B8761F] hover:bg-[#FFF8EC]'
            }`}
          >
            <i className={currentUser ? 'fa-solid fa-user-check' : 'fa-regular fa-user'}></i>
          </Link>

          <motion.button
            type="button"
            ref={cartTriggerRef}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="cart-trigger-btn"
            id="cartTriggerBtn"
            aria-label="Ver canasta de compras"
            onClick={() => setIsCartOpen(true)}
          >
            <div className="cart-icon-box">
              <i className="fa-solid fa-basket-shopping"></i>
              <motion.span
                key={totals.totalItems}
                initial={{ scale: 0.55, y: -4 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 450, damping: 18 }}
                className="cart-badge"
                id="cartBadge"
              >
                {totals.totalItems}
              </motion.span>
            </div>
            <span className="cart-total-label" id="cartHeaderTotal">
              {formatCurrency(totals.total)}
            </span>
          </motion.button>
        </div>
      </div>
    </header>
  );
}
