import { BUSINESS_CONFIG, whatsappUrl } from '../data/catalog.js';

const FAQS = [
  {
    q: '¿Con cuánta anticipación tengo que pedir?',
    a: (
      <p>
        Para cookies, chipá y scones podés consultarnos por el <strong>stock del día</strong>. Para{' '}
        <strong>tortas clásicas, boxes de regalo y cumpleaños</strong> te recomendamos pedir con{' '}
        <strong>48 a 72 horas</strong> de anticipación para asegurar la fecha.
      </p>
    ),
    defaultOpen: true
  },
  {
    q: '¿Hacen envíos? ¿Dónde retiro?',
    a: (
      <p>
        Podés retirar tu pedido sin costo en{' '}
        <strong>{BUSINESS_CONFIG.shortAddress}, Concepción del Uruguay</strong> (todos los días de
        8:30 a 12:00 y de 17:00 a 20:00 hs). También hacemos envíos dentro de la ciudad: el costo
        se coordina según la zona al confirmar el pedido por WhatsApp.
      </p>
    )
  },
  {
    q: '¿Cuáles son los medios de pago?',
    a: (
      <p>
        Aceptamos <strong>transferencia</strong>, <strong>Mercado Pago</strong> y{' '}
        <strong>efectivo</strong> al retirar. Al confirmar tu pedido por WhatsApp te pasamos los
        datos de pago.
      </p>
    )
  },
  {
    q: '¿Cómo conservo las cookies, las tortas y el chipá?',
    a: (
      <p>
        Las cookies se conservan en su caja o en un recipiente cerrado a temperatura ambiente hasta 5
        días (tip: calentalas 10 segundos en microondas para que se derritan). Las tortas van en
        heladera y el chipá y los scones son ideales en el día.
      </p>
    )
  },
  {
    q: '¿Hacen regalos empresariales o pedidos para eventos?',
    a: (
      <p>
        ¡Sí! Armamos boxes personalizadas y mesas dulces para empresas, eventos, cumpleaños y fechas
        especiales, incluso en conjunto con nuestros aliados gastronómicos. Escribinos por WhatsApp
        con la cantidad y la fecha.
      </p>
    )
  }
];

export default function FaqSection() {
  return (
    <section className="faq-section" id="faq">
      <div className="container faq-layout">
        <div className="faq-intro">
          <span className="section-subtitle">Resolvemos tus dudas</span>
          <h2 className="section-title">Preguntas Frecuentes</h2>
          <p className="section-description">
            Todo lo que necesitás saber antes de hacer tu pedido en Ambrosía.
          </p>
          <a
            href={whatsappUrl('Hola!! 🍪 Tengo una consulta.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            <i className="fa-brands fa-whatsapp"></i> Tengo otra consulta
          </a>
        </div>

        <div className="faq-accordion-wrapper">
          {FAQS.map((item) => (
            <details key={item.q} className="faq-item" name="faq" open={Boolean(item.defaultOpen)}>
              <summary className="faq-question">
                <span>{item.q}</span>
                <span className="faq-chevron">
                  <i className="fa-solid fa-plus"></i>
                </span>
              </summary>
              <div className="faq-answer">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
