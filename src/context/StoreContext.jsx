import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { DEMO_USERS, INITIAL_ORDERS } from '../data/adminSeed.js';
import { LOYALTY_GOAL, PRODUCTS_DATA } from '../data/catalog.js';

const CART_STORAGE_KEY = 'ambrosia_cart';
const LOYALTY_STORAGE_KEY = 'ambrosia_loyalty_stamps';
const PRODUCTS_STORAGE_KEY = 'ambrosia_admin_products';
const ORDERS_STORAGE_KEY = 'ambrosia_admin_orders';
const USERS_STORAGE_KEY = 'ambrosia_users';
const SESSION_STORAGE_KEY = 'ambrosia_session_user_id';

const StoreContext = createContext(null);

function readStoredJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function readStoredCart() {
  const parsed = readStoredJson(CART_STORAGE_KEY, []);
  return Array.isArray(parsed) ? parsed : [];
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

function readStoredProducts() {
  const saved = readStoredJson(PRODUCTS_STORAGE_KEY, null);
  return Array.isArray(saved) && saved.length > 0 ? saved : PRODUCTS_DATA;
}

function readStoredOrders() {
  const saved = readStoredJson(ORDERS_STORAGE_KEY, null);
  return Array.isArray(saved) && saved.length > 0 ? saved : INITIAL_ORDERS;
}

function readStoredUsers() {
  const saved = readStoredJson(USERS_STORAGE_KEY, null);
  return Array.isArray(saved) && saved.length > 0 ? saved : DEMO_USERS;
}

function readStoredSessionId() {
  try {
    return localStorage.getItem(SESSION_STORAGE_KEY) || '';
  } catch {
    return '';
  }
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(readStoredCart);
  const [loyaltyStamps, setLoyaltyStamps] = useState(readStoredStamps);
  const [lastStampedIndex, setLastStampedIndex] = useState(-1);

  const [products, setProducts] = useState(readStoredProducts);
  const [orders, setOrders] = useState(readStoredOrders);
  const [users, setUsers] = useState(readStoredUsers);
  const [sessionUserId, setSessionUserId] = useState(readStoredSessionId);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [successOrder, setSuccessOrder] = useState(null);
  const [toasts, setToasts] = useState([]);

  const cartTriggerRef = useRef(null);

  const currentUser = useMemo(
    () => users.find((u) => u.id === sessionUserId) || null,
    [users, sessionUserId]
  );

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

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch {
      /* sin espacio en storage */
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      /* sin espacio en storage */
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch {
      /* sin espacio en storage */
    }
  }, [users]);

  useEffect(() => {
    try {
      if (sessionUserId) {
        localStorage.setItem(SESSION_STORAGE_KEY, sessionUserId);
      } else {
        localStorage.removeItem(SESSION_STORAGE_KEY);
      }
    } catch {
      /* sin espacio en storage */
    }
  }, [sessionUserId]);

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
      const product = products.find((p) => p.id === productId);
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
    [flyToCart, products, showToast]
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

  const addProduct = useCallback(
    (productInput) => {
      const slug = String(productInput.name || 'producto')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      const newProduct = {
        ...productInput,
        id: `${slug || 'producto'}-${Date.now().toString(36)}`,
        available: productInput.available !== false,
        variants:
          Array.isArray(productInput.variants) && productInput.variants.length > 0
            ? productInput.variants
            : [{ name: productInput.servings || 'Unidad', price: Number(productInput.basePrice) || 0 }]
      };
      setProducts((prev) => [newProduct, ...prev]);
      showToast(`Producto "${newProduct.name}" agregado a la carta.`, 'fa-solid fa-plus');
      return newProduct;
    },
    [showToast]
  );

  const updateProduct = useCallback(
    (id, patch) => {
      setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
      showToast('Producto actualizado correctamente.', 'fa-solid fa-pen-to-square');
    },
    [showToast]
  );

  const toggleProductAvailability = useCallback(
    (id) => {
      setProducts((prev) =>
        prev.map((p) => {
          if (p.id !== id) return p;
          const nextAvailable = p.available === false;
          showToast(
            `${p.name}: ${nextAvailable ? 'Disponible en carta' : 'Marcado sin stock'}.`,
            nextAvailable ? 'fa-solid fa-circle-check' : 'fa-solid fa-eye-slash'
          );
          return { ...p, available: nextAvailable };
        })
      );
    },
    [showToast]
  );

  const deleteProduct = useCallback(
    (id) => {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showToast('Producto eliminado de la carta.', 'fa-solid fa-trash-can');
    },
    [showToast]
  );

  const resetProductsToDefault = useCallback(() => {
    setProducts(PRODUCTS_DATA);
    showToast('Catálogo restaurado a los valores originales.', 'fa-solid fa-rotate-left');
  }, [showToast]);

  const createOrderFromCheckout = useCallback((orderInput) => {
    const newOrder = {
      id: orderInput.orderCode.replace('#', ''),
      customerName: orderInput.customerName,
      customerEmail: orderInput.customerEmail || '',
      customerPhone: orderInput.customerPhone,
      deliveryType: orderInput.deliveryType,
      address: orderInput.address,
      deliveryDate: orderInput.deliveryDate,
      deliveryTime: orderInput.deliveryTime,
      paymentMethod: orderInput.paymentMethod,
      status: 'pendiente',
      notes: orderInput.notes || '',
      total: orderInput.total,
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      items: orderInput.items || []
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  }, []);

  const updateOrderStatus = useCallback(
    (orderId, nextStatus) => {
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o)));
      showToast(`Pedido #${orderId} actualizado.`, 'fa-solid fa-clipboard-check');
    },
    [showToast]
  );

  const registerUser = useCallback(
    ({ name, email, phone, address = '', password }) => {
      const normalizedEmail = String(email || '').trim().toLowerCase();
      if (users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
        return { ok: false, error: 'Ya existe una cuenta registrada con ese correo electrónico.' };
      }
      const newUser = {
        id: `usr-${Date.now().toString(36)}`,
        name: String(name || '').trim(),
        email: normalizedEmail,
        phone: String(phone || '').trim(),
        address: String(address || '').trim(),
        password,
        role: 'customer',
        loyaltyStamps: 1,
        createdAt: new Date().toISOString().slice(0, 10)
      };
      setUsers((prev) => [...prev, newUser]);
      setSessionUserId(newUser.id);
      setLoyaltyStamps(newUser.loyaltyStamps);
      showToast(`¡Bienvenido/a a Ambrosía, ${newUser.name.split(' ')[0]}!`, 'fa-solid fa-sparkles');
      return { ok: true, user: newUser };
    },
    [showToast, users]
  );

  const loginUser = useCallback(
    ({ email, password }) => {
      const normalizedEmail = String(email || '').trim().toLowerCase();
      const found = users.find((u) => u.email.toLowerCase() === normalizedEmail && u.password === password);
      if (!found) {
        return { ok: false, error: 'Correo o contraseña incorrectos. Probá con los accesos demo o verificá tus datos.' };
      }
      setSessionUserId(found.id);
      if (typeof found.loyaltyStamps === 'number') {
        setLoyaltyStamps(found.loyaltyStamps);
      }
      showToast(`¡Hola de nuevo, ${found.name.split(' ')[0]}!`, 'fa-solid fa-user-check');
      return { ok: true, user: found };
    },
    [showToast, users]
  );

  const loginAsDemo = useCallback(
    (role = 'customer') => {
      const found = users.find((u) => u.role === role);
      if (!found) return null;
      setSessionUserId(found.id);
      if (typeof found.loyaltyStamps === 'number') {
        setLoyaltyStamps(found.loyaltyStamps);
      }
      showToast(
        role === 'admin' ? 'Ingresaste al Panel Admin de Ambrosía.' : `Sesión iniciada como ${found.name}.`,
        role === 'admin' ? 'fa-solid fa-shield-halved' : 'fa-solid fa-user-check'
      );
      return found;
    },
    [showToast, users]
  );

  const updateProfile = useCallback(
    (patch) => {
      if (!sessionUserId) return;
      setUsers((prev) => prev.map((u) => (u.id === sessionUserId ? { ...u, ...patch } : u)));
      showToast('Tus datos de perfil fueron guardados.', 'fa-solid fa-check');
    },
    [sessionUserId, showToast]
  );

  const updateCustomerStamps = useCallback(
    (userId, nextCount) => {
      const clamped = Math.max(0, Math.min(LOYALTY_GOAL, nextCount));
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, loyaltyStamps: clamped } : u)));
      if (userId === sessionUserId) {
        setLoyaltyStamps(clamped);
      }
      showToast('Sellos de fidelidad actualizados.', 'fa-solid fa-award');
    },
    [sessionUserId, showToast]
  );

  const logoutUser = useCallback(() => {
    setSessionUserId('');
    showToast('Cerraste tu sesión correctamente.', 'fa-solid fa-right-from-bracket');
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
    products,
    orders,
    users,
    currentUser,
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
    awardOrderLoyaltyStamp,
    addProduct,
    updateProduct,
    toggleProductAvailability,
    deleteProduct,
    resetProductsToDefault,
    createOrderFromCheckout,
    updateOrderStatus,
    registerUser,
    loginUser,
    loginAsDemo,
    updateProfile,
    updateCustomerStamps,
    logoutUser
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
}
