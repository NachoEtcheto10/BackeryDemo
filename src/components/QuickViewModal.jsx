import { useEffect, useRef, useState } from 'react';
import { useStore } from '../context/StoreContext.jsx';
import { CATEGORY_LABELS, formatCurrency } from '../data/catalog.js';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useStore();
  const [variantIndex, setVariantIndex] = useState(0);
  const imgRef = useRef(null);

  useEffect(() => {
    setVariantIndex(0);
  }, [quickViewProduct]);

  if (!quickViewProduct) {
    return <div className="modal-overlay" aria-hidden="true" />;
  }

  const variants = quickViewProduct.variants || [{ name: 'Estándar', price: quickViewProduct.basePrice }];
  const selectedVariant = variants[variantIndex] || variants[0];

  const handleAdd = () => {
    const added = addToCart(quickViewProduct.id, variantIndex, 1, imgRef.current, quickViewProduct.image);
    if (added) setQuickViewProduct(null);
  };

  return (
    <div
      className="modal-overlay open"
      aria-hidden="false"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setQuickViewProduct(null);
      }}
    >
      <div className="modal-dialog quick-view-dialog">
        <button
          type="button"
          className="modal-close-btn"
          aria-label="Cerrar ventana"
          onClick={() => setQuickViewProduct(null)}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="quick-view-content">
          <div className="quick-view-grid">
            <div>
              <img
                ref={imgRef}
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="qv-image"
              />
            </div>

            <div className="qv-details">
              <span className="qv-category">
                {CATEGORY_LABELS[quickViewProduct.category] || quickViewProduct.category} · {quickViewProduct.servings}
              </span>
              <h3 className="qv-title">{quickViewProduct.name}</h3>
              <div className="qv-price">{formatCurrency(selectedVariant.price)}</div>
              <p className="qv-desc">{quickViewProduct.description}</p>

              <div className="qv-allergens">
                <strong>
                  <i className="fa-solid fa-wheat-awn-circle-exclamation"></i> Información de alérgenos:
                </strong>
                <p>{quickViewProduct.allergens}</p>
              </div>

              {variants.length > 1 && (
                <>
                  <div className="qv-variants-label">Elegí la presentación:</div>
                  <div className="qv-variants-options">
                    {variants.map((v, idx) => (
                      <button
                        key={v.name}
                        type="button"
                        className={`qv-variant-pill ${idx === variantIndex ? 'active' : ''}`}
                        onClick={() => setVariantIndex(idx)}
                      >
                        {v.name}
                      </button>
                    ))}
                  </div>
                </>
              )}

              <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                {quickViewProduct.available !== false ? (
                  <button type="button" className="btn btn-primary btn-block" onClick={handleAdd}>
                    <i className="fa-solid fa-basket-shopping"></i> Agregar a la Canasta
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-secondary btn-block"
                    disabled
                    style={{ opacity: 0.65, cursor: 'not-allowed' }}
                  >
                    <i className="fa-solid fa-ban"></i> Sin Stock Disponible
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
