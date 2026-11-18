import { motion } from 'motion/react';
import { useStore } from '../context/StoreContext.jsx';
import { LOYALTY_GOAL, whatsappUrl } from '../data/catalog.js';
import { Reveal } from './MotionPrimitives.jsx';

export default function LoyaltyCardSection() {
  const { loyaltyStamps, lastStampedIndex, updateLoyaltyStamps, showToast } = useStore();
  const completed = loyaltyStamps >= LOYALTY_GOAL;
  const remaining = LOYALTY_GOAL - loyaltyStamps;
  const percent = Math.round((loyaltyStamps / LOYALTY_GOAL) * 100);

  const handleStampClick = (idx) => {
    const nextCount = idx + 1 === loyaltyStamps ? idx : idx + 1;
    updateLoyaltyStamps(nextCount, nextCount > loyaltyStamps ? idx : -1);
  };

  const handleAddStamp = () => {
    if (loyaltyStamps >= LOYALTY_GOAL) return;
    const next = loyaltyStamps + 1;
    updateLoyaltyStamps(next, loyaltyStamps);
    showToast(`Sello #${next} agregado a tu tarjeta Ambrosía.`, 'fa-solid fa-cookie-bite');
  };

  const handleReset = () => {
    updateLoyaltyStamps(0, -1);
    showToast('Tarjeta reiniciada. ¡Listo para juntar nuevos sellos!', 'fa-solid fa-rotate-left');
  };

  const handleClaim = () => {
    let msg;
    if (completed) {
      const clubCode = `CLUB-${Math.floor(1000 + Math.random() * 9000)}`;
      msg = `*CANJE CLUB AMBROSÍA* 🍪✨\n\n¡Hola! Completé los *${LOYALTY_GOAL}/${LOYALTY_GOAL} sellos* de mi Tarjeta de Fidelidad.\n• Código de canje: #${clubCode}\n• Premio: 1 Box x4 Cookies Clásicas o 15% OFF en torta clásica.\n\nQuisiera coordinar para canjearlo en mi próximo pedido. ¡Muchas gracias!`;
    } else {
      msg = `¡Hola! 🍪 Tengo *${loyaltyStamps}/${LOYALTY_GOAL} sellos* en mi Tarjeta de Fidelidad del Club Ambrosía y quería consultar cómo sumar mis próximos sellos.`;
    }
    window.open(whatsappUrl(msg), '_blank', 'noopener');
  };

  return (
    <section className="loyalty-section" id="fidelidad">
      <div className="container loyalty-layout">
        <Reveal className="loyalty-info-col" x={-18} y={12}>
          <span className="section-subtitle">
            <i className="fa-solid fa-award"></i> Club Ambrosía
          </span>
          <h2 className="section-title">Tarjeta de Fidelidad Interactiva</h2>
          <p className="loyalty-lead">
            Cada compra que hacés suma una cookie en tu tarjeta. Al completar los{' '}
            <strong>{LOYALTY_GOAL} sellos</strong>, te regalás una{' '}
            <strong>Box x4 Cookies Clásicas</strong> o un{' '}
            <strong>15% OFF en tu torta favorita</strong>.
          </p>

          <ul className="loyalty-perks-list">
            <li>
              <i className="fa-solid fa-circle-check"></i> Sumás 1 sello con cada compra desde $5.000 (en local o por WhatsApp).
            </li>
            <li>
              <i className="fa-solid fa-circle-check"></i> Al confirmar un pedido en esta web se suma un sello automáticamente.
            </li>
            <li>
              <i className="fa-solid fa-circle-check"></i> Tocá los sellos de la tarjeta para probar cómo se completa.
            </li>
          </ul>

          <div className="loyalty-actions-row">
            <motion.button
              type="button"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary"
              disabled={completed}
              onClick={handleAddStamp}
            >
              <i className="fa-solid fa-stamp"></i> Sumar 1 Sello
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-secondary"
              onClick={handleReset}
            >
              <i className="fa-solid fa-rotate-left"></i> Reiniciar
            </motion.button>
          </div>
        </Reveal>

        <Reveal className="loyalty-card-col" x={18} y={16} delay={0.08}>
          <motion.div
            animate={completed ? { scale: [1, 1.02, 1] } : undefined}
            transition={{ duration: 0.6 }}
            className={`loyalty-card-shell ${completed ? 'is-completed' : ''}`}
          >
            <div className="loyalty-card-top">
              <div className="loyalty-brand-row">
                <img
                  src="/assets/images/logo.svg"
                  alt="Ambrosía"
                  width="38"
                  height="38"
                  className="loyalty-card-logo"
                />
                <div>
                  <span className="loyalty-card-kicker">CLUB AMBROSÍA</span>
                  <strong className="loyalty-card-name">Pasaporte Cookie</strong>
                </div>
              </div>
              <motion.span
                key={loyaltyStamps}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="loyalty-count-badge"
              >
                {loyaltyStamps} / {LOYALTY_GOAL} sellos
              </motion.span>
            </div>

            <div
              className="loyalty-stamps-grid"
              role="group"
              aria-label="Sellos de fidelidad Ambrosía"
            >
              {Array.from({ length: LOYALTY_GOAL }, (_, idx) => {
                const isFilled = idx < loyaltyStamps;
                const isRewardSlot = idx === LOYALTY_GOAL - 1;
                const justStamped = idx === lastStampedIndex && isFilled;
                return (
                  <motion.button
                    key={idx}
                    type="button"
                    whileHover={{ y: -3, scale: 1.04 }}
                    whileTap={{ scale: 0.88 }}
                    animate={justStamped ? { scale: [0.75, 1.15, 1], rotate: [-10, 6, 0] } : undefined}
                    transition={{ type: 'spring', stiffness: 420, damping: 18 }}
                    className={`loyalty-stamp-btn ${isFilled ? 'is-filled' : ''} ${
                      isRewardSlot ? 'is-reward-slot' : ''
                    }`}
                    aria-label={isRewardSlot ? 'Sello 8 - Premio' : `Sello ${idx + 1}`}
                    aria-pressed={isFilled}
                    onClick={() => handleStampClick(idx)}
                  >
                    <i className={isRewardSlot ? 'fa-solid fa-gift' : 'fa-solid fa-cookie-bite'}></i>
                    <span>{isRewardSlot ? 'PREMIO' : idx + 1}</span>
                  </motion.button>
                );
              })}
            </div>

            <div className="loyalty-progress-wrap">
              <div className="loyalty-progress-track">
                <motion.div
                  className="loyalty-progress-fill"
                  initial={false}
                  animate={{ width: `${percent}%` }}
                  transition={{ type: 'spring', stiffness: 180, damping: 24 }}
                />
              </div>
              <p className="loyalty-status-text">
                {completed ? (
                  <>
                    <strong>¡Tarjeta completa!</strong> Desbloqueaste{' '}
                    <strong>1 Box x4 Cookies o 15% OFF en tu torta</strong>.
                  </>
                ) : loyaltyStamps === 0 ? (
                  'Tocá un sello o sumá compras para empezar a acumular tus 8 cookies.'
                ) : (
                  <>
                    Te {remaining === 1 ? 'falta' : 'faltan'}{' '}
                    <strong>
                      {remaining} {remaining === 1 ? 'sello' : 'sellos'}
                    </strong>{' '}
                    para llevarte una <strong>Box x4 Cookies de regalo</strong>.
                  </>
                )}
              </p>
            </div>

            <motion.button
              type="button"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={`btn btn-whatsapp-full loyalty-claim-btn ${completed ? 'is-ready' : ''}`}
              onClick={handleClaim}
            >
              <i className="fa-brands fa-whatsapp"></i>{' '}
              {completed ? '¡Canjear Premio por WhatsApp!' : 'Consultar mi Club por WhatsApp'}
            </motion.button>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
