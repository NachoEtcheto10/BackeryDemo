import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { whatsappUrl } from '../data/catalog.js';
import { Reveal, StaggerContainer, staggerItemVariants } from './MotionPrimitives.jsx';

const ORBIT_PARTNERS = [
  {
    id: 'ambrosia',
    label: 'Ambrosía',
    title: 'Ambrosía Bakery',
    href: '/carta',
    external: false,
    logo: '/assets/images/logo_ambrosia.jpg',
    medallionClass: 'border-[#4A2511] bg-[#F9C77A]',
    imgClass: 'h-full w-full rounded-full object-cover',
    labelClass: 'border-[#4A2511]/20 bg-white/95 text-[#4A2511]'
  },
  {
    id: 'genaro',
    label: 'Focaccería Genaro',
    title: 'Focaccería Genaro',
    href: 'https://focacceria-genaro.vercel.app/',
    external: true,
    logo: '/assets/images/logo_genaro.png',
    medallionClass: 'border-[#008C45] bg-[#0B5D32] p-2',
    imgClass: 'h-full w-full object-contain',
    labelClass: 'border-[#008C45]/30 bg-white/95 text-[#0B5D32]'
  },
  {
    id: 'quijote',
    label: 'Don Quijote',
    title: 'Don Quijote Pizza Bar',
    href: 'https://don-quijote-web-eta.vercel.app/',
    external: true,
    logo: '/assets/images/logo_quijote.jpg',
    medallionClass: 'border-[#18D2D8] bg-[#16CED6] p-1',
    imgClass: 'h-full w-full rounded-full object-contain',
    labelClass: 'border-[#18D2D8]/45 bg-[#121212] text-[#18D2D8]'
  }
];

export default function AllianceSection() {
  const stageRef = useRef(null);
  const nodeRefs = useRef([]);

  // Animación orbital en 60fps garantizada por requestAnimationFrame
  useEffect(() => {
    let rafId = 0;
    let startTime = null;
    const speedRadPerSec = (Math.PI * 2) / 14;
    const baseAngles = [
      -Math.PI / 2,
      -Math.PI / 2 + (Math.PI * 2) / 3,
      -Math.PI / 2 + (Math.PI * 4) / 3
    ];

    const animate = (timestamp) => {
      if (startTime === null) startTime = timestamp;
      const elapsedSec = (timestamp - startTime) / 1000;
      const stageWidth = stageRef.current?.clientWidth || 380;
      const radius = stageWidth * 0.375;

      nodeRefs.current.forEach((el, idx) => {
        if (!el) return;
        const angle = baseAngles[idx] + elapsedSec * speedRadPerSec;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      });

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section className="events-section" id="eventos">
      <div className="container">
        <Reveal className="section-header text-center">
          <span className="section-subtitle">
            <i className="fa-solid fa-handshake"></i> Alianza Gastronómica Local
          </span>
          <h2 className="section-title">Colaboraciones & Próximos Eventos</h2>
          <p className="section-description">
            Ambrosía forma parte de una alianza junto a dos emprendimientos amigos:{' '}
            <strong>Focaccería Genaro</strong> y <strong>Don Quijote Pizza Bar</strong>. Unimos lo
            dulce y lo salado para crear eventos, mesas compartidas y experiencias únicas.
          </p>
        </Reveal>

        {/* Órbita animada de los 3 logos girando */}
        <Reveal scale={0.92} y={16}>
          <div
            ref={stageRef}
            className="relative mx-auto my-2 mb-10 flex h-[288px] w-[288px] items-center justify-center sm:mb-14 sm:h-[400px] sm:w-[400px]"
            aria-label="Logos de la alianza girando: Ambrosía Bakery, Focaccería Genaro y Don Quijote Pizza Bar"
          >
            {/* Anillo punteado exacto al 37.5% de radio (inset 12.5%) */}
            <div className="pointer-events-none absolute inset-[12.5%] rounded-full border-2 border-dashed border-[#B8761F]/45" />

            {/* Halo pulsante suave en el centro */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute h-28 w-28 rounded-full bg-[#F9C77A]/25 sm:h-32 sm:w-32"
              animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.15, 0.5] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            />

            {ORBIT_PARTNERS.map((partner, idx) => {
              const inner = (
                <>
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-full border-[3px] shadow-lg transition-transform duration-300 hover:scale-110 sm:h-20 sm:w-20 ${partner.medallionClass}`}
                  >
                    <img src={partner.logo} alt={`Logo ${partner.title}`} className={partner.imgClass} />
                  </div>
                  <span
                    className={`pointer-events-none absolute top-full left-1/2 mt-1 -translate-x-1/2 whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] font-bold shadow-sm sm:mt-1.5 sm:px-2.5 sm:text-[11px] ${partner.labelClass}`}
                  >
                    {partner.label}
                  </span>
                </>
              );

              return (
                <div
                  key={partner.id}
                  ref={(el) => {
                    nodeRefs.current[idx] = el;
                  }}
                  className="absolute left-1/2 top-1/2 z-20 -ml-8 -mt-8 h-16 w-16 will-change-transform sm:-ml-10 sm:-mt-10 sm:h-20 sm:w-20"
                >
                  {partner.external ? (
                    <a
                      href={partner.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={partner.title}
                      className="relative block h-full w-full"
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link to={partner.href} title={partner.title} className="relative block h-full w-full">
                      {inner}
                    </Link>
                  )}
                </div>
              );
            })}

            {/* Sello central */}
            <div className="relative z-10 flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-[#F9C77A]/75 bg-gradient-to-br from-[#4A2511] to-[#2E160A] p-2 text-center text-[#FFF8EC] shadow-xl sm:h-28 sm:w-28">
              <i className="fa-solid fa-handshake mb-0.5 text-base text-[#F9C77A] sm:mb-1 sm:text-lg"></i>
              <strong className="font-serif text-xs leading-tight sm:text-sm">Alianza x3</strong>
              <span className="text-[9px] tracking-wide text-[#F2DFC4] sm:text-[10px]">C. del Uruguay</span>
            </div>
          </div>
        </Reveal>

        {/* 3 Cards personalizadas al estilo de cada emprendimiento */}
        <StaggerContainer className="events-grid alliance-cards-grid" stagger={0.09}>
          <motion.article
            variants={staggerItemVariants}
            whileHover={{ y: -6 }}
            className="events-card events-card-ambrosia"
          >
            <div className="events-card-top">
              <div className="partner-card-brand">
                <img
                  src="/assets/images/logo_ambrosia.jpg"
                  alt="Logo Ambrosía Bakery"
                  className="partner-card-logo"
                />
                <div>
                  <span className="events-tag">
                    <i className="fa-solid fa-cookie-bite"></i> Lo Dulce
                  </span>
                  <span className="events-date">Cookies, Tortas & Chipá</span>
                </div>
              </div>
            </div>
            <h3>Ambrosía Bakery</h3>
            <p>
              Cookies artesanales que derriten, tortas clásicas, chipá y scones recién horneados. El toque dulce e ideal para el desayuno o el cierre de cada evento.
            </p>
            <Link to="/carta" className="btn btn-primary btn-sm events-partner-btn">
              <i className="fa-solid fa-utensils"></i> Ver Carta de Ambrosía
            </Link>
          </motion.article>

          <motion.article
            variants={staggerItemVariants}
            whileHover={{ y: -6 }}
            className="events-card events-card-genaro"
          >
            <div className="genaro-tricolore-bar" aria-hidden="true" />
            <div className="events-card-top">
              <div className="partner-card-brand">
                <img
                  src="/assets/images/logo_genaro.png"
                  alt="Logo Focaccería Genaro"
                  className="partner-card-logo logo-genaro"
                />
                <div>
                  <span className="events-tag tag-genaro">
                    <i className="fa-solid fa-bread-slice"></i> Tradición Italiana
                  </span>
                  <span className="events-date">Focaccia Artesanal</span>
                </div>
              </div>
            </div>
            <h3>Focaccería Genaro</h3>
            <p>
              Auténtica focaccia artesanal elaborada con ingredientes frescos y sabores únicos inspirados en Italia. Juntos armamos boxes mixtas y mesas dulce & salado.
            </p>
            <a
              href="https://focacceria-genaro.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm events-partner-btn btn-genaro"
            >
              <i className="fa-solid fa-arrow-up-right-from-square"></i> Visitar Focaccería Genaro
            </a>
          </motion.article>

          <motion.article
            variants={staggerItemVariants}
            whileHover={{ y: -6 }}
            className="events-card events-card-quijote"
          >
            <div className="events-card-top">
              <div className="partner-card-brand">
                <img
                  src="/assets/images/logo_quijote.jpg"
                  alt="Logo Don Quijote Pizza Bar"
                  className="partner-card-logo logo-quijote"
                />
                <div>
                  <span className="events-tag tag-quijote">
                    <i className="fa-solid fa-pizza-slice"></i> Pizza Bar
                  </span>
                  <span className="events-date">Concepción del Uruguay</span>
                </div>
              </div>
            </div>
            <h3>Don Quijote Pizza Bar</h3>
            <p>
              Pizzas caseras, hamburguesas gourmet y barra de tragos en Concepción del Uruguay. Colaboramos con postres, tortas y noches temáticas especiales.
            </p>
            <a
              href="https://don-quijote-web-eta.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm events-partner-btn btn-quijote"
            >
              <i className="fa-solid fa-arrow-up-right-from-square"></i> Visitar Don Quijote
            </a>
          </motion.article>
        </StaggerContainer>

        {/* Barra de próximos eventos en conjunto */}
        <Reveal delay={0.12}>
          <div className="alliance-upcoming-bar">
            <div className="alliance-upcoming-text">
              <span className="events-tag">
                <i className="fa-solid fa-calendar-days"></i> Agenda 2026
              </span>
              <div>
                <strong>Próximos Pop-Ups, Ferias & Combos Conjuntos</strong>
                <p>Se vienen fechas especiales, degustaciones y boxes edición limitada entre las tres marcas.</p>
              </div>
            </div>
            <motion.a
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              href={whatsappUrl('Hola!! 🤝 Quisiera consultar por los próximos eventos y colaboraciones de la alianza.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
            >
              <i className="fa-brands fa-whatsapp"></i> Consultar Próximos Eventos
            </motion.a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
