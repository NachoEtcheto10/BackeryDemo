import { motion } from 'motion/react';
import { useState } from 'react';
import { BUSINESS_CONFIG } from '../data/catalog.js';
import DepthCarousel from './DepthCarousel.jsx';
import { Reveal } from './MotionPrimitives.jsx';

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
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="instagram-section">
      <div className="container text-center">
        <Reveal>
          <span className="section-subtitle">Seguinos en Instagram</span>
          <h2 className="section-title">{BUSINESS_CONFIG.instagramHandle}</h2>
          <p className="section-description">Novedades, sabores del día y todo lo que sale del horno.</p>
        </Reveal>

        <Reveal delay={0.08} y={20}>
          <div className="relative mx-auto mt-6 h-[430px] w-full max-w-[1040px] sm:mt-8 sm:h-[520px] md:h-[570px]">
            <DepthCarousel
              items={INSTA_POSTS}
              cardWidth={390}
              cardHeight={490}
              radius={20}
              tint="#2E160A"
              depth={240}
              spread={115}
              tilt={20}
              tiltDirection="right"
              perspective={1400}
              visibleCards={4}
              falloff={0.2}
              blur={5}
              autoplay
              autoplayDelay={3200}
              loop
              onChange={(idx) => setActiveIndex(idx)}
            />
          </div>
          <p className="mt-2 text-xs font-medium text-[#76553C] sm:text-sm">
            {INSTA_POSTS[activeIndex]?.alt}
          </p>
        </Reveal>

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
