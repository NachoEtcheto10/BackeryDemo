import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import { DEFAULT_PRODUCT_IMG, REWARD_GOAL, formatCurrency } from '../data/catalog.js';

export default function CartDrawer() {
  const {
    cart,
    totals,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    updateItemQuantity,
    removeFromCart,
    showToast
  } = useStore();
  const navigate = useNavigate();

  const { subtotal, total, totalItems } = totals;
  const remaining = Math.max(0, REWARD_GOAL - subtotal);
  const rewardPercent = subtotal === 0 ? 0 : Math.min(100, Math.round((subtotal / REWARD_GOAL) * 100));

  const handleExplore = () => {
    setIsCartOpen(false);
    navigate('/carta');
  };

  const handleProceed = () => {
    if (cart.length === 0) {
      showToast('Tu canasta está vacía. ¡Agregá una delicia primero!', 'fa-solid fa-circle-exclamation');
      return;
    }
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <div
        className={`cart-drawer-overlay ${isCartOpen ? 'open' : ''}`}
        onClick={() => setIsCartOpen(false)}
      />

      <aside className={`cart-drawer ${isCartOpen ? 'open' : ''}`} aria-label="Carrito de compras">
        <div className="cart-drawer-header">
          <div className="cart-header-title">
            <i className="fa-solid fa-basket-shopping"></i>
            <h3>Tu Canasta Dulce</h3>
            <span className="cart-count-pill">
              {totalItems} producto{totalItems === 1 ? '' : 's'}
            </span>
          </div>
          <button
            type="button"
            className="btn-close-drawer"
            aria-label="Cerrar carrito"
            onClick={() => setIsCartOpen(false)}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="cart-reward-bar">
          <div className="reward-bar-header">
            <span className="reward-icon">
              <i className="fa-solid fa-gift"></i>
            </span>
            <span className="reward-text">
              {subtotal === 0 && (
                <>¡Sumá {formatCurrency(REWARD_GOAL)} para ganar una Cookie Artesanal de regalo!</>
              )}
              {subtotal >= REWARD_GOAL && (
                <>
                  <strong>¡Felicitaciones!</strong> Desbloqueaste una Cookie Artesanal de cortesía.
                </>
              )}
              {subtotal > 0 && subtotal < REWARD_GOAL && (
                <>
                  ¡Sumá <strong>{formatCurrency(remaining)}</strong> más para ganar una Cookie de regalo!
                </>
              )}
            </span>
          </div>
          <div className="reward-progress-track">
            <div className="reward-progress-fill" style={{ width: `${rewardPercent}%` }} />
          </div>
        </div>

        <div className="cart-drawer-body">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <div className="empty-cart-illu">
                <i className="fa-solid fa-basket-shopping"></i>
              </div>
              <h4>Tu canasta está vacía</h4>
              <p>Descubrí nuestras cookies, tortas, chipá y boxes para comenzar tu pedido.</p>
              <button type="button" className="btn btn-primary btn-sm" onClick={handleExplore}>
                Explorar Carta Dulce
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.cartItemId} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-img"
                  onError={(e) => {
                    e.currentTarget.src = DEFAULT_PRODUCT_IMG;
                  }}
                />
                <div className="cart-item-details">
                  <h4 className="cart-item-title">{item.name}</h4>
                  <span className="cart-item-variant">{item.variantName}</span>
                  <div className="cart-item-controls">
                    <div className="qty-stepper">
                      <button
                        type="button"
                        className="qty-btn"
                        aria-label="Disminuir"
                        onClick={() => updateItemQuantity(item.cartItemId, -1)}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <span className="qty-val">{item.quantity}</span>
                      <button
                        type="button"
                        className="qty-btn"
                        aria-label="Aumentar"
                        onClick={() => updateItemQuantity(item.cartItemId, 1)}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                    <span className="cart-item-price">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="cart-item-remove-btn"
                  title="Eliminar de la canasta"
                  aria-label="Eliminar"
                  onClick={() => removeFromCart(item.cartItemId)}
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-drawer-footer">
          <div className="cart-cost-breakdown">
            <div className="cost-row">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="cost-row total-row">
              <span>Total Estimado</span>
              <span className="final-total">{formatCurrency(total)}</span>
            </div>
          </div>

          <button type="button" className="btn btn-primary btn-block btn-checkout" onClick={handleProceed}>
            <span>Completar Pedido por WhatsApp</span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>

          <p className="cart-legal-note">
            <i className="fa-solid fa-lock"></i> Pedido 100% seguro · Coordinación inmediata por WhatsApp
          </p>
        </div>
      </aside>
    </>
  );
}
