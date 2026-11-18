const TESTIMONIALS = [
  {
    initials: 'MF',
    name: 'Milagros F.',
    meta: 'Cookies rellenas · Pedido WhatsApp',
    text: '«Las cookies rellenas de Nutella son una locura, las calentás unos segundos y se derriten. Ya no puedo pasar una semana sin pedir.»',
    highlight: false
  },
  {
    initials: 'JP',
    name: 'Julieta P.',
    meta: 'Box Desayuno · Regalo de cumpleaños',
    text: '«Le mandé la box de desayuno a mi mamá para su cumple y quedó encantada. Llegó súper linda, con la tarjeta y todo fresquito. ¡Gracias Ambrosía!»',
    highlight: true
  },
  {
    initials: 'NR',
    name: 'Nicolás R.',
    meta: 'Chipá & Cookies · Retiro en el local',
    text: '«El chipá es el mejor de Concepción, no exagero. Ideal para el mate de la tarde. Y las cookies clásicas, un must.»',
    highlight: false
  }
];

export default function TestimonialsSection() {
  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">Momentos Dulces</span>
          <h2 className="section-title">Lo que dicen quienes ya probaron</h2>
          <p className="section-description">
            Cada desayuno sorpresa, cada merienda compartida y cada box regalada es lo que nos mueve.
          </p>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.name}
              className={`testimonial-card ${item.highlight ? 'highlight-card' : ''}`}
            >
              <div className="testimonial-stars">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <p className="testimonial-text">{item.text}</p>
              <div className="testimonial-author">
                <div className="author-avatar">{item.initials}</div>
                <div className="author-info">
                  <strong>{item.name}</strong>
                  <span>{item.meta}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
