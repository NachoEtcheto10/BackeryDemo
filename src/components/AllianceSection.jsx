import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { whatsappUrl } from '../data/catalog.js';
import { EASE_OUT_EXPO, Reveal } from './MotionPrimitives.jsx';

const ORBIT_PARTNERS = [
  {
    id: 'ambrosia',
    label: 'Ambrosía',
    title: 'Ambrosía Bakery',
    tag: 'Lo Dulce',
    tagIcon: 'fa-solid fa-cookie-bite',
    subtitle: 'Cookies, Tortas & Chipá',
    description:
      'Cookies artesanales que derriten, tortas clásicas, chipá y scones recién horneados. El toque dulce e ideal para el desayuno o el cierre de cada evento.',
    ctaLabel: 'Ver Carta de Ambrosía',
    ctaIcon: 'fa-solid fa-utensils',
    cardClass: 'events-card events-card-ambrosia',
    tagClass: 'events-tag',
    btnClass: 'btn btn-primary btn-sm events-partner-btn',
    logoClass: 'partner-card-logo',
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
    tag: 'Tradición Italiana',
    tagIcon: 'fa-solid fa-bread-slice',
    subtitle: 'Focaccia Artesanal',
    description:
      'Auténtica focaccia artesanal elaborada con ingredientes frescos y sabores únicos inspirados en Italia. Juntos armamos boxes mixtas y mesas dulce & salado.',
    ctaLabel: 'Visitar Focaccería Genaro',
    ctaIcon: 'fa-solid fa-arrow-up-right-from-square',
    cardClass: 'events-card events-card-genaro',
    tagClass: 'events-tag tag-genaro',
    btnClass: 'btn btn-sm events-partner-btn btn-genaro',
    logoClass: 'partner-card-logo logo-genaro',
    hasTricolore: true,
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
    tag: 'Pizza Bar',
    tagIcon: 'fa-solid fa-pizza-slice',
    subtitle: 'Concepción del Uruguay',
    description:
      'Pizzas caseras, hamburguesas gourmet y barra de tragos en Concepción del Uruguay. Colaboramos con postres, tortas y noches temáticas especiales.',
    ctaLabel: 'Visitar Don Quijote',
    ctaIcon: 'fa-solid fa-arrow-up-right-from-square',
    cardClass: 'events-card events-card-quijote',
    tagClass: 'events-tag tag-quijote',
    btnClass: 'btn btn-sm events-partner-btn btn-quijote',
    logoClass: 'partner-card-logo logo-quijote',
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
  const angleRef = useRef(0);
  const lastFrameRef = useRef(null);
  const pausedRef = useRef(false);

  const [selectedPartnerId, setSelectedPartnerId] = useState(null);
  const selectedPartner = ORBIT_PARTNERS.find((p) => p.id === selectedPartnerId) || null;

  useEffect(() => {
    pausedRef.current = Boolean(selectedPartnerId);
  }, [selectedPartnerId]);

  // Animación orbital en 60fps que se frena exactamente donde quedó al hacer click
  useEffect(() => {
    let rafId = 0;
    const speedRadPerSec = (Math.PI * 2) / 14;
    const baseAngles = [
      -Math.PI / 2,
      -Math.PI / 2 + (Math.PI * 2) / 3,
      -Math.PI / 2 + (Math.PI * 4) / 3
    ];

    const renderPositions = () => {
      const stageWidth = stageRef.current?.clientWidth || 380;
      const radius = stageWidth * 0.375;

      nodeRefs.current.forEach((el, idx) => {
        if (!el) return;
        const angle = baseAngles[idx] + angleRef.current;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      });
    };

    const animate = (timestamp) => {
      if (lastFrameRef.current !== null && !pausedRef.current) {
        const dt = Math.min((timestamp - lastFrameRef.current) / 1000, 0.1);
        angleRef.current += dt * speedRadPerSec;
      }
      lastFrameRef.current = timestamp;
      renderPositions();
      rafId = requestAnimationFrame(animate);
    };

    renderPositions();
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handleTogglePartner = (id) => {
    setSelectedPartnerId((prev) => (prev === id ? null : id));
  };

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

        {/* Órbita interactiva de los 3 globos */}
        <Reveal scale={0.92} y={16}>
          <div className="flex flex-col items-center">
            <div
              ref={stageRef}
              className="relative mx-auto my-2 flex h-[288px] w-[288px] items-center justify-center sm:h-[390px] sm:w-[390px]"
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
                const isSelected = selectedPartnerId === partner.id;
                return (
                  <div
                    key={partner.id}
                    ref={(el) => {
                      nodeRefs.current[idx] = el;
                    }}
                    className="absolute left-1/2 top-1/2 z-20 -ml-8 -mt-8 h-16 w-16 will-change-transform sm:-ml-10 sm:-mt-10 sm:h-20 sm:w-20"
                  >
                    <button
                      type="button"
                      onClick={() => handleTogglePartner(partner.id)}
                      aria-pressed={isSelected}
                      title={`Ver ${partner.title}`}
                      className="relative block h-full w-full cursor-pointer border-0 bg-transparent p-0 focus:outline-none"
                    >
                      <div
                        className={`flex h-16 w-16 items-center justify-center rounded-full border-[3px] shadow-lg transition-transform duration-300 hover:scale-110 sm:h-20 sm:w-20 ${
                          partner.medallionClass
                        } ${isSelected ? 'scale-110 ring-4 ring-[#B8761F]/45' : ''}`}
                      >
                        <img src={partner.logo} alt={`Logo ${partner.title}`} className={partner.imgClass} />
                      </div>
                      <span
                        className={`pointer-events-none absolute top-full left-1/2 mt-1 -translate-x-1/2 whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] font-bold shadow-sm sm:mt-1.5 sm:px-2.5 sm:text-[11px] ${partner.labelClass}`}
                      >
                        {partner.label}
                      </span>
                    </button>
                  </div>
                );
              })}

              {/* Sello central sin x3 */}
              <div className="relative z-10 flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-[#F9C77A]/75 bg-gradient-to-br from-[#4A2511] to-[#2E160A] p-2 text-center text-[#FFF8EC] shadow-xl sm:h-28 sm:w-28">
                <i className="fa-solid fa-handshake mb-0.5 text-base text-[#F9C77A] sm:mb-1 sm:text-lg"></i>
                <strong className="font-serif text-xs leading-tight sm:text-sm">Alianza</strong>
                <span className="text-[9px] tracking-wide text-[#F2DFC4] sm:text-[10px]">C. del Uruguay</span>
              </div>
            </div>

            <p className="mt-4 text-center text-xs font-medium text-[#76553C] sm:text-sm">
              {selectedPartner
                ? 'Órbita pausada · Tocá el logo nuevamente o cerrá la ficha para reanudar.'
                : 'Tocá cualquiera de los 3 globos para conocer cada emprendimiento.'}
            </p>
          </div>
        </Reveal>

        {/* Card individual del emprendimiento clickeado */}
        <AnimatePresence mode="wait">
          {selectedPartner && (
            <motion.div
              key={selectedPartner.id}
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
              className="mx-auto mt-6 max-w-lg"
            >
              <article className={`${selectedPartner.cardClass} relative`}>
                {selectedPartner.hasTricolore && <div className="genaro-tricolore-bar" aria-hidden="true" />}

                <button
                  type="button"
                  onClick={() => setSelectedPartnerId(null)}
                  aria-label="Cerrar tarjeta y reanudar órbita"
                  className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-current/20 bg-white/85 text-xs text-[#4A2511] shadow-sm transition hover:scale-105"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>

                <div className="events-card-top">
                  <div className="partner-card-brand">
                    <img
                      src={selectedPartner.logo}
                      alt={`Logo ${selectedPartner.title}`}
                      className={selectedPartner.logoClass}
                    />
                    <div>
                      <span className={selectedPartner.tagClass}>
                        <i className={selectedPartner.tagIcon}></i> {selectedPartner.tag}
                      </span>
                      <span className="events-date">{selectedPartner.subtitle}</span>
                    </div>
                  </div>
                </div>

                <h3>{selectedPartner.title}</h3>
                <p>{selectedPartner.description}</p>

                <div className="mt-2 flex flex-wrap items-center gap-3">
                  {selectedPartner.external ? (
                    <a
                      href={selectedPartner.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={selectedPartner.btnClass}
                    >
                      <i className={selectedPartner.ctaIcon}></i> {selectedPartner.ctaLabel}
                    </a>
                  ) : (
                    <Link to={selectedPartner.href} className={selectedPartner.btnClass}>
                      <i className={selectedPartner.ctaIcon}></i> {selectedPartner.ctaLabel}
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={() => setSelectedPartnerId(null)}
                    className="rounded-full border border-current/25 px-3.5 py-2 text-xs font-bold opacity-80 transition hover:opacity-100"
                  >
                    Reanudar órbita
                  </button>
                </div>
              </article>
            </motion.div>
          )}
        </AnimatePresence>

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
