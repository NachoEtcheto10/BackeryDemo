import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { CATEGORY_OPTIONS, PRODUCT_IMAGE_PRESETS } from '../../data/adminSeed.js';
import { DEFAULT_PRODUCT_IMG } from '../../data/catalog.js';

export default function AdminProductModal({ isOpen, initialProduct, onClose, onSave }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('cookies');
  const [basePrice, setBasePrice] = useState('3000');
  const [servings, setServings] = useState('Unidad XL');
  const [badge, setBadge] = useState('');
  const [image, setImage] = useState(PRODUCT_IMAGE_PRESETS[0].url);
  const [description, setDescription] = useState('');
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    if (initialProduct) {
      setName(initialProduct.name || '');
      setCategory(initialProduct.category || 'cookies');
      setBasePrice(String(initialProduct.basePrice ?? 3000));
      setServings(initialProduct.servings || 'Unidad XL');
      setBadge(initialProduct.badge || '');
      setImage(initialProduct.image || PRODUCT_IMAGE_PRESETS[0].url);
      setDescription(initialProduct.description || '');
      setAvailable(initialProduct.available !== false);
    } else {
      setName('');
      setCategory('cookies');
      setBasePrice('3200');
      setServings('Unidad XL · 120 g');
      setBadge('Nueva');
      setImage(PRODUCT_IMAGE_PRESETS[0].url);
      setDescription('');
      setAvailable(true);
    }
  }, [initialProduct, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const numericPrice = Math.max(0, Number(basePrice) || 0);
    const updatedVariants = initialProduct?.variants?.length
      ? initialProduct.variants.map((v, idx) => (idx === 0 ? { ...v, price: numericPrice } : v))
      : [{ name: servings.trim() || 'Unidad', price: numericPrice }];

    onSave({
      name: name.trim(),
      category,
      basePrice: numericPrice,
      servings: servings.trim() || 'Unidad',
      badge: badge.trim() || null,
      badgeType: badge.trim() ? initialProduct?.badgeType || 'gold' : 'gold',
      image: image.trim() || DEFAULT_PRODUCT_IMG,
      description:
        description.trim() ||
        'Elaboración artesanal horneada en el día con ingredientes seleccionados.',
      allergens: initialProduct?.allergens || 'Contiene: Harina de trigo, manteca, huevos y lácteos.',
      available,
      variants: updatedVariants
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[1200] flex items-center justify-center bg-[#2E160A]/60 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-[#4A2511]/15 bg-white p-5 shadow-2xl sm:p-7"
      >
        <div className="mb-5 flex items-center justify-between border-b border-[#4A2511]/10 pb-3.5">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#B8761F]">
              Catálogo Ambrosía
            </span>
            <h3 className="font-serif text-xl font-bold text-[#3B1E0E]">
              {initialProduct ? 'Editar producto' : 'Agregar nuevo producto'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF8EC] text-[#4A2511] transition hover:bg-[#FCEBCB]"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-3.5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-[#5E3219]">
                Nombre del producto *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Cookie Pistacho & Chocolate Blanco"
                className="w-full rounded-xl border border-[#4A2511]/20 bg-[#FFFDF9] px-3.5 py-2.5 text-sm text-[#3B1E0E] outline-none focus:border-[#B8761F]"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-[#5E3219]">
                Categoría *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-[#4A2511]/20 bg-[#FFFDF9] px-3.5 py-2.5 text-sm text-[#3B1E0E] outline-none focus:border-[#B8761F]"
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-[#5E3219]">
                Precio base (ARS) *
              </label>
              <input
                type="number"
                min="0"
                step="100"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
                className="w-full rounded-xl border border-[#4A2511]/20 bg-[#FFFDF9] px-3.5 py-2.5 text-sm text-[#3B1E0E] outline-none focus:border-[#B8761F]"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-[#5E3219]">
                Presentación / Porciones
              </label>
              <input
                type="text"
                value={servings}
                onChange={(e) => setServings(e.target.value)}
                placeholder="Ej: Unidad XL · 120 g"
                className="w-full rounded-xl border border-[#4A2511]/20 bg-[#FFFDF9] px-3.5 py-2.5 text-sm text-[#3B1E0E] outline-none focus:border-[#B8761F]"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-[#5E3219]">
                Etiqueta destacada (opcional)
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="La Favorita / Nueva / Derrite"
                className="w-full rounded-xl border border-[#4A2511]/20 bg-[#FFFDF9] px-3.5 py-2.5 text-sm text-[#3B1E0E] outline-none focus:border-[#B8761F]"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-[#5E3219]">
              Foto del producto (preset o URL)
            </label>
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <img
                src={image || DEFAULT_PRODUCT_IMG}
                alt="Vista previa"
                className="h-14 w-14 shrink-0 rounded-xl border border-[#4A2511]/15 object-cover"
              />
              <div className="grid flex-1 gap-2 sm:grid-cols-2">
                <select
                  value={PRODUCT_IMAGE_PRESETS.some((p) => p.url === image) ? image : 'custom'}
                  onChange={(e) => {
                    if (e.target.value !== 'custom') setImage(e.target.value);
                  }}
                  className="w-full rounded-xl border border-[#4A2511]/20 bg-[#FFFDF9] px-3 py-2 text-xs text-[#3B1E0E] outline-none focus:border-[#B8761F]"
                >
                  {PRODUCT_IMAGE_PRESETS.map((preset) => (
                    <option key={preset.url} value={preset.url}>
                      {preset.label}
                    </option>
                  ))}
                  <option value="custom">URL personalizada...</option>
                </select>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="/assets/images/..."
                  className="w-full rounded-xl border border-[#4A2511]/20 bg-[#FFFDF9] px-3 py-2 text-xs text-[#3B1E0E] outline-none focus:border-[#B8761F]"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-[#5E3219]">
              Descripción
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Contá los ingredientes y por qué es irresistible..."
              className="w-full rounded-xl border border-[#4A2511]/20 bg-[#FFFDF9] px-3.5 py-2.5 text-sm text-[#3B1E0E] outline-none focus:border-[#B8761F]"
            />
          </div>

          <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-[#4A2511]/12 bg-[#FFF8EC]/70 px-4 py-3">
            <div>
              <span className="block text-sm font-bold text-[#3B1E0E]">Disponible en la Carta</span>
              <span className="text-xs text-[#76553C]">
                Si lo desactivás, los clientes verán el producto como Sin Stock.
              </span>
            </div>
            <input
              type="checkbox"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
              className="h-5 w-5 accent-[#4A2511]"
            />
          </label>

          <div className="flex flex-wrap justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-[#4A2511]/20 bg-white px-5 py-2.5 text-xs font-bold text-[#4A2511] transition hover:bg-[#FFF8EC]"
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary btn-sm px-6">
              <i className="fa-solid fa-check"></i> {initialProduct ? 'Guardar cambios' : 'Crear producto'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
