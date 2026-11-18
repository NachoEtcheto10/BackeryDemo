import { motion } from 'motion/react';
import { Reveal, StaggerContainer, staggerItemVariants } from './MotionPrimitives.jsx';

const FEATURES = [
  {
    icon: 'fa-solid fa-cookie-bite',
    title: 'Cookies que derriten',
    desc: 'Bordes crocantes, centro húmedo y rellenos generosos.'
  },
  {
    icon: 'fa-solid fa-fire-burner',
    title: 'Recién horneado',
    desc: 'Chipá, scones y cookies que salen del horno en el día.'
  },
  {
    icon: 'fa-solid fa-gift',
    title: 'Listo para regalar',
    desc: 'Boxes con moño y tarjeta con dedicatoria incluida.'
  },
  {
    icon: 'fa-solid fa-mug-hot',
    title: 'Desayunos & meriendas',
    desc: 'Combos pensados para compartir con quien más querés.'
  }
];

export default function AboutSection() {
  return (
    <section className="about-section" id="historia">
      <div className="container about-container">
        <div className="about-image-column">
          <div className="about-gallery-stack">
            <Reveal x={-22} y={12}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="about-image-frame about-founders-frame"
              >
                <img
                  src="/assets/images/juan_y_reni.jpg"
                  alt="Juan y Reni, fundadores de Ambrosía Bakery"
                  className="about-chef-img about-founders-img"
                  loading="lazy"
                  decoding="async"
                />
                <div className="about-founders-caption">
                  <div>
                    <span className="sig-name">Juan & Reni</span>
                    <span className="sig-role">Fundadores de Ambrosía Bakery</span>
                  </div>
                </div>
              </motion.div>
            </Reveal>

            <Reveal x={-16} y={24} delay={0.12}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="about-storefront-frame"
              >
                <img
                  src="/assets/images/local_frente.jpg"
                  alt="Frente del local Ambrosía Bakery en Bv. Ricardo Balbín 2067"
                  className="about-storefront-img"
                  loading="lazy"
                  decoding="async"
                />
                <div className="about-storefront-caption">
                  <span>
                    <i className="fa-solid fa-store"></i> Nuestro local
                  </span>
                  <strong>Bv. Ricardo Balbín 2067</strong>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </div>

        <Reveal className="about-text-column" x={20} y={12}>
          <span className="section-subtitle">Detrás de Ambrosía</span>
          <h2 className="section-title">El manjar de los dioses, horneado en Concepción del Uruguay.</h2>

          <p className="about-lead">
            «Ambrosía era el alimento de los dioses. Nosotros creemos que una buena cookie recién horneada está bastante cerca.»
          </p>

          <p className="about-body">
            En <strong>Ambrosía Bakery</strong> horneamos todos los días cookies artesanales gruesas, crocantes por fuera y súper húmedas por dentro, junto con chipá y scones recién salidos del horno. Todo pensado para tus desayunos, meriendas y para esos regalos que se recuerdan.
          </p>

          <StaggerContainer className="artisan-features-grid" stagger={0.08}>
            {FEATURES.map((feat) => (
              <motion.div
                key={feat.title}
                variants={staggerItemVariants}
                whileHover={{ x: 4 }}
                className="feature-box"
              >
                <div className="feature-icon">
                  <i className={feat.icon}></i>
                </div>
                <div className="feature-texts">
                  <h4>{feat.title}</h4>
                  <p>{feat.desc}</p>
                </div>
              </motion.div>
            ))}
          </StaggerContainer>
        </Reveal>
      </div>
    </section>
  );
}
