import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FEATURED_HERO_SLIDES } from '../data/catalog.js';

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
      <div className="hero-ambient-glow" />

      <div className="container hero-fullwidth-container">
        <div className="hero-info-column">
          <div className="hero-top-badge">
            <span className="badge-dot" />
            <span>Concepción del Uruguay · Horneado en el Día</span>
          </div>

          <h1 className="hero-main-title">
            Cookies artesanales
            <br />
            <span className="hero-italic-phrase">que derriten</span>
            <br />
            en cada mordida
          </h1>

          <p className="hero-lead-text">
            Cookies clásicas y rellenas, chipá y scones recién horneados. Ideales para tus desayunos, meriendas y para regalar a quien más querés.
          </p>

          <div className="hero-actions-row">
            <Link to="/carta" className="btn btn-primary btn-hero-cta">
              <i className="fa-solid fa-cookie-bite"></i> Ver la Carta
            </Link>
            <a href="#cotizador" className="btn btn-secondary btn-hero-secondary">
              <i className="fa-solid fa-gift"></i> Armá tu Box
            </a>
          </div>

          <div className="hero-previews-group">
            <span className="previews-label">Los favoritos:</span>
            <div className="previews-cards-row">
              <Link to="/carta?cat=rellenas" className="hero-mini-card" title="Ver Cookies Rellenas">
                <img
                  src="/assets/images/real_cookies_kinder.png"
                  alt="Cookies rellenas con chocolate Kinder en Ambrosía"
                />
                <span>Cookies Rellenas</span>
              </Link>
              <Link to="/carta?cat=boxes" className="hero-mini-card" title="Ver Boxes de Regalo">
                <img
                  src="/assets/images/real_box_x4.png"
                  alt="Box x4 cookies artesanales Ambrosía"
                />
                <span>Boxes de Regalo</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="hero-showcase-column">
          <div
            className="showcase-cake-card"
            id="heroShowcaseCard"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="showcase-img-box">
              {FEATURED_HERO_SLIDES.map((slide, idx) => (
                <img
                  key={slide.image}
                  src={slide.image}
                  alt={idx === currentIndex ? slide.alt : ''}
                  className={`showcase-cake-img ${idx === currentIndex ? 'is-active' : ''}`}
                  fetchPriority={idx === 0 ? 'high' : undefined}
                />
              ))}
            </div>

            <div className="showcase-seal" aria-hidden="true">
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
            </div>

            <div className="showcase-float-chip">
              <span className="float-chip-icon">
                <i className="fa-solid fa-bag-shopping"></i>
              </span>
              <span className="float-chip-text">
                <strong>Retiro o envío</strong>
                <small>En C. del Uruguay</small>
              </span>
            </div>

            <div className="showcase-controls-bar">
              <div className="showcase-arrows">
                <button
                  type="button"
                  className="showcase-arrow-btn"
                  aria-label="Anterior"
                  title="Anterior"
                  onClick={() =>
                    setCurrentIndex((prev) => (prev - 1 + FEATURED_HERO_SLIDES.length) % FEATURED_HERO_SLIDES.length)
                  }
                >
                  <i className="fa-solid fa-arrow-left"></i>
                </button>
                <button
                  type="button"
                  className="showcase-arrow-btn"
                  aria-label="Siguiente"
                  title="Siguiente"
                  onClick={() => setCurrentIndex((prev) => (prev + 1) % FEATURED_HERO_SLIDES.length)}
                >
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>

              <span className="showcase-cake-title">{currentSlide.caption}</span>

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
        </div>
      </div>
    </section>
  );
}
