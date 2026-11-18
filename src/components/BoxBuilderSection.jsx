import { AnimatePresence, motion } from 'motion/react';
import { useRef, useState } from 'react';
import { useStore } from '../context/StoreContext.jsx';
import {
  BOX_EXTRAS,
  BOX_FLAVORS,
  BOX_SPECS,
  formatCurrency,
  formatDateForMessage,
  localDateInputValue,
  whatsappUrl
} from '../data/catalog.js';
import { EASE_OUT_EXPO, Reveal } from './MotionPrimitives.jsx';

const DEFAULT_BOX_IMG = '/assets/images/box_cookies_regalo.jpg';

function createPhotoThumbnail(dataUrl, size = 160) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const side = Math.min(img.width, img.height);
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = size;
      canvas
        .getContext('2d')
        .drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, size, size);
      resolve(canvas.toDataURL('image/jpeg', 0.75));
    };
    img.onerror = () => resolve('');
    img.src = dataUrl;
  });
}

export default function BoxBuilderSection() {
  const { addCustomItemToCart } = useStore();
  const minDate = localDateInputValue(2);

  const [size, setSize] = useState('box6');
  const [tier, setTier] = useState('clasicas');
  const [extra, setExtra] = useState('Sin extra');
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [phrase, setPhrase] = useState('');
  const [eventDate, setEventDate] = useState(localDateInputValue(3));
  const [notes, setNotes] = useState('');
  const [refPhotos, setRefPhotos] = useState([]);
  const previewImgRef = useRef(null);

  const spec = BOX_SPECS[size] || BOX_SPECS.box6;
  const currentTier = spec.tiers[tier] || spec.tiers.clasicas;
  const extraObj = BOX_EXTRAS.find((e) => e.value === extra) || BOX_EXTRAS[0];
  const maxFlavors = spec.maxFlavors;
  const trimmedFlavors = selectedFlavors.slice(0, maxFlavors);
  const maxReached = trimmedFlavors.length >= maxFlavors;
  const totalPrice = currentTier.price + extraObj.price;

  const handleSizeChange = (nextSize) => {
    setSize(nextSize);
    const nextMax = BOX_SPECS[nextSize]?.maxFlavors || 3;
    setSelectedFlavors((prev) => prev.slice(0, nextMax));
  };

  const toggleFlavor = (flavorName) => {
    setSelectedFlavors((prev) => {
      if (prev.includes(flavorName)) {
        return prev.filter((f) => f !== flavorName);
      }
      if (prev.length >= maxFlavors) return prev;
      return [...prev, flavorName];
    });
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = async (ev) => {
        const url = ev.target?.result;
        if (!url) return;
        const thumb = await createPhotoThumbnail(url);
        setRefPhotos((prev) => [...prev, { name: file.name, url, thumb }]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const removePhoto = (index) => {
    setRefPhotos((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleWhatsappOrder = () => {
    let message = `*ARMÉ MI BOX - AMBROSÍA BAKERY*\n\n`;
    message += `• *Box:* ${spec.name} (Cookies ${currentTier.label})\n`;
    message += `• *Sabores:* ${
      trimmedFlavors.length ? trimmedFlavors.join(', ') : 'Surtidos a elección de Ambrosía'
    }\n`;
    if (extra !== 'Sin extra') {
      message += `• *Extra salado:* ${extra}\n`;
    }
    if (phrase.trim()) {
      message += `• *Tarjeta / dedicatoria:* "${phrase.trim()}"\n`;
    }
    if (notes.trim()) {
      message += `• *Detalles:* ${notes.trim()}\n`;
    }
    if (eventDate) {
      message += `• *Fecha de entrega:* ${formatDateForMessage(eventDate)}\n`;
    }
    if (refPhotos.length > 0) {
      message += `• *Imagen de referencia:* te la adjunto a continuación en este chat.\n`;
    }
    message += `• *Precio estimado:* ${formatCurrency(totalPrice)}\n\n`;
    message += `¡Hola! 🍪 Quisiera encargar esta box. ¿Me confirman disponibilidad? Muchas gracias.`;

    window.open(whatsappUrl(message), '_blank', 'noopener');
  };

  const handleAddToCart = () => {
    const flavorsSummary = trimmedFlavors.length ? trimmedFlavors.join(' + ') : 'Sabores surtidos';
    const extraSummary = extra !== 'Sin extra' ? ` · + ${extra}` : '';
    const thumbImg = (refPhotos[0] && refPhotos[0].thumb) || DEFAULT_BOX_IMG;

    addCustomItemToCart(
      {
        cartItemId: `custom-box-${Date.now()}`,
        id: 'custom-box-builder',
        name: `${spec.name} (Cookies ${currentTier.label})`,
        variantName: `${flavorsSummary}${extraSummary}${phrase.trim() ? ` · Tarjeta: "${phrase.trim()}"` : ''}`,
        price: totalPrice,
        image: thumbImg,
        notes: notes.trim(),
        eventDate,
        hasRefPhoto: refPhotos.length > 0,
        quantity: 1
      },
      previewImgRef.current
    );
  };

  const previewImgSrc = refPhotos.length > 0 ? refPhotos[0].url : DEFAULT_BOX_IMG;

  return (
    <section className="custom-cake-section" id="cotizador">
      <div className="container">
        <Reveal className="section-header text-center custom-cake-header">
          <span className="section-subtitle">
            <i className="fa-solid fa-gift"></i> Para vos o para regalar
          </span>
          <h2 className="section-title">Armá tu box a tu manera</h2>
          <p className="section-description">
            Elegí el tamaño, el tipo de cookie y tus sabores favoritos. Sumale chipá o scones y una tarjeta con dedicatoria: nosotros la armamos con todo el amor.
          </p>
        </Reveal>

        <div className="cake-builder-layout">
          <Reveal className="builder-form-card" x={-18} y={16}>
            <form className="custom-cake-form" onSubmit={(e) => e.preventDefault()}>
              {/* PASO 1 */}
              <div className="builder-step-block">
                <div className="builder-step-heading">
                  <span className="step-num">1</span>
                  <div>
                    <h3 className="step-title">Elegí el tamaño de tu box</h3>
                    <p className="step-desc">Según para cuántos sea o qué tan goloso te sientas hoy</p>
                  </div>
                </div>

                <div className="cake-diameters-grid">
                  {Object.entries(BOX_SPECS).map(([key, item]) => (
                    <motion.label
                      key={key}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.96 }}
                      className="cake-diameter-card"
                    >
                      <input
                        type="radio"
                        name="cakeDiameter"
                        value={key}
                        checked={size === key}
                        onChange={() => handleSizeChange(key)}
                      />
                      <div className={`diameter-card-inner ${item.badge ? 'highlight-diameter' : ''}`}>
                        {item.badge && <span className="diameter-badge">{item.badge}</span>}
                        <div className="diameter-visual">
                          <span className={`diameter-ring ${item.ringClass}`} aria-hidden="true" />
                          <span className="diameter-cm">{item.shortLabel}</span>
                        </div>
                        <div className="diameter-info">
                          <span className="diameter-portions">
                            {item.units} cookies XL
                            <br />
                            Hasta {item.maxFlavors} sabores
                          </span>
                          <span className="diameter-price">Desde {formatCurrency(item.tiers.clasicas.price)}</span>
                        </div>
                      </div>
                    </motion.label>
                  ))}
                </div>

                <div className="fillings-tier-selector">
                  <span className="sub-field-label">Tipo de cookie:</span>
                  <div className="fillings-tier-buttons">
                    <motion.label whileTap={{ scale: 0.97 }} className="tier-pill-label">
                      <input
                        type="radio"
                        name="cakeFillingsTier"
                        value="clasicas"
                        checked={tier === 'clasicas'}
                        onChange={() => setTier('clasicas')}
                      />
                      <div className="tier-pill-box">
                        <span className="tier-num">Clásicas</span>
                        <span className="tier-subtext">{formatCurrency(spec.tiers.clasicas.price)}</span>
                      </div>
                    </motion.label>

                    <motion.label whileTap={{ scale: 0.97 }} className="tier-pill-label">
                      <input
                        type="radio"
                        name="cakeFillingsTier"
                        value="rellenas"
                        checked={tier === 'rellenas'}
                        onChange={() => setTier('rellenas')}
                      />
                      <div className="tier-pill-box">
                        <span className="tier-num">Rellenas</span>
                        <span className="tier-subtext">{formatCurrency(spec.tiers.rellenas.price)}</span>
                      </div>
                    </motion.label>
                  </div>
                </div>
              </div>

              {/* PASO 2 */}
              <div className="builder-step-block">
                <div className="builder-step-heading">
                  <span className="step-num">2</span>
                  <div>
                    <h3 className="step-title">¿Le sumamos algo salado?</h3>
                    <p className="step-desc">Ideal para completar un desayuno o una merienda</p>
                  </div>
                </div>

                <div className="sponge-choices-grid">
                  {BOX_EXTRAS.map((opt) => (
                    <motion.label
                      key={opt.value}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.96 }}
                      className="sponge-card"
                    >
                      <input
                        type="radio"
                        name="cakeSponge"
                        value={opt.value}
                        checked={extra === opt.value}
                        onChange={() => setExtra(opt.value)}
                      />
                      <div className="sponge-card-inner">
                        <div className="sponge-icon-box">
                          <i className={opt.icon}></i>
                        </div>
                        <span className="sponge-name">{opt.label}</span>
                        <small className="sponge-desc">{opt.desc}</small>
                      </div>
                    </motion.label>
                  ))}
                </div>

                <div className="sponge-footer-note">
                  <i className="fa-solid fa-circle-info"></i>
                  <span>Todo horneado en el día, en caja de regalo con moño</span>
                </div>
              </div>

              {/* PASO 3 */}
              <div className="builder-step-block">
                <div className="builder-step-heading">
                  <span className="step-num">3</span>
                  <div className="step-heading-row">
                    <div>
                      <h3 className="step-title">Elegí tus sabores</h3>
                      <p className="step-desc">
                        Elegí hasta {maxFlavors} sabores para tu box de {spec.units}:
                      </p>
                    </div>
                    <span className="fillings-counter-pill">
                      {trimmedFlavors.length} / {maxFlavors} elegidos
                    </span>
                  </div>
                </div>

                <div className="fillings-selection-grid">
                  {BOX_FLAVORS.map((flavor) => {
                    const isChecked = trimmedFlavors.includes(flavor.name);
                    const isDisabled = !isChecked && maxReached;
                    return (
                      <motion.label
                        key={flavor.name}
                        whileTap={!isDisabled ? { scale: 0.95 } : undefined}
                        className={`filling-check-card ${isDisabled ? 'disabled' : ''}`}
                      >
                        <input
                          type="checkbox"
                          name="cakeFillings"
                          value={flavor.name}
                          checked={isChecked}
                          disabled={isDisabled}
                          onChange={() => toggleFlavor(flavor.name)}
                        />
                        <div className="filling-card-inner">
                          <i className={`${flavor.icon} filling-icon`}></i>
                          <span className="filling-name">{flavor.name}</span>
                        </div>
                      </motion.label>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {maxReached && (
                    <motion.small
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="field-hint"
                      style={{ color: 'var(--color-primary-dark)' }}
                    >
                      <i className="fa-solid fa-circle-exclamation"></i> Ya elegiste el máximo de sabores para esta box. Desmarcá uno si querés cambiarlo.
                    </motion.small>
                  )}
                </AnimatePresence>
              </div>

              {/* PASO 4 */}
              <div className="builder-step-block">
                <div className="builder-step-heading">
                  <span className="step-num">4</span>
                  <div>
                    <h3 className="step-title">¿Es para regalar?</h3>
                    <p className="step-desc">Sumale una tarjeta con dedicatoria y elegí la fecha</p>
                  </div>
                </div>

                <div className="inspiration-banner-card">
                  <p className="inspiration-main-prompt">
                    Cumpleaños, aniversarios, días especiales o regalos empresariales
                  </p>
                  <div className="inspiration-heart-divider">
                    <span className="divider-line" />
                    <motion.i
                      animate={{ scale: [1, 1.22, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="fa-solid fa-heart divider-heart"
                    />
                    <span className="divider-line" />
                  </div>
                  <p className="inspiration-tags">Tarjeta, colores de moño, logo de tu empresa ¡y más!</p>
                </div>

                <div className="phrase-inputs-row mt-3">
                  <div className="phrase-field">
                    <label htmlFor="cakeCustomPhrase" className="sub-field-label">
                      Dedicatoria para la tarjeta (Opcional):
                    </label>
                    <input
                      type="text"
                      id="cakeCustomPhrase"
                      className="cake-text-input"
                      placeholder="Ej: ¡Feliz cumple, Sofi! · Te quiero mucho"
                      value={phrase}
                      maxLength={60}
                      onChange={(e) => setPhrase(e.target.value)}
                    />
                    <small className="field-hint">Se previsualiza en la tarjeta de la derecha</small>
                  </div>

                  <div className="date-field">
                    <label htmlFor="cakeEventDate" className="sub-field-label">
                      Fecha de entrega / retiro *:
                    </label>
                    <input
                      type="date"
                      id="cakeEventDate"
                      className="cake-date-input"
                      min={minDate}
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      required
                    />
                    <small className="field-hint">Recomendamos pedir con 48hs de anticipación</small>
                  </div>
                </div>

                <div className="photo-upload-container mt-3">
                  <label className="sub-field-label">Logo o imagen de referencia (Opcional):</label>

                  <div className="photo-dropzone-box">
                    <input
                      type="file"
                      className="photo-file-input"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoUpload}
                    />
                    <div className="dropzone-content">
                      <i className="fa-solid fa-cloud-arrow-up dropzone-icon"></i>
                      <span className="dropzone-text">Adjuntá el logo de tu empresa o una referencia</span>
                      <small className="dropzone-sub">Ideal para regalos corporativos · JPG, PNG o WEBP</small>
                    </div>
                  </div>

                  <AnimatePresence>
                    {refPhotos.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="attached-previews-grid"
                      >
                        {refPhotos.map((photo, index) => (
                          <motion.div
                            key={`${photo.name}-${index}`}
                            initial={{ scale: 0.7, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.7, opacity: 0 }}
                            className="attached-preview-thumb"
                          >
                            <img src={photo.url} alt={photo.name} />
                            <button
                              type="button"
                              className="btn-remove-thumb"
                              aria-label="Eliminar foto"
                              onClick={() => removePhoto(index)}
                            >
                              <i className="fa-solid fa-xmark"></i>
                            </button>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="form-group mt-3">
                  <label htmlFor="cakeCustomNotes" className="sub-field-label">
                    Aclaraciones (Opcional):
                  </label>
                  <textarea
                    id="cakeCustomNotes"
                    className="cake-text-input"
                    rows="2"
                    placeholder="Ej: Moño color mostaza, sin frutos secos, es una sorpresa (no llamar al destinatario)..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </Reveal>

          <Reveal className="builder-preview-sticky" x={18} y={16} delay={0.1}>
            <div className="live-cake-preview-card">
              <div className="preview-card-media">
                <img
                  ref={previewImgRef}
                  src={previewImgSrc}
                  alt="Vista previa de box de cookies personalizada"
                  className="preview-main-img"
                  loading="lazy"
                  decoding="async"
                />

                <div className="cake-phrase-overlay">
                  <span className="phrase-overlay-label">Tarjeta de regalo:</span>
                  <span className="phrase-script-text">"{phrase.trim() || 'Para alguien especial'}"</span>
                </div>
              </div>

              <div className="preview-card-content">
                <div className="preview-header-meta">
                  <h4 className="preview-title">{spec.name}</h4>
                  <span className="preview-servings-badge">
                    {spec.units} cookies {currentTier.label.toLowerCase()}
                  </span>
                </div>

                <div className="live-specs-chips">
                  <div className="spec-chip">
                    <i className="fa-solid fa-cookie-bite"></i>
                    <span>Cookies {currentTier.label}</span>
                  </div>
                  <div className="spec-chip">
                    <i className="fa-solid fa-plus"></i>
                    <span>{extra === 'Sin extra' ? 'Solo cookies' : `+ ${extra}`}</span>
                  </div>
                  <div className="spec-chip full-width-chip">
                    <i className="fa-solid fa-heart"></i>
                    <span>
                      {trimmedFlavors.length > 0
                        ? trimmedFlavors.join(' + ')
                        : `Sabores surtidos (hasta ${maxFlavors} a elección)`}
                    </span>
                  </div>
                  {refPhotos.length > 0 && (
                    <div className="spec-chip ref-photo-chip">
                      <i className="fa-solid fa-camera"></i>
                      <span>Imagen de referencia adjunta</span>
                    </div>
                  )}
                </div>

                <div className="preview-price-box">
                  <div className="price-data">
                    <span className="price-title">Precio Estimado</span>
                    <motion.span
                      key={totalPrice}
                      initial={{ scale: 0.86, opacity: 0.5 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
                      className="price-amount"
                    >
                      {formatCurrency(totalPrice)}
                    </motion.span>
                  </div>
                  <span className="price-clarification">
                    Precio de referencia · Te confirmamos por WhatsApp
                  </span>
                </div>

                <div className="builder-actions-stack">
                  <motion.button
                    type="button"
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn btn-whatsapp-full btn-lg"
                    onClick={handleWhatsappOrder}
                  >
                    <i className="fa-brands fa-whatsapp"></i> Pedir mi Box por WhatsApp
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn btn-secondary btn-block"
                    onClick={handleAddToCart}
                  >
                    <i className="fa-solid fa-basket-shopping"></i> Agregar a la Canasta
                  </motion.button>
                </div>

                <p className="preview-guarantee">
                  <i className="fa-solid fa-circle-check"></i> Te respondemos rápido para confirmar disponibilidad y coordinar la entrega.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
