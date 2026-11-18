export default function AboutSection() {
  return (
    <section className="about-section" id="historia">
      <div className="container about-container">
        <div className="about-image-column">
          <div className="about-gallery-stack">
            <div className="about-image-frame about-founders-frame">
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
            </div>

            <div className="about-storefront-frame">
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
            </div>
          </div>
        </div>

        <div className="about-text-column">
          <span className="section-subtitle">Detrás de Ambrosía</span>
          <h2 className="section-title">El manjar de los dioses, horneado en Concepción del Uruguay.</h2>

          <p className="about-lead">
            «Ambrosía era el alimento de los dioses. Nosotros creemos que una buena cookie recién horneada está bastante cerca.»
          </p>

          <p className="about-body">
            En <strong>Ambrosía Bakery</strong> horneamos todos los días cookies artesanales gruesas, crocantes por fuera y súper húmedas por dentro, junto con chipá y scones recién salidos del horno. Todo pensado para tus desayunos, meriendas y para esos regalos que se recuerdan.
          </p>

          <div className="artisan-features-grid">
            <div className="feature-box">
              <div className="feature-icon">
                <i className="fa-solid fa-cookie-bite"></i>
              </div>
              <div className="feature-texts">
                <h4>Cookies que derriten</h4>
                <p>Bordes crocantes, centro húmedo y rellenos generosos.</p>
              </div>
            </div>

            <div className="feature-box">
              <div className="feature-icon">
                <i className="fa-solid fa-fire-burner"></i>
              </div>
              <div className="feature-texts">
                <h4>Recién horneado</h4>
                <p>Chipá, scones y cookies que salen del horno en el día.</p>
              </div>
            </div>

            <div className="feature-box">
              <div className="feature-icon">
                <i className="fa-solid fa-gift"></i>
              </div>
              <div className="feature-texts">
                <h4>Listo para regalar</h4>
                <p>Boxes con moño y tarjeta con dedicatoria incluida.</p>
              </div>
            </div>

            <div className="feature-box">
              <div className="feature-icon">
                <i className="fa-solid fa-mug-hot"></i>
              </div>
              <div className="feature-texts">
                <h4>Desayunos & meriendas</h4>
                <p>Combos pensados para compartir con quien más querés.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
