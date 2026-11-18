import { Fragment } from 'react';

const VALUES = [
  'Cookies que derriten',
  'Chipá recién horneado',
  'Scones caseros',
  'Desayunos & meriendas',
  'Boxes para regalar',
  'Pedidos por WhatsApp'
];

export default function ValuesMarquee() {
  return (
    <div className="values-marquee" aria-hidden="true">
      <div className="values-marquee-track">
        {[0, 1, 2, 3].map((groupIdx) => (
          <div key={groupIdx} className="values-marquee-group">
            {VALUES.map((item) => (
              <Fragment key={`${groupIdx}-${item}`}>
                <span>{item}</span>
                <i className="fa-solid fa-cookie-bite"></i>
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
