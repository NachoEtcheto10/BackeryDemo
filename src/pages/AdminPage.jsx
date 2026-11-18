import { motion } from 'motion/react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminProductModal from '../components/admin/AdminProductModal.jsx';
import { EASE_OUT_EXPO } from '../components/MotionPrimitives.jsx';
import { useStore } from '../context/StoreContext.jsx';
import { CATEGORY_OPTIONS } from '../data/adminSeed.js';
import { CATEGORY_LABELS, DEFAULT_PRODUCT_IMG, LOYALTY_GOAL, formatCurrency } from '../data/catalog.js';

function AdminGate() {
  const { loginUser, loginAsDemo } = useStore();
  const [email, setEmail] = useState('admin@ambrosiabakery.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const res = loginUser({ email, password });
    if (!res.ok) {
      setError(res.error);
      return;
    }
    if (res.user.role !== 'admin') {
      setError('Esta cuenta es de cliente. Ingresá con una cuenta administradora o usá el acceso demo.');
    }
  };

  return (
    <section className="py-10 sm:py-16">
      <div className="container max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
          className="overflow-hidden rounded-3xl border border-[#4A2511]/12 bg-white shadow-[0_18px_45px_rgba(74,37,17,0.1)]"
        >
          <div className="bg-gradient-to-r from-[#2E160A] to-[#4A2511] p-6 text-center text-[#FFF8EC]">
            <div className="mx-auto mb-2.5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F9C77A]/20 text-lg text-[#F9C77A]">
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <h1 className="font-serif text-xl font-bold text-white">Panel Admin</h1>
            <p className="mt-1 text-xs text-[#FCEBCB]/80">Iniciá sesión como administrador</p>
          </div>

          <div className="space-y-4 p-6">
            {error && (
              <div className="rounded-xl border border-rose-300 bg-rose-50 px-3.5 py-2 text-xs font-medium text-rose-800">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-[#5E3219]">
                  Correo
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-[#4A2511]/20 bg-[#FFFDF9] px-3.5 py-2.5 text-sm text-[#3B1E0E] outline-none focus:border-[#B8761F]"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-[#5E3219]">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="ambrosia2026"
                  className="w-full rounded-xl border border-[#4A2511]/20 bg-[#FFFDF9] px-3.5 py-2.5 text-sm text-[#3B1E0E] outline-none focus:border-[#B8761F]"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-full justify-center py-2.5 text-sm">
                Ingresar
              </button>
            </form>

            <div className="border-t border-[#4A2511]/10 pt-3.5 text-center">
              <button
                type="button"
                onClick={() => loginAsDemo('admin')}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#B8761F]/40 bg-[#FFF8EC] px-4 py-2 text-xs font-bold text-[#4A2511] transition hover:bg-[#FCEBCB]"
              >
                <i className="fa-solid fa-wand-magic-sparkles text-[#B8761F]"></i>
                Acceso rápido Admin Demo
              </button>
              <Link to="/" className="mt-3 inline-block text-xs font-semibold text-[#76553C] hover:underline">
                Volver a la tienda
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function AdminPage() {
  const {
    currentUser,
    products,
    orders,
    users,
    addProduct,
    updateProduct,
    toggleProductAvailability,
    deleteProduct,
    updateCustomerStamps,
    logoutUser
  } = useStore();

  const [activeTab, setActiveTab] = useState('productos');
  const [productCatFilter, setProductCatFilter] = useState('all');
  const [productQuery, setProductQuery] = useState('');
  const [customerQuery, setCustomerQuery] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    const q = productQuery.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCat = productCatFilter === 'all' || p.category === productCatFilter;
      const matchesQuery = !q || p.name.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [productCatFilter, productQuery, products]);

  const customerList = useMemo(() => {
    const q = customerQuery.trim().toLowerCase();
    return users
      .filter((u) => u.role !== 'admin')
      .filter((u) => !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.phone.includes(q));
  }, [customerQuery, users]);

  if (!currentUser || currentUser.role !== 'admin') {
    return <AdminGate />;
  }

  const openCreateModal = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleSaveProduct = (data) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, data);
    } else {
      addProduct(data);
    }
  };

  return (
    <section className="py-6 sm:py-10">
      <div className="container max-w-4xl">
        {/* Cabecera simple */}
        <div className="mb-5 flex flex-col justify-between gap-4 rounded-3xl border border-[#4A2511]/12 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:p-6">
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#3B1E0E]">Panel Admin</h1>
            <p className="text-xs text-[#76553C] sm:text-sm">Administrá los productos de la carta y tus clientes.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={openCreateModal} className="btn btn-primary btn-sm">
              <i className="fa-solid fa-plus"></i> Añadir producto
            </button>
            <Link
              to="/carta"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#4A2511]/20 bg-[#FFF8EC] px-3.5 py-2 text-xs font-bold text-[#4A2511] transition hover:bg-[#FCEBCB]"
            >
              <i className="fa-solid fa-store"></i> Ver Carta
            </Link>
            <button
              type="button"
              onClick={logoutUser}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#4A2511]/15 px-3.5 py-2 text-xs font-semibold text-[#76553C] transition hover:bg-[#FFF8EC]"
            >
              <i className="fa-solid fa-right-from-bracket"></i> Salir
            </button>
          </div>
        </div>

        {/* Selector simple Productos / Clientes */}
        <div className="mb-5 flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('productos')}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition sm:text-sm ${
              activeTab === 'productos'
                ? 'bg-[#4A2511] text-[#FFF8EC] shadow-sm'
                : 'border border-[#4A2511]/15 bg-white text-[#5E3219] hover:bg-[#FFF8EC]'
            }`}
          >
            <i className="fa-solid fa-cookie-bite"></i> Productos ({products.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('clientes')}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition sm:text-sm ${
              activeTab === 'clientes'
                ? 'bg-[#4A2511] text-[#FFF8EC] shadow-sm'
                : 'border border-[#4A2511]/15 bg-white text-[#5E3219] hover:bg-[#FFF8EC]'
            }`}
          >
            <i className="fa-solid fa-users"></i> Clientes ({users.filter((u) => u.role !== 'admin').length})
          </button>
        </div>

        {/* LISTA DE PRODUCTOS */}
        {activeTab === 'productos' && (
          <div className="overflow-hidden rounded-3xl border border-[#4A2511]/12 bg-white shadow-sm">
            <div className="flex flex-col justify-between gap-3 border-b border-[#4A2511]/10 bg-[#FFFDF9] p-4 sm:flex-row sm:items-center">
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setProductCatFilter('all')}
                  className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                    productCatFilter === 'all'
                      ? 'bg-[#4A2511] text-white'
                      : 'bg-[#FFF8EC] text-[#5E3219] hover:bg-[#FCEBCB]'
                  }`}
                >
                  Todas
                </button>
                {CATEGORY_OPTIONS.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setProductCatFilter(cat.id)}
                    className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                      productCatFilter === cat.id
                        ? 'bg-[#4A2511] text-white'
                        : 'bg-[#FFF8EC] text-[#5E3219] hover:bg-[#FCEBCB]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-56">
                <i className="fa-solid fa-magnifying-glass pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[#A08467]"></i>
                <input
                  type="search"
                  value={productQuery}
                  onChange={(e) => setProductQuery(e.target.value)}
                  placeholder="Buscar producto..."
                  className="w-full rounded-full border border-[#4A2511]/20 bg-white py-1.5 pl-9 pr-3.5 text-xs text-[#3B1E0E] outline-none focus:border-[#B8761F]"
                />
              </div>
            </div>

            <ul className="divide-y divide-[#4A2511]/10">
              {filteredProducts.map((product) => {
                const isAvailable = product.available !== false;
                return (
                  <li
                    key={product.id}
                    className={`flex flex-wrap items-center justify-between gap-3 px-4 py-3 transition hover:bg-[#FFFDF8] sm:px-5 ${
                      !isAvailable ? 'bg-rose-50/35 opacity-75' : ''
                    }`}
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <img
                        src={product.image || DEFAULT_PRODUCT_IMG}
                        alt={product.name}
                        className="h-12 w-12 shrink-0 rounded-xl border border-[#4A2511]/10 object-cover"
                      />
                      <div className="min-w-0">
                        <div className="truncate font-serif text-sm font-bold text-[#3B1E0E] sm:text-base">
                          {product.name}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#76553C]">
                          <span>{CATEGORY_LABELS[product.category] || product.category}</span>
                          <span>·</span>
                          <strong className="text-[#4A2511]">{formatCurrency(product.basePrice)}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleProductAvailability(product.id)}
                        className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition ${
                          isAvailable
                            ? 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
                            : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                        }`}
                        title="Cambiar disponibilidad"
                      >
                        {isAvailable ? 'Disponible' : 'Sin stock'}
                      </button>

                      <button
                        type="button"
                        onClick={() => openEditModal(product)}
                        aria-label={`Editar ${product.name}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#4A2511]/15 bg-white text-xs text-[#4A2511] transition hover:bg-[#FFF8EC]"
                        title="Editar"
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteProduct(product.id)}
                        aria-label={`Borrar ${product.name}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-rose-200 bg-white text-xs text-rose-700 transition hover:bg-rose-50"
                        title="Borrar"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  </li>
                );
              })}

              {filteredProducts.length === 0 && (
                <li className="p-8 text-center text-sm text-[#76553C]">
                  No se encontraron productos con ese filtro.
                </li>
              )}
            </ul>
          </div>
        )}

        {/* CLIENTES */}
        {activeTab === 'clientes' && (
          <div className="overflow-hidden rounded-3xl border border-[#4A2511]/12 bg-white shadow-sm">
            <div className="flex flex-col justify-between gap-3 border-b border-[#4A2511]/10 bg-[#FFFDF9] p-4 sm:flex-row sm:items-center">
              <span className="text-xs font-semibold text-[#76553C]">
                Sellos de fidelidad y datos de contacto de tus clientes.
              </span>
              <div className="relative w-full sm:w-64">
                <i className="fa-solid fa-magnifying-glass pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[#A08467]"></i>
                <input
                  type="search"
                  value={customerQuery}
                  onChange={(e) => setCustomerQuery(e.target.value)}
                  placeholder="Buscar cliente..."
                  className="w-full rounded-full border border-[#4A2511]/20 bg-white py-1.5 pl-9 pr-3.5 text-xs text-[#3B1E0E] outline-none focus:border-[#B8761F]"
                />
              </div>
            </div>

            <ul className="divide-y divide-[#4A2511]/10">
              {customerList.map((customer) => {
                const stamps = Number(customer.loyaltyStamps) || 0;
                const userOrderCount = orders.filter(
                  (o) =>
                    (o.customerEmail && o.customerEmail.toLowerCase() === customer.email.toLowerCase()) ||
                    (customer.phone && o.customerPhone === customer.phone)
                ).length;
                return (
                  <li
                    key={customer.id}
                    className="flex flex-col justify-between gap-3 px-4 py-3.5 sm:flex-row sm:items-center sm:px-5"
                  >
                    <div className="min-w-0">
                      <div className="truncate font-serif text-base font-bold text-[#3B1E0E]">{customer.name}</div>
                      <div className="truncate text-xs text-[#76553C]">
                        {customer.email} · {customer.phone || 'Sin teléfono'} · {userOrderCount} pedido(s)
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2 self-start rounded-full border border-[#B8761F]/25 bg-[#FFF8EC] px-2.5 py-1 sm:self-auto">
                      <button
                        type="button"
                        onClick={() => updateCustomerStamps(customer.id, stamps - 1)}
                        disabled={stamps <= 0}
                        aria-label="Restar sello"
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-[#4A2511] shadow-sm disabled:opacity-40"
                      >
                        -
                      </button>
                      <span className="min-w-[54px] text-center text-xs font-bold text-[#3B1E0E]">
                        {stamps}/{LOYALTY_GOAL} sellos
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCustomerStamps(customer.id, stamps + 1)}
                        disabled={stamps >= LOYALTY_GOAL}
                        aria-label="Sumar sello"
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-[#4A2511] text-xs font-bold text-white shadow-sm disabled:opacity-40"
                      >
                        +
                      </button>
                    </div>
                  </li>
                );
              })}

              {customerList.length === 0 && (
                <li className="p-8 text-center text-sm text-[#76553C]">
                  No se encontraron clientes.
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      <AdminProductModal
        isOpen={modalOpen}
        initialProduct={editingProduct}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveProduct}
      />
    </section>
  );
}
