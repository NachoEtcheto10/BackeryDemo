import { motion } from 'motion/react';
import { BUSINESS_CONFIG } from '../data/catalog.js';
import { Reveal, StaggerContainer, staggerItemVariants } from './MotionPrimitives.jsx';

const INSTA_POSTS = [
  {
    image: '/assets/images/real_mostrador.png',
    alt: 'Mostrador de cookies artesanales en Ambrosía Bakery'
  },
  {
    image: '/assets/images/real_cookies_kinder.png',
    alt: 'Cookies con Kinder recién salidas del horno en Ambrosía'
  },
  {
    image: '/assets/images/real_cookie_limon.png',
    alt: 'Cookie artesanal con crema de limón Ambrosía'
  },
  {
    image: '/assets/images/real_boxes_local.png',
    alt: 'Cajas de cookies y bocados artesanales listas en el local'
  },
  {
    image: '/assets/images/real_box_x6.png',
    alt: 'Box x6 cookies surtidas de red velvet, arándanos y limón'
  },
  {
    image: '/assets/images/real_cookie_frutos.png',
    alt: 'Cookie artesanal con frutos rojos y chocolate en Ambrosía'
  }
];

export default function InstagramSection() {
  return (
    <section className="instagram-section">
      <div className="container text-center">
        <Reveal>
          <span className="section-subtitle">Seguinos en Instagram</span>
          <h2 className="section-title">{BUSINESS_CONFIG.instagramHandle}</h2>
          <p className="section-description">Novedades, sabores del día y todo lo que sale del horno.</p>
        </Reveal>

        <StaggerContainer className="instagram-grid" stagger={0.06}>
          {INSTA_POSTS.map((post) => (
            <motion.a
              key={post.image}
              variants={staggerItemVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="insta-item"
              href={BUSINESS_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img loading="lazy" decoding="async" src={post.image} alt={post.alt} />
              <div className="insta-overlay">
                <i className="fa-brands fa-instagram"></i>
              </div>
            </motion.a>
          ))}
        </StaggerContainer>

        <div className="mt-4">
          <motion.a
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            href={BUSINESS_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            <i className="fa-brands fa-instagram"></i> Seguir {BUSINESS_CONFIG.instagramHandle}
          </motion.a>
        </div>
      </div>
    </section>
  );
}
