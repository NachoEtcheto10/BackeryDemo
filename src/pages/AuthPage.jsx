import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { EASE_OUT_EXPO } from '../components/MotionPrimitives.jsx';
import { useStore } from '../context/StoreContext.jsx';
import { ORDER_STATUS_META } from '../data/adminSeed.js';
import { LOYALTY_GOAL, formatCurrency, whatsappUrl } from '../data/catalog.js';

function getInitials(name = '') {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || '')
      .join('') || 'AB'
  );
}

function getPasswordStrength(pwd) {
  if (!pwd) return { label: '', percent: 0, barClass: 'bg-transparent' };
  let score = 0;
  if (pwd.length >= 6) score += 1;
  if (pwd.length >= 9) score += 1;
  if (/[A-Z]/.test(pwd) || /[0-9]/.test(pwd)) score += 1;
  if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
  if (score <= 1) return { label: 'Corta (mín. 6 caracteres)', percent: 30, barClass: 'bg-rose-500' };
  if (score === 2) return { label: 'Seguridad media', percent: 62, barClass: 'bg-amber-500' };
  return { label: 'Contraseña segura', percent: 100, barClass: 'bg-emerald-600' };
}

function AccountDashboard() {
  const { currentUser, orders, loyaltyStamps, updateProfile, logoutUser, showToast } = useStore();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('pedidos');
  const [profileName, setProfileName] = useState(currentUser?.name || '');
  const [profilePhone, setProfilePhone] = useState(currentUser?.phone || '');
  const [profileAddress, setProfileAddress] = useState(currentUser?.address || '');

  useEffect(() => {
    if (currentUser) {
      setProfileName(currentUser.name || '');
      setProfilePhone(currentUser.phone || '');
      setProfileAddress(currentUser.address || '');
    }
  }, [currentUser]);

  const userOrders = useMemo(() => {
    if (!currentUser) return [];
    const email = currentUser.email.toLowerCase();
    return orders.filter(
      (o) =>
        (o.customerEmail && o.customerEmail.toLowerCase() === email) ||
        (currentUser.phone && o.customerPhone === currentUser.phone)
    );
  }, [currentUser, orders]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!profileName.trim()) {
      showToast('Ingresá tu nombre completo.', 'fa-solid fa-triangle-exclamation');
      return;
    }
    updateProfile({
      name: profileName.trim(),
      phone: profilePhone.trim(),
      address: profileAddress.trim()
    });
  };

  const progressPct = Math.round((loyaltyStamps / LOYALTY_GOAL) * 100);

  return (
    <section className="py-8 sm:py-12">
      <div className="container max-w-5xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link to="/" className="carta-back-link">
            <i className="fa-solid fa-arrow-left"></i> Volver al inicio
          </Link>
          <div className="flex flex-wrap items-center gap-2.5">
            {currentUser.role === 'admin' && (
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 rounded-full bg-[#4A2511] px-4 py-2 text-xs font-bold text-[#F9C77A] shadow-sm transition hover:bg-[#2E160A]"
              >
                <i className="fa-solid fa-shield-halved"></i> Ir al Panel Admin
              </Link>
            )}
            <button
              type="button"
              onClick={logoutUser}
              className="inline-flex items-center gap-2 rounded-full border border-[#4A2511]/20 bg-white px-4 py-2 text-xs font-semibold text-[#4A2511] transition hover:bg-[#FCEBCB]"
            >
              <i className="fa-solid fa-right-from-bracket"></i> Cerrar sesión
            </button>
          </div>
        </div>

        {/* Tarjeta resumen de perfil */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
          className="overflow-hidden rounded-3xl border border-[#4A2511]/12 bg-white shadow-[0_14px_38px_rgba(74,37,17,0.08)]"
        >
          <div className="bg-gradient-to-r from-[#2E160A] via-[#4A2511] to-[#633318] p-6 text-[#FFF8EC] sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#F9C77A]/40 bg-[#B8761F]/30 font-serif text-xl font-bold text-[#F9C77A]">
                  {getInitials(currentUser.name)}
                </div>
                <div>
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F9C77A]/20 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#F9C77A]">
                      <i className={currentUser.role === 'admin' ? 'fa-solid fa-crown' : 'fa-solid fa-award'}></i>
                      {currentUser.role === 'admin' ? 'Administración Ambrosía' : 'Socio Club Ambrosía'}
                    </span>
                  </div>
                  <h1 className="font-serif text-2xl font-bold text-white sm:text-3xl">{currentUser.name}</h1>
                  <p className="text-xs text-[#FCEBCB]/85 sm:text-sm">{currentUser.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center">
                <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2.5 text-center backdrop-blur-sm">
                  <div className="text-lg font-bold text-[#F9C77A]">{userOrders.length}</div>
                  <div className="text-[11px] text-[#FCEBCB]/80">Pedidos</div>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2.5 text-center backdrop-blur-sm">
                  <div className="text-lg font-bold text-[#F9C77A]">
                    {loyaltyStamps}/{LOYALTY_GOAL}
                  </div>
                  <div className="text-[11px] text-[#FCEBCB]/80">Sellos Club</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs de Cuenta */}
          <div className="flex gap-2 overflow-x-auto border-b border-[#4A2511]/10 bg-[#FFFDF8] px-4 py-3 sm:px-8">
            {[
              { id: 'pedidos', label: 'Mis Pedidos', icon: 'fa-solid fa-bag-shopping' },
              { id: 'datos', label: 'Mis Datos', icon: 'fa-regular fa-id-card' },
              { id: 'club', label: 'Club Ambrosía', icon: 'fa-solid fa-award' }
            ].map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition sm:text-sm ${
                    active
                      ? 'bg-[#4A2511] text-[#FFF8EC] shadow-sm'
                      : 'bg-[#FCEBCB]/55 text-[#5E3219] hover:bg-[#FCEBCB]'
                  }`}
                >
                  <i className={tab.icon}></i> {tab.label}
                </button>
              );
            })}
          </div>

          <div className="p-5 sm:p-8">
            {activeTab === 'pedidos' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-[#3B1E0E]">Historial de pedidos</h2>
                    <p className="text-xs text-[#76553C] sm:text-sm">
                      Seguí el estado de tus compras recientes en Ambrosía Bakery.
                    </p>
                  </div>
                  <Link to="/carta" className="btn btn-primary btn-sm">
                    <i className="fa-solid fa-cookie-bite"></i> Hacer nuevo pedido
                  </Link>
                </div>

                {userOrders.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-[#4A2511]/20 bg-[#FFF8EC]/60 p-8 text-center">
                    <i className="fa-solid fa-basket-shopping mb-3 text-3xl text-[#B8761F]"></i>
                    <h3 className="font-serif text-lg font-bold text-[#3B1E0E]">Todavía no tenés pedidos registrados</h3>
                    <p className="mx-auto mt-1 max-w-md text-sm text-[#76553C]">
                      Armá tu canasta en nuestra carta y al confirmar tu pedido aparecerá aquí automáticamente.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {userOrders.map((order) => {
                      const statusMeta = ORDER_STATUS_META[order.status] || ORDER_STATUS_META.pendiente;
                      return (
                        <div
                          key={order.id}
                          className="rounded-2xl border border-[#4A2511]/12 bg-[#FFFDF9] p-4 transition hover:border-[#B8761F]/40 sm:p-5"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#4A2511]/8 pb-3">
                            <div className="flex flex-wrap items-center gap-2.5">
                              <span className="font-serif text-base font-bold text-[#3B1E0E]">#{order.id}</span>
                              <span className="text-xs text-[#76553C]">
                                <i className="fa-regular fa-calendar mr-1"></i>
                                {order.deliveryDate} · {order.deliveryTime}
                              </span>
                            </div>
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${statusMeta.badgeClass}`}
                            >
                              <i className={statusMeta.icon}></i> {statusMeta.label}
                            </span>
                          </div>

                          <div className="mt-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                            <ul className="space-y-1 text-sm text-[#4A2511]">
                              {order.items.map((item, idx) => (
                                <li key={`${order.id}-${idx}`}>
                                  <strong>{item.quantity}x</strong> {item.name}{' '}
                                  <span className="text-xs text-[#76553C]">({item.variantName})</span>
                                </li>
                              ))}
                              <li className="pt-1 text-xs text-[#76553C]">
                                <i className="fa-solid fa-location-dot mr-1 text-[#B8761F]"></i>
                                {order.address} · {order.paymentMethod}
                              </li>
                            </ul>

                            <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                              <span className="text-lg font-bold text-[#4A2511]">{formatCurrency(order.total)}</span>
                              <a
                                href={whatsappUrl(`Hola! Quería consultar por mi pedido #${order.id} 🍪`)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B8A44] hover:underline"
                              >
                                <i className="fa-brands fa-whatsapp"></i> Consultar estado
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'datos' && (
              <form onSubmit={handleSaveProfile} className="max-w-xl space-y-4">
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#3B1E0E]">Tus datos de entrega</h2>
                  <p className="text-xs text-[#76553C] sm:text-sm">
                    Se completan automáticamente cuando finalizás una compra en la web.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#5E3219]">
                      Nombre y Apellido
                    </label>
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full rounded-xl border border-[#4A2511]/20 bg-[#FFFDF9] px-3.5 py-2.5 text-sm text-[#3B1E0E] outline-none focus:border-[#B8761F]"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#5E3219]">
                      WhatsApp / Teléfono
                    </label>
                    <input
                      type="tel"
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                      placeholder="3442 123456"
                      className="w-full rounded-xl border border-[#4A2511]/20 bg-[#FFFDF9] px-3.5 py-2.5 text-sm text-[#3B1E0E] outline-none focus:border-[#B8761F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#5E3219]">
                    Dirección en Concepción del Uruguay
                  </label>
                  <input
                    type="text"
                    value={profileAddress}
                    onChange={(e) => setProfileAddress(e.target.value)}
                    placeholder="Calle, altura y referencia"
                    className="w-full rounded-xl border border-[#4A2511]/20 bg-[#FFFDF9] px-3.5 py-2.5 text-sm text-[#3B1E0E] outline-none focus:border-[#B8761F]"
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  <i className="fa-solid fa-floppy-disk"></i> Guardar cambios
                </button>
              </form>
            )}

            {activeTab === 'club' && (
              <div className="rounded-2xl border border-[#B8761F]/25 bg-gradient-to-br from-[#FFF8EC] to-[#FCEBCB]/55 p-6">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#B8761F]">
                      <i className="fa-solid fa-award"></i> Tarjeta de Fidelidad
                    </span>
                    <h2 className="mt-1 font-serif text-2xl font-bold text-[#3B1E0E]">
                      Llevás {loyaltyStamps} de {LOYALTY_GOAL} sellos
                    </h2>
                    <p className="mt-1 text-sm text-[#76553C]">
                      {loyaltyStamps >= LOYALTY_GOAL
                        ? '¡Completaste tu tarjeta! Ya podés canjear tu Box x4 Cookies Clásicas o 15% OFF en torta.'
                        : `Te faltan ${LOYALTY_GOAL - loyaltyStamps} sellos para tu premio Ambrosía.`}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/club')}
                    className="btn btn-primary shrink-0"
                  >
                    <i className="fa-solid fa-stamp"></i> Ver mi Tarjeta Club
                  </button>
                </div>

                <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-white/90 p-0.5 shadow-inner">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#B8761F] to-[#4A2511] transition-all duration-500"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function AuthPage({ defaultTab = 'login' }) {
  const { currentUser, loginUser, registerUser, loginAsDemo, showToast } = useStore();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialTab = searchParams.get('modo') === 'registro' ? 'register' : defaultTab;
  const [tab, setTab] = useState(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [forgotHint, setForgotHint] = useState(false);

  // Estado Iniciar Sesión
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Estado Crear Cuenta
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');
  const [regNewsletter, setRegNewsletter] = useState(true);

  useEffect(() => {
    setTab(defaultTab);
    setErrorMsg('');
  }, [defaultTab]);

  if (currentUser) {
    return <AccountDashboard />;
  }

  const strength = getPasswordStrength(regPassword);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!loginEmail.trim() || !loginPassword) {
      setErrorMsg('Completá tu correo electrónico y contraseña.');
      return;
    }
    const res = loginUser({ email: loginEmail, password: loginPassword });
    if (!res.ok) {
      setErrorMsg(res.error);
      return;
    }
    if (res.user.role === 'admin') {
      navigate('/admin');
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!regName.trim() || !regEmail.trim() || !regPhone.trim()) {
      setErrorMsg('Completá tu nombre, teléfono y correo electrónico.');
      return;
    }
    if (regPassword.length < 6) {
      setErrorMsg('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (regPassword !== regConfirm) {
      setErrorMsg('Las contraseñas no coinciden.');
      return;
    }
    const res = registerUser({
      name: regName,
      phone: regPhone,
      email: regEmail,
      address: regAddress,
      password: regPassword
    });
    if (!res.ok) {
      setErrorMsg(res.error);
      return;
    }
  };

  const handleDemo = (role) => {
    const user = loginAsDemo(role);
    if (user?.role === 'admin') {
      navigate('/admin');
    }
  };

  return (
    <section className="py-8 sm:py-12">
      <div className="container max-w-5xl">
        <div className="mb-5 flex items-center justify-between">
          <Link to="/" className="carta-back-link">
            <i className="fa-solid fa-arrow-left"></i> Volver al inicio
          </Link>
          <span className="text-xs font-semibold text-[#76553C]">
            <i className="fa-solid fa-shield-heart mr-1 text-[#B8761F]"></i> Club Ambrosía & Pedidos
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          className="grid overflow-hidden rounded-3xl border border-[#4A2511]/12 bg-white shadow-[0_20px_50px_rgba(74,37,17,0.1)] lg:grid-cols-12"
        >
          {/* Columna Editorial Ambrosía */}
          <div className="relative flex flex-col justify-between bg-gradient-to-br from-[#2E160A] via-[#4A2511] to-[#633318] p-6 text-[#FFF8EC] sm:p-8 lg:col-span-5">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#F9C77A]/30 bg-[#F9C77A]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#F9C77A]">
                <i className="fa-solid fa-cookie-bite"></i> Cuenta Ambrosía
              </div>
              <h1 className="mt-4 font-serif text-2xl font-bold leading-tight text-white sm:text-3xl">
                Tu mesa dulce, ahora más cerca.
              </h1>
              <p className="mt-2.5 text-sm leading-relaxed text-[#FCEBCB]/85">
                Creá tu cuenta o iniciá sesión para guardar tus direcciones en Concepción del Uruguay, seguir tus pedidos y acumular sellos en el Club Ambrosía.
              </p>

              <ul className="mt-6 space-y-3 text-xs text-[#FCEBCB]/90 sm:text-sm">
                <li className="flex items-start gap-2.5">
                  <i className="fa-solid fa-circle-check mt-0.5 text-[#F9C77A]"></i>
                  <span>Seguimiento de pedidos desde el horno hasta tu entrega.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <i className="fa-solid fa-circle-check mt-0.5 text-[#F9C77A]"></i>
                  <span>Checkout precargado con tu nombre, WhatsApp y dirección.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <i className="fa-solid fa-circle-check mt-0.5 text-[#F9C77A]"></i>
                  <span>1 sello de regalo automático al crear tu cuenta hoy.</span>
                </li>
              </ul>
            </div>

            {/* Accesos Demo */}
            <div className="mt-8 rounded-2xl border border-white/15 bg-black/20 p-4 backdrop-blur-sm">
              <p className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-[#F9C77A]">
                <i className="fa-solid fa-wand-magic-sparkles mr-1"></i> Accesos Demo (Vista previa)
              </p>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                <button
                  type="button"
                  onClick={() => handleDemo('customer')}
                  className="flex items-center justify-between rounded-xl border border-white/15 bg-white/10 px-3.5 py-2.5 text-left text-xs transition hover:bg-white/20"
                >
                  <div>
                    <div className="font-bold text-white">Entrar como Cliente</div>
                    <div className="text-[11px] text-[#FCEBCB]/75">valentina@ejemplo.com · cookies123</div>
                  </div>
                  <i className="fa-solid fa-arrow-right text-[#F9C77A]"></i>
                </button>
                <button
                  type="button"
                  onClick={() => handleDemo('admin')}
                  className="flex items-center justify-between rounded-xl border border-[#F9C77A]/35 bg-[#B8761F]/30 px-3.5 py-2.5 text-left text-xs transition hover:bg-[#B8761F]/45"
                >
                  <div>
                    <div className="font-bold text-[#F9C77A]">Entrar al Panel Admin</div>
                    <div className="text-[11px] text-[#FCEBCB]/80">admin@ambrosiabakery.com · ambrosia2026</div>
                  </div>
                  <i className="fa-solid fa-shield-halved text-[#F9C77A]"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Columna Formularios */}
          <div className="p-6 sm:p-8 lg:col-span-7">
            {/* Switcher Iniciar sesión / Crear cuenta */}
            <div className="mb-6 grid grid-cols-2 rounded-2xl bg-[#FFF8EC] p-1.5 ring-1 ring-[#4A2511]/10">
              <button
                type="button"
                onClick={() => {
                  setTab('login');
                  setErrorMsg('');
                }}
                className={`rounded-xl py-2.5 text-xs font-bold transition sm:text-sm ${
                  tab === 'login'
                    ? 'bg-[#4A2511] text-[#FFF8EC] shadow-sm'
                    : 'text-[#76553C] hover:text-[#3B1E0E]'
                }`}
              >
                <i className="fa-solid fa-right-to-bracket mr-1.5"></i> Iniciar sesión
              </button>
              <button
                type="button"
                onClick={() => {
                  setTab('register');
                  setErrorMsg('');
                }}
                className={`rounded-xl py-2.5 text-xs font-bold transition sm:text-sm ${
                  tab === 'register'
                    ? 'bg-[#4A2511] text-[#FFF8EC] shadow-sm'
                    : 'text-[#76553C] hover:text-[#3B1E0E]'
                }`}
              >
                <i className="fa-solid fa-user-plus mr-1.5"></i> Crear tu cuenta
              </button>
            </div>

            {errorMsg && (
              <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-rose-300 bg-rose-50 px-3.5 py-2.5 text-xs font-medium text-rose-800 sm:text-sm">
                <i className="fa-solid fa-circle-exclamation mt-0.5"></i>
                <span>{errorMsg}</span>
              </div>
            )}

            <AnimatePresence mode="wait">
              {tab === 'login' ? (
                <motion.form
                  key="login-form"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleLoginSubmit}
                  className="space-y-4"
                >
                  <div>
                    <h2 className="font-serif text-xl font-bold text-[#3B1E0E]">¡Qué bueno verte de nuevo!</h2>
                    <p className="text-xs text-[#76553C] sm:text-sm">
                      Ingresá con tu correo y contraseña para acceder a tu cuenta.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="loginEmail" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#5E3219]">
                      Correo electrónico *
                    </label>
                    <div className="relative">
                      <i className="fa-regular fa-envelope pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#A08467]"></i>
                      <input
                        id="loginEmail"
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="tu@correo.com"
                        className="w-full rounded-xl border border-[#4A2511]/20 bg-[#FFFDF9] py-2.5 pl-10 pr-4 text-sm text-[#3B1E0E] outline-none transition focus:border-[#B8761F] focus:ring-2 focus:ring-[#B8761F]/15"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="loginPass" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#5E3219]">
                      Contraseña *
                    </label>
                    <div className="relative">
                      <i className="fa-solid fa-lock pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#A08467]"></i>
                      <input
                        id="loginPass"
                        type={showPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-xl border border-[#4A2511]/20 bg-[#FFFDF9] py-2.5 pl-10 pr-11 text-sm text-[#3B1E0E] outline-none transition focus:border-[#B8761F] focus:ring-2 focus:ring-[#B8761F]/15"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((p) => !p)}
                        aria-label="Mostrar u ocultar contraseña"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#76553C] hover:text-[#3B1E0E]"
                      >
                        <i className={showPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'}></i>
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <label className="flex cursor-pointer items-center gap-2 font-medium text-[#5E3219]">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="accent-[#4A2511]"
                      />
                      Mantener sesión iniciada
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setForgotHint((p) => !p);
                        showToast('Podés usar los accesos demo de la izquierda para probar.', 'fa-solid fa-circle-info');
                      }}
                      className="font-semibold text-[#B8761F] hover:underline"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>

                  {forgotHint && (
                    <div className="rounded-xl border border-[#B8761F]/30 bg-[#FFF8EC] p-3 text-xs text-[#5E3219]">
                      En esta demo podés ingresar instantáneamente con los botones de <strong>Acceso Demo</strong> o crear una cuenta nueva en segundos.
                    </div>
                  )}

                  <button type="submit" className="btn btn-primary w-full justify-center py-3 text-sm">
                    <i className="fa-solid fa-right-to-bracket"></i> Ingresar a mi cuenta
                  </button>

                  <p className="pt-1 text-center text-xs text-[#76553C]">
                    ¿Primera vez en Ambrosía?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setTab('register');
                        setErrorMsg('');
                      }}
                      className="font-bold text-[#4A2511] underline"
                    >
                      Crear tu cuenta gratis
                    </button>
                  </p>
                </motion.form>
              ) : (
                <motion.form
                  key="register-form"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleRegisterSubmit}
                  className="space-y-3.5"
                >
                  <div>
                    <h2 className="font-serif text-xl font-bold text-[#3B1E0E]">Creá tu cuenta Ambrosía</h2>
                    <p className="text-xs text-[#76553C] sm:text-sm">
                      Te regalamos tu primer sello del Club apenas te registrás.
                    </p>
                  </div>

                  <div className="grid gap-3.5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="regName" className="mb-1 block text-xs font-bold uppercase tracking-wide text-[#5E3219]">
                        Nombre y Apellido *
                      </label>
                      <input
                        id="regName"
                        type="text"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="Ej: Sofía Martínez"
                        className="w-full rounded-xl border border-[#4A2511]/20 bg-[#FFFDF9] px-3.5 py-2.5 text-sm text-[#3B1E0E] outline-none focus:border-[#B8761F]"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="regPhone" className="mb-1 block text-xs font-bold uppercase tracking-wide text-[#5E3219]">
                        WhatsApp *
                      </label>
                      <input
                        id="regPhone"
                        type="tel"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="Ej: 3442 601122"
                        className="w-full rounded-xl border border-[#4A2511]/20 bg-[#FFFDF9] px-3.5 py-2.5 text-sm text-[#3B1E0E] outline-none focus:border-[#B8761F]"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-3.5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="regEmail" className="mb-1 block text-xs font-bold uppercase tracking-wide text-[#5E3219]">
                        Correo electrónico *
                      </label>
                      <input
                        id="regEmail"
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="sofia@correo.com"
                        className="w-full rounded-xl border border-[#4A2511]/20 bg-[#FFFDF9] px-3.5 py-2.5 text-sm text-[#3B1E0E] outline-none focus:border-[#B8761F]"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="regAddress" className="mb-1 block text-xs font-bold uppercase tracking-wide text-[#5E3219]">
                        Dirección (opcional)
                      </label>
                      <input
                        id="regAddress"
                        type="text"
                        value={regAddress}
                        onChange={(e) => setRegAddress(e.target.value)}
                        placeholder="Bv. Balbín 1234"
                        className="w-full rounded-xl border border-[#4A2511]/20 bg-[#FFFDF9] px-3.5 py-2.5 text-sm text-[#3B1E0E] outline-none focus:border-[#B8761F]"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3.5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="regPass" className="mb-1 block text-xs font-bold uppercase tracking-wide text-[#5E3219]">
                        Contraseña *
                      </label>
                      <input
                        id="regPass"
                        type={showPassword ? 'text' : 'password'}
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="Mínimo 6 caracteres"
                        className="w-full rounded-xl border border-[#4A2511]/20 bg-[#FFFDF9] px-3.5 py-2.5 text-sm text-[#3B1E0E] outline-none focus:border-[#B8761F]"
                        required
                      />
                      {regPassword && (
                        <div className="mt-1.5">
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#FCEBCB]">
                            <div
                              className={`h-full transition-all duration-300 ${strength.barClass}`}
                              style={{ width: `${strength.percent}%` }}
                            />
                          </div>
                          <span className="mt-0.5 block text-[11px] font-medium text-[#76553C]">{strength.label}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <label htmlFor="regConfirm" className="mb-1 block text-xs font-bold uppercase tracking-wide text-[#5E3219]">
                        Confirmar contraseña *
                      </label>
                      <input
                        id="regConfirm"
                        type={showPassword ? 'text' : 'password'}
                        value={regConfirm}
                        onChange={(e) => setRegConfirm(e.target.value)}
                        placeholder="Repetí tu contraseña"
                        className="w-full rounded-xl border border-[#4A2511]/20 bg-[#FFFDF9] px-3.5 py-2.5 text-sm text-[#3B1E0E] outline-none focus:border-[#B8761F]"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <label className="flex cursor-pointer items-center gap-2 text-[#5E3219]">
                      <input
                        type="checkbox"
                        checked={regNewsletter}
                        onChange={(e) => setRegNewsletter(e.target.checked)}
                        className="accent-[#4A2511]"
                      />
                      Quiero recibir novedades de horneadas y promos del Club
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="font-semibold text-[#76553C] hover:text-[#3B1E0E]"
                    >
                      {showPassword ? 'Ocultar claves' : 'Ver claves'}
                    </button>
                  </div>

                  <button type="submit" className="btn btn-primary w-full justify-center py-3 text-sm">
                    <i className="fa-solid fa-user-plus"></i> Crear mi cuenta
                  </button>

                  <p className="pt-1 text-center text-xs text-[#76553C]">
                    ¿Ya tenés cuenta?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setTab('login');
                        setErrorMsg('');
                      }}
                      className="font-bold text-[#4A2511] underline"
                    >
                      Iniciá sesión acá
                    </button>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
