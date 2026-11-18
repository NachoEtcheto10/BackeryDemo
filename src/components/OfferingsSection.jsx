import { Link } from 'react-router-dom';

const OFFERINGS = [
  {
    cat: 'cookies',
    title: 'Cookies Clásicas',
    desc: 'Chips de chocolate, red velvet & más.',
    linkLabel: 'Ver cookies',
    image: '/assets/images/cookies_pack.jpg',
    alt: 'Cookies Clásicas con chips de chocolate'
  },
  {
    cat: 'rellenas',
    title: 'Cookies Rellenas',
    desc: 'Corazón fundente de dulce de leche y Nutella.',
    linkLabel: 'Ver rellenas',
    image: '/assets/images/cookies_rellenas.jpg',
    alt: 'Cookies Rellenas'
  },
  {
    cat: 'tortas',
    title: 'Tortas Clásicas',
    desc: 'Lemon Pie, Rogel, Brownie, Selva Negra y Cheesecake.',
    linkLabel: 'Ver tortas',
    image: '/assets/images/lemon_pie.jpg',
    alt: 'Tortas Clásicas'
  },
  {
    cat: 'salados',
    title: 'Chipá & Scones',
    desc: 'Recién salidos del horno para el mate o café.',
    linkLabel: 'Ver salados',
    image: '/assets/images/chipa.jpg',
    alt: 'Chipá y Scones'
  },
  {
    cat: 'boxes',
    title: 'Boxes & Regalos',
    desc: 'Desayunos, meriendas y cajas con dedicatoria.',
    linkLabel: 'Ver boxes',
    image: '/assets/images/box_desayuno.jpg',
    alt: 'Boxes y Regalos'
  }
];

export default function OfferingsSection() {
  return (
    <section className="offerings-section" id="ofrecemos">
      <div className="container">
        <div className="offerings-showcase-card">
          <div className="offerings-header">
            <span className="section-subtitle">
              <i className="fa-solid fa-cookie-bite"></i> Nuestra Carta
            </span>
            <h2 className="section-title">Mirá lo que ofrecemos</h2>
            <p className="section-description">
              Horneamos todos los días en Concepción del Uruguay. Entrá a nuestra carta completa para ver precios, tamaños y armar tu pedido directo por WhatsApp.
            </p>
          </div>

          <div className="offerings-grid">
            {OFFERINGS.map((item) => (
              <Link key={item.cat} to={`/carta?cat=${item.cat}`} className="offerings-item">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="offerings-thumb"
                  loading="lazy"
                  decoding="async"
                />
                <div className="offerings-item-body">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <span className="offerings-link">
                    {item.linkLabel} <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="offerings-cta-bar">
            <Link to="/carta" className="btn btn-primary btn-lg">
              <i className="fa-solid fa-utensils"></i> Ver Carta Completa y Hacer Pedido
            </Link>
            <a href="#cotizador" className="btn btn-secondary">
              <i className="fa-solid fa-gift"></i> Armar mi Box Personalizada
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
