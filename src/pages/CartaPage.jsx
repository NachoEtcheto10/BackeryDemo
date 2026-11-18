import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { EASE_OUT_EXPO, Reveal } from '../components/MotionPrimitives.jsx';
import { useStore } from '../context/StoreContext.jsx';
import {
  BUSINESS_CONFIG,
  CATEGORY_FILTERS,
  CATEGORY_LABELS,
  DEFAULT_PRODUCT_IMG,
  PRODUCTS_DATA,
  formatCurrency,
  normalizeText
} from '../data/catalog.js';

export default function CartaPage() {
  const { addToCart, setQuickViewProduct } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCat = searchParams.get('cat');
  const validInitialCat = initialCat && (initialCat === 'all' || CATEGORY_LABELS[initialCat]) ? initialCat : 'all';

  const [filter, setFilter] = useState(validInitialCat);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('featured');

  useEffect(() => {
    const paramCat = searchParams.get('cat');
    if (paramCat && (paramCat === 'all' || CATEGORY_LABELS[paramCat])) {
      setFilter(paramCat);
    }
  }, [searchParams]);

  const handleSelectCategory = (catId) => {
    setFilter(catId);
    if (catId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ cat: catId });
    }
  };

  const countsByCategory = useMemo(() => {
    const counts = { all: PRODUCTS_DATA.length };
    CATEGORY_FILTERS.forEach((cat) => {
      if (cat.id !== 'all') {
        counts[cat.id] = PRODUCTS_DATA.filter((p) => p.category === cat.id).length;
      }
    });
    return counts;
  }, []);

  const filteredProducts = useMemo(() => {
    const query = normalizeText(search);
    const list = PRODUCTS_DATA.filter((product) => {
      const matchesCat = filter === 'all' || product.category === filter;
      const matchesQuery =
        !query ||
        normalizeText(product.name).includes(query) ||
        normalizeText(product.description).includes(query) ||
        normalizeText(CATEGORY_LABELS[product.category]).includes(query);
      return matchesCat && matchesQuery;
    });

    if (sort === 'price-asc') {
      return [...list].sort((a, b) => a.basePrice - b.basePrice);
    }
    if (sort === 'price-desc') {
      return [...list].sort((a, b) => b.basePrice - a.basePrice);
    }
    if (sort === 'name-asc') {
      return [...list].sort((a, b) => a.name.localeCompare(b.name, 'es'));
    }
    return list;
  }, [filter, search, sort]);

  return (
    <>
      <section className="carta-page-hero">
        <div className="container carta-page-hero-inner">
          <Link to="/" className="carta-back-link">
            <i className="fa-solid fa-arrow-left"></i> Volver al inicio
          </Link>
          <div className="carta-page-actions">
            <Link to="/#cotizador" className="btn btn-secondary btn-sm">
              <i className="fa-solid fa-gift"></i> ¿Preferís armar tu box?
            </Link>
          </div>
        </div>
      </section>

      <section className="catalog-section carta-full-catalog" id="catalogo">
        <div className="container">
          <Reveal className="section-header text-center">
            <span className="section-subtitle">Recién salido del horno</span>
            <h1 className="section-title">Nuestra Carta</h1>
            <p className="section-description">
              Elegí tus favoritos entre cookies, tortas clásicas, chipá, scones y boxes de regalo. Sumalos a la canasta y completá tu pedido por WhatsApp.
            </p>
          </Reveal>

          <div className="catalog-toolbar">
            <div className="categories-scroll-wrapper">
              {CATEGORY_FILTERS.map((cat) => {
                const isActive = filter === cat.id;
                return (
                  <motion.button
                    key={cat.id}
                    type="button"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`category-pill-card relative ${isActive ? 'active' : ''}`}
                    onClick={() => handleSelectCategory(cat.id)}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeCategoryIndicator"
                        transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                        className="pointer-events-none absolute inset-0 rounded-[inherit] border-2 border-[#B8761F]/50"
                      />
                    )}
                    <i className={`${cat.icon} category-pill-icon`}></i>
                    <span className="category-pill-name">{cat.name}</span>
                    <span className="category-pill-count">{countsByCategory[cat.id] ?? 0}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="catalog-controls">
            <div className="search-box">
              <i className="fa-solid fa-magnifying-glass search-icon"></i>
              <input
                type="text"
                placeholder="Buscar por nombre o sabor (ej. lemon pie, rogel, nutella, chipá)..."
                aria-label="Buscar producto"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  type="button"
                  className="clear-search-btn"
                  title="Limpiar búsqueda"
                  onClick={() => setSearch('')}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>

            <div className="catalog-meta">
              <span className="catalog-result-count" aria-live="polite">
                {filteredProducts.length > 0
                  ? `${filteredProducts.length} ${filteredProducts.length === 1 ? 'delicia' : 'delicias'}`
                  : ''}
              </span>
              <div className="sort-box">
                <label htmlFor="catalogSortSelect">
                  <i className="fa-solid fa-arrow-down-short-wide"></i> Ordenar:
                </label>
                <select
                  id="catalogSortSelect"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="featured">Destacados</option>
                  <option value="price-asc">Menor precio</option>
                  <option value="price-desc">Mayor precio</option>
                  <option value="name-asc">Nombre (A - Z)</option>
                </select>
              </div>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="no-results-state"
            >
              <div className="no-results-icon">
                <i className="fa-solid fa-cookie-bite"></i>
              </div>
              <h3>No encontramos nada con esa búsqueda</h3>
              <p>Probá con otros sabores como chocolate, dulce de leche, lemon pie o chipá.</p>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setSearch('');
                  handleSelectCategory('all');
                }}
              >
                Ver toda la carta
              </button>
            </motion.div>
          ) : (
            <motion.div layout className="products-grid">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, index) => {
                  const isAvailable = product.available !== false;
                  const hasVariants = product.variants && product.variants.length > 1;
                  return (
                    <motion.article
                      layout
                      key={product.id}
                      initial={{ opacity: 0, y: 16, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.35, delay: Math.min(index, 6) * 0.04, ease: EASE_OUT_EXPO }}
                      whileHover={{ y: -5 }}
                      className={`product-card ${isAvailable ? '' : 'is-out-of-stock'}`}
                    >
                      <div
                        className="product-card-thumb-wrapper"
                        onClick={() => setQuickViewProduct(product)}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="product-card-img"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            e.currentTarget.src = DEFAULT_PRODUCT_IMG;
                          }}
                        />
                        {!isAvailable ? (
                          <span className="product-badge out-of-stock">
                            <i className="fa-solid fa-ban"></i> Sin Stock
                          </span>
                        ) : (
                          product.badge && (
                            <span
                              className={`product-badge ${
                                product.badgeType === 'chef' ? 'chef' : 'gold'
                              }`}
                            >
                              {product.badge}
                            </span>
                          )
                        )}
                        <button
                          type="button"
                          className="product-quick-view-btn"
                          title="Ver detalles e ingredientes"
                          aria-label={`Ver detalles de ${product.name}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuickViewProduct(product);
                          }}
                        >
                          <i className="fa-solid fa-eye"></i>
                        </button>
                      </div>

                      <div className="product-card-body">
                        <div className="product-card-meta">
                          <span className="product-category-tag">
                            {CATEGORY_LABELS[product.category] || product.category}
                          </span>
                          <span className="product-servings-tag">
                            <i className="fa-regular fa-user"></i> {product.servings}
                          </span>
                        </div>

                        <h3
                          className="product-card-title"
                          onClick={() => setQuickViewProduct(product)}
                        >
                          {product.name}
                        </h3>
                        <p className="product-card-desc">{product.description}</p>

                        <div className="product-card-footer">
                          <div className="product-card-price-box">
                            <span className="product-card-price-label">
                              {hasVariants ? 'Desde' : 'Precio'}
                            </span>
                            <span className="product-card-price">
                              {product.basePrice > 0 ? formatCurrency(product.basePrice) : 'Consultar'}
                            </span>
                          </div>
                          {isAvailable ? (
                            <motion.button
                              type="button"
                              whileTap={{ scale: 0.9 }}
                              className="product-add-btn"
                              aria-label={`${hasVariants ? 'Elegir presentación de' : 'Agregar'} ${
                                product.name
                              }`}
                              onClick={(e) => {
                                if (hasVariants) {
                                  setQuickViewProduct(product);
                                } else {
                                  const cardImg = e.currentTarget
                                    .closest('.product-card')
                                    ?.querySelector('.product-card-img');
                                  addToCart(product.id, 0, 1, cardImg, product.image);
                                }
                              }}
                            >
                              <i className="fa-solid fa-plus"></i>{' '}
                              <span>{hasVariants ? 'Elegir' : 'Agregar'}</span>
                            </motion.button>
                          ) : (
                            <button
                              type="button"
                              className="product-add-btn out-of-stock"
                              disabled
                              title="Producto temporalmente sin stock"
                            >
                              <i className="fa-solid fa-ban"></i> <span>Sin Stock</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}

          <Reveal className="order-steps" y={20}>
            <div className="order-step">
              <span className="order-step-num">01</span>
              <div>
                <h3>Elegí tus favoritos</h3>
                <p>Sumá a la canasta lo que quieras de la carta o armá tu propia box.</p>
              </div>
            </div>
            <div className="order-step">
              <span className="order-step-num">02</span>
              <div>
                <h3>Confirmá por WhatsApp</h3>
                <p>Tu pedido sale armado y listo para enviar. Coordinamos pago, día y horario.</p>
              </div>
            </div>
            <div className="order-step">
              <span className="order-step-num">03</span>
              <div>
                <h3>Retirá o recibilo en casa</h3>
                <p>Pasá por {BUSINESS_CONFIG.shortAddress} o te lo llevamos, recién horneado.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
