import { BUSINESS_CONFIG } from '../data/catalog.js';

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
        <span className="section-subtitle">Seguinos en Instagram</span>
        <h2 className="section-title">{BUSINESS_CONFIG.instagramHandle}</h2>
        <p className="section-description">Novedades, sabores del día y todo lo que sale del horno.</p>

        <div className="instagram-grid">
          {INSTA_POSTS.map((post) => (
            <a
              key={post.image}
              className="insta-item"
              href={BUSINESS_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img loading="lazy" decoding="async" src={post.image} alt={post.alt} />
              <div className="insta-overlay">
                <i className="fa-brands fa-instagram"></i>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-4">
          <a
            href={BUSINESS_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            <i className="fa-brands fa-instagram"></i> Seguir {BUSINESS_CONFIG.instagramHandle}
          </a>
        </div>
      </div>
    </section>
  );
}
