import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FEATURED_HERO_SLIDES } from '../data/catalog.js';
import { EASE_OUT_EXPO } from './MotionPrimitives.jsx';

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return undefined;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FEATURED_HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const currentSlide = FEATURED_HERO_SLIDES[currentIndex];

  return (
    <section className="hero-fullwidth-section" id="inicio">
      <motion.div
        className="hero-ambient-glow"
        animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container hero-fullwidth-container">
        <div className="hero-info-column">
          <motion.div
            className="hero-top-badge"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
          >
            <span className="badge-dot" />
            <span>Concepción del Uruguay · Horneado en el Día</span>
          </motion.div>

          <motion.h1
            className="hero-main-title"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: EASE_OUT_EXPO }}
          >
            Cookies artesanales
            <br />
            <span className="hero-italic-phrase">que derriten</span>
            <br />
            en cada mordida
          </motion.h1>

          <motion.p
            className="hero-lead-text"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: EASE_OUT_EXPO }}
          >
            Cookies clásicas y rellenas, chipá y scones recién horneados. Ideales para tus desayunos, meriendas y para regalar a quien más querés.
          </motion.p>

          <motion.div
            className="hero-actions-row"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease: EASE_OUT_EXPO }}
          >
            <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.97 }} className="flex">
              <Link to="/carta" className="btn btn-primary btn-hero-cta w-full">
                <i className="fa-solid fa-cookie-bite"></i> Ver la Carta
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.97 }} className="flex">
              <a href="#cotizador" className="btn btn-secondary btn-hero-secondary w-full">
                <i className="fa-solid fa-gift"></i> Armá tu Box
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-previews-group"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32, ease: EASE_OUT_EXPO }}
          >
            <span className="previews-label">Los favoritos:</span>
            <div className="previews-cards-row">
              <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Link to="/carta?cat=rellenas" className="hero-mini-card" title="Ver Cookies Rellenas">
                  <img
                    src="/assets/images/real_cookies_kinder.png"
                    alt="Cookies rellenas con chocolate Kinder en Ambrosía"
                  />
                  <span>Cookies Rellenas</span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Link to="/carta?cat=boxes" className="hero-mini-card" title="Ver Boxes de Regalo">
                  <img
                    src="/assets/images/real_box_x4.png"
                    alt="Box x4 cookies artesanales Ambrosía"
                  />
                  <span>Boxes de Regalo</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hero-showcase-column"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.14, ease: EASE_OUT_EXPO }}
        >
          <div
            className="showcase-cake-card"
            id="heroShowcaseCard"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="showcase-img-box">
              <AnimatePresence mode="sync">
                <motion.img
                  key={currentSlide.image}
                  src={currentSlide.image}
                  alt={currentSlide.alt}
                  className="showcase-cake-img is-active"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
                  fetchPriority={currentIndex === 0 ? 'high' : undefined}
                />
              </AnimatePresence>
            </div>

            <motion.div
              className="showcase-seal"
              aria-hidden="true"
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
            >
              <svg viewBox="0 0 120 120">
                <defs>
                  <path id="sealCirclePath" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
                </defs>
                <text>
                  <textPath href="#sealCirclePath" textLength="276">
                    AMBROSÍA · COOKIES QUE DERRITEN ·
                  </textPath>
                </text>
              </svg>
              <i className="fa-solid fa-cookie-bite"></i>
            </motion.div>

            <motion.div
              className="showcase-float-chip"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="float-chip-icon">
                <i className="fa-solid fa-bag-shopping"></i>
              </span>
              <span className="float-chip-text">
                <strong>Retiro o envío</strong>
                <small>En C. del Uruguay</small>
              </span>
            </motion.div>

            <div className="showcase-controls-bar">
              <div className="showcase-arrows">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.88 }}
                  className="showcase-arrow-btn"
                  aria-label="Anterior"
                  title="Anterior"
                  onClick={() =>
                    setCurrentIndex((prev) => (prev - 1 + FEATURED_HERO_SLIDES.length) % FEATURED_HERO_SLIDES.length)
                  }
                >
                  <i className="fa-solid fa-arrow-left"></i>
                </motion.button>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.88 }}
                  className="showcase-arrow-btn"
                  aria-label="Siguiente"
                  title="Siguiente"
                  onClick={() => setCurrentIndex((prev) => (prev + 1) % FEATURED_HERO_SLIDES.length)}
                >
                  <i className="fa-solid fa-arrow-right"></i>
                </motion.button>
              </div>

              <AnimatePresence mode="wait">
                <motion.span
                  key={currentSlide.caption}
                  className="showcase-cake-title"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  {currentSlide.caption}
                </motion.span>
              </AnimatePresence>

              <div className="showcase-dots">
                {FEATURED_HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`dot-btn ${idx === currentIndex ? 'active' : ''}`}
                    aria-label={`Destacado ${idx + 1}`}
                    onClick={() => setCurrentIndex(idx)}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
