import { Fragment, useEffect, useRef } from 'react';

const VALUES = [
  'Cookies que derriten',
  'Chipá recién horneado',
  'Scones caseros',
  'Tortas clásicas',
  'Desayunos & meriendas',
  'Boxes para regalar',
  'Pedidos por WhatsApp'
];

export default function ValuesMarquee() {
  const trackRef = useRef(null);
  const firstGroupRef = useRef(null);
  const speedMultiplierRef = useRef(1);

  useEffect(() => {
    let rafId = 0;
    let lastTime = null;
    let offset = 0;
    const baseSpeedPxPerSec = 56;

    const tick = (now) => {
      if (lastTime === null) lastTime = now;
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const groupWidth = firstGroupRef.current?.offsetWidth || 0;
      if (groupWidth > 0 && trackRef.current) {
        offset = (offset + baseSpeedPxPerSec * speedMultiplierRef.current * dt) % groupWidth;
        trackRef.current.style.transform = `translate3d(-${offset.toFixed(2)}px, 0, 0)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      className="values-marquee"
      aria-hidden="true"
      onMouseEnter={() => {
        speedMultiplierRef.current = 0.35;
      }}
      onMouseLeave={() => {
        speedMultiplierRef.current = 1;
      }}
    >
      <div ref={trackRef} className="values-marquee-track will-change-transform">
        {[0, 1, 2, 3].map((groupIdx) => (
          <div
            key={groupIdx}
            ref={groupIdx === 0 ? firstGroupRef : undefined}
            className="values-marquee-group"
          >
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
