import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { LOYALTY_GOAL, PRODUCTS_DATA } from '../data/catalog.js';

const CART_STORAGE_KEY = 'ambrosia_cart';
const LOYALTY_STORAGE_KEY = 'ambrosia_loyalty_stamps';

const StoreContext = createContext(null);

function readStoredCart() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function readStoredStamps() {
  try {
    const saved = localStorage.getItem(LOYALTY_STORAGE_KEY);
    if (saved === null) return 3;
    const num = parseInt(saved, 10);
    return Number.isFinite(num) ? Math.max(0, Math.min(LOYALTY_GOAL, num)) : 3;
  } catch {
    return 3;
  }
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(readStoredCart);
  const [loyaltyStamps, setLoyaltyStamps] = useState(readStoredStamps);
  const [lastStampedIndex, setLastStampedIndex] = useState(-1);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [successOrder, setSuccessOrder] = useState(null);
  const [toasts, setToasts] = useState([]);

  const cartTriggerRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      /* sin espacio en storage */
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(LOYALTY_STORAGE_KEY, String(loyaltyStamps));
    } catch {
      /* sin espacio en storage */
    }
  }, [loyaltyStamps]);

  // Bloqueo de scroll cuando hay algún modal o drawer abierto
  useEffect(() => {
    const anyOverlayOpen =
      isCartOpen || isMobileNavOpen || isCheckoutOpen || Boolean(quickViewProduct) || Boolean(successOrder);
    document.body.style.overflow = anyOverlayOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen, isMobileNavOpen, isCheckoutOpen, quickViewProduct, successOrder]);

  // Tecla Escape cierra modales/drawers
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsCartOpen(false);
        setIsMobileNavOpen(false);
        setIsCheckoutOpen(false);
        setQuickViewProduct(null);
        setSuccessOrder(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const showToast = useCallback((message, iconClass = 'fa-solid fa-check') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, iconClass }]);
    setTimeout(() => {
      setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, hiding: true } : t)));
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 300);
    }, 3200);
  }, []);

  const flyToCart = useCallback((sourceEl, imageSrc) => {
    const target = cartTriggerRef.current;
    if (!sourceEl || !target || !imageSrc) return;

    const from = sourceEl.getBoundingClientRect();
    const to = target.getBoundingClientRect();
    const size = Math.min(Math.max(from.width * 0.4, 64), 120);
    const dx = to.left + to.width / 2 - (from.left + from.width / 2);
    const dy = to.top + to.height / 2 - (from.top + from.height / 2);

    const flyer = document.createElement('div');
    flyer.className = 'fly-to-cart';
    flyer.style.width = `${size}px`;
    flyer.style.height = `${size}px`;
    flyer.style.left = `${from.left + (from.width - size) / 2}px`;
    flyer.style.top = `${from.top + (from.height - size) / 2}px`;

    const img = document.createElement('img');
    img.src = imageSrc;
    flyer.appendChild(img);
    document.body.appendChild(flyer);

    const duration = 760;
    const flight = img.animate(
      [
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${dx * 0.45}px, ${dy * 0.35 - 50}px) scale(0.75)`, opacity: 0.95, offset: 0.45 },
        { transform: `translate(${dx}px, ${dy}px) scale(0.22)`, opacity: 0.35 }
      ],
      { duration, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' }
    );
    flight.onfinish = () => flyer.remove();
  }, []);

  const addToCart = useCallback(
    (productId, variantIndex = 0, quantity = 1, sourceEl = null, imageSrcOverride = null) => {
      const product = PRODUCTS_DATA.find((p) => p.id === productId);
      if (!product) return false;
      if (product.available === false) {
        showToast(`${product.name} se encuentra actualmente sin stock.`, 'fa-solid fa-ban');
        return false;
      }

      const variant = product.variants?.[variantIndex] || { name: 'Estándar', price: product.basePrice };
      const cartItemId = `${product.id}-${variant.name.replace(/\s+/g, '_')}`;

      setCart((prev) => {
        const idx = prev.findIndex((item) => item.cartItemId === cartItemId);
        if (idx > -1) {
          return prev.map((item, i) => (i === idx ? { ...item, quantity: item.quantity + quantity } : item));
        }
        return [
          ...prev,
          {
            cartItemId,
            id: product.id,
            name: product.name,
            variantName: variant.name,
            price: variant.price,
            image: product.image,
            quantity
          }
        ];
      });

      if (sourceEl) {
        flyToCart(sourceEl, imageSrcOverride || product.image);
      }
      showToast(`¡Agregaste ${product.name} a tu canasta!`, 'fa-solid fa-basket-shopping');
      return true;
    },
    [flyToCart, showToast]
  );

  const addCustomItemToCart = useCallback(
    (customItem, sourceEl = null) => {
      setCart((prev) => [...prev, customItem]);
      if (sourceEl) {
        flyToCart(sourceEl, customItem.image);
      }
      showToast('¡Tu box personalizada se agregó a la canasta!', 'fa-solid fa-basket-shopping');
    },
    [flyToCart, showToast]
  );

  const updateItemQuantity = useCallback((cartItemId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeFromCart = useCallback(
    (cartItemId) => {
      setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
      showToast('Producto eliminado de la canasta.', 'fa-solid fa-trash-can');
    },
    [showToast]
  );

  const clearCart = useCallback(() => setCart([]), []);

  const updateLoyaltyStamps = useCallback(
    (nextCount, animatedIdx = -1) => {
      const clamped = Math.max(0, Math.min(LOYALTY_GOAL, nextCount));
      setLastStampedIndex(animatedIdx);
      setLoyaltyStamps((prev) => {
        if (clamped === LOYALTY_GOAL && prev < LOYALTY_GOAL) {
          setTimeout(() => {
            showToast('¡Completaste los 8 sellos del Club Ambrosía! Tu premio está listo.', 'fa-solid fa-gift');
          }, 0);
        }
        return clamped;
      });
    },
    [showToast]
  );

  const awardOrderLoyaltyStamp = useCallback(() => {
    setLoyaltyStamps((prev) => {
      if (prev >= LOYALTY_GOAL) return prev;
      const next = prev + 1;
      setLastStampedIndex(prev);
      if (next === LOYALTY_GOAL) {
        setTimeout(() => {
          showToast('¡Completaste los 8 sellos del Club Ambrosía! Tu premio está listo.', 'fa-solid fa-gift');
        }, 0);
      }
      return next;
    });
  }, [showToast]);

  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    return { subtotal, total: subtotal, totalItems };
  }, [cart]);

  const value = {
    cart,
    totals,
    loyaltyStamps,
    lastStampedIndex,
    isCartOpen,
    setIsCartOpen,
    isMobileNavOpen,
    setIsMobileNavOpen,
    isCheckoutOpen,
    setIsCheckoutOpen,
    quickViewProduct,
    setQuickViewProduct,
    successOrder,
    setSuccessOrder,
    toasts,
    cartTriggerRef,
    showToast,
    addToCart,
    addCustomItemToCart,
    updateItemQuantity,
    removeFromCart,
    clearCart,
    updateLoyaltyStamps,
    awardOrderLoyaltyStamp
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
}
