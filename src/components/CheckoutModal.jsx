import { useState } from 'react';
import { useStore } from '../context/StoreContext.jsx';
import {
  BUSINESS_CONFIG,
  REWARD_GOAL,
  formatCurrency,
  formatDateForMessage,
  localDateInputValue,
  whatsappUrl
} from '../data/catalog.js';

export default function CheckoutModal() {
  const {
    cart,
    totals,
    isCheckoutOpen,
    setIsCheckoutOpen,
    setSuccessOrder,
    clearCart,
    awardOrderLoyaltyStamp
  } = useStore();

  const minDate = localDateInputValue(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryType, setDeliveryType] = useState('pickup');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [reference, setReference] = useState('');
  const [orderDate, setOrderDate] = useState(minDate);
  const [orderTime, setOrderTime] = useState('Mañana (8:30 a 12:00 hs)');
  const [dedication, setDedication] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Transferencia Bancaria');

  if (!isCheckoutOpen) return null;

  const isShipping = deliveryType === 'shipping';

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderCode = `AMB-${Math.floor(1000 + Math.random() * 9000)}`;

    let waMessage = `*NUEVO PEDIDO - AMBROSÍA BAKERY* 🍪\n`;
    waMessage += `Orden: #${orderCode}\n\n`;

    waMessage += `*DATOS DEL CLIENTE*\n`;
    waMessage += `• Nombre: ${name.trim()}\n`;
    waMessage += `• Tel/WhatsApp: ${phone.trim()}\n\n`;

    waMessage += `*PRODUCTOS SELECCIONADOS*\n`;
    cart.forEach((item) => {
      waMessage += `• ${item.quantity}x ${item.name} (${item.variantName}) - ${formatCurrency(item.price * item.quantity)}\n`;
      if (item.notes) waMessage += `   Detalles: ${item.notes}\n`;
      if (item.eventDate) waMessage += `   Fecha del evento: ${formatDateForMessage(item.eventDate)}\n`;
      if (item.hasRefPhoto) waMessage += `   Foto de referencia: la adjunto en este chat.\n`;
    });

    if (totals.subtotal >= REWARD_GOAL) {
      waMessage += `• Regalo de cortesía: 1x Cookie Artesanal (Meta de canasta alcanzada)\n`;
    }

    waMessage += `\n*RESUMEN DE PAGO*\n`;
    waMessage += `• *TOTAL FINAL: ${formatCurrency(totals.total)}*\n`;
    waMessage += `• Forma de Pago: ${paymentMethod}\n\n`;

    waMessage += `*DETALLES DE ENTREGA*\n`;
    waMessage += `• Método: ${
      isShipping ? 'Envío a Domicilio' : `Retiro en el local (${BUSINESS_CONFIG.shortAddress}, C. del Uruguay)`
    }\n`;
    if (isShipping) {
      waMessage += `• Dirección: ${address.trim()}\n`;
      if (city.trim()) waMessage += `• Barrio/Localidad: ${city.trim()}\n`;
      if (reference.trim()) waMessage += `• Timbre/Referencia: ${reference.trim()}\n`;
    }
    waMessage += `• Fecha solicitada: ${formatDateForMessage(orderDate)}\n`;
    waMessage += `• Franja horaria: ${orderTime}\n\n`;

    if (dedication.trim()) {
      waMessage += `*TARJETA / NOTAS ESPECIALES*\n`;
      waMessage += `"${dedication.trim()}"\n\n`;
    }

    waMessage += `¡Hola! Acabo de armar mi pedido en la web y quisiera confirmarlo para coordinar el pago. Muchas gracias.`;

    const waUrl = whatsappUrl(waMessage);
    window.open(waUrl, '_blank', 'noopener');

    setIsCheckoutOpen(false);
    setSuccessOrder({ orderCode: `#${orderCode}`, waUrl });
    clearCart();
    awardOrderLoyaltyStamp();
  };

  return (
    <div
      className="modal-overlay open"
      aria-hidden="false"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setIsCheckoutOpen(false);
      }}
    >
      <div className="modal-dialog checkout-dialog">
        <button
          type="button"
          className="modal-close-btn"
          aria-label="Cerrar checkout"
          onClick={() => setIsCheckoutOpen(false)}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="checkout-header">
          <div className="checkout-brand-mini">
            <img src="/assets/images/logo.svg" alt="Logo Ambrosía Bakery" width="36" height="36" />
            <span>Ambrosía Bakery · Checkout</span>
          </div>
          <h3>Finalizar tu Pedido</h3>
          <p>Completá tus datos para generar tu orden y enviarla directamente a nuestro WhatsApp oficial.</p>
        </div>

        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="checkout-sections-wrapper">
            <div className="checkout-block">
              <h4 className="block-title">
                <i className="fa-regular fa-user"></i> 1. Tus Datos
              </h4>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="custName">Nombre y Apellido *</label>
                  <input
                    type="text"
                    id="custName"
                    placeholder="Ej: Valentina Rossi"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="custPhone">Teléfono / WhatsApp *</label>
                  <input
                    type="tel"
                    id="custPhone"
                    placeholder="Ej: 3442 123456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="checkout-block">
              <h4 className="block-title">
                <i className="fa-solid fa-truck-ramp-box"></i> 2. Tipo de Entrega
              </h4>
              <div className="delivery-options-toggle">
                <label className="delivery-radio-label">
                  <input
                    type="radio"
                    name="deliveryType"
                    value="pickup"
                    checked={deliveryType === 'pickup'}
                    onChange={() => setDeliveryType('pickup')}
                  />
                  <span className="delivery-radio-btn">
                    <i className="fa-solid fa-store"></i>
                    <strong>Retiro en el Local</strong>
                    <small>Sin costo · {BUSINESS_CONFIG.shortAddress}</small>
                  </span>
                </label>

                <label className="delivery-radio-label">
                  <input
                    type="radio"
                    name="deliveryType"
                    value="shipping"
                    checked={deliveryType === 'shipping'}
                    onChange={() => setDeliveryType('shipping')}
                  />
                  <span className="delivery-radio-btn">
                    <i className="fa-solid fa-motorcycle"></i>
                    <strong>Envío a Domicilio</strong>
                    <small>Coordinar costo según zona</small>
                  </span>
                </label>
              </div>

              {isShipping && (
                <div className="shipping-address-fields">
                  <div className="form-row">
                    <div className="form-group full-width">
                      <label htmlFor="custAddress">Dirección y Altura (con piso/depto) *</label>
                      <input
                        type="text"
                        id="custAddress"
                        placeholder="Ej: Rocamora 850, 2do A"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="custCity">Localidad / Barrio *</label>
                      <input
                        type="text"
                        id="custCity"
                        placeholder="Ej: Centro / Barrio"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="custRef">Referencia / Timbre</label>
                      <input
                        type="text"
                        id="custRef"
                        placeholder="Ej: Entre calles / Timbre 4B"
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="checkout-block">
              <h4 className="block-title">
                <i className="fa-regular fa-calendar-check"></i> 3. Fecha y Franja Horaria
              </h4>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="orderDate">Fecha de Entrega/Retiro *</label>
                  <input
                    type="date"
                    id="orderDate"
                    min={minDate}
                    value={orderDate}
                    onChange={(e) => setOrderDate(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="orderTime">Franja Horaria Preferida *</label>
                  <select
                    id="orderTime"
                    value={orderTime}
                    onChange={(e) => setOrderTime(e.target.value)}
                    required
                  >
                    <option value="Mañana (8:30 a 12:00 hs)">Mañana (8:30 a 12:00 hs)</option>
                    <option value="Tarde (17:00 a 20:00 hs)">Tarde (17:00 a 20:00 hs)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="checkout-block">
              <h4 className="block-title">
                <i className="fa-solid fa-envelope-open-text"></i> 4. Mensaje de Regalo o Aclaraciones (Opcional)
              </h4>
              <div className="form-group">
                <label htmlFor="orderDedication">Dedicatoria para la tarjeta o aclaraciones del pedido:</label>
                <textarea
                  id="orderDedication"
                  rows="2"
                  placeholder="Ej: '¡Feliz cumple, Lau! Con amor, tus amigas.' / Es sorpresa, no avisar."
                  value={dedication}
                  onChange={(e) => setDedication(e.target.value)}
                />
              </div>
            </div>

            <div className="checkout-block">
              <h4 className="block-title">
                <i className="fa-solid fa-credit-card"></i> 5. Método de Pago
              </h4>
              <div className="payment-radios-group">
                {[
                  {
                    value: 'Transferencia Bancaria',
                    name: 'Transferencia Bancaria',
                    desc: 'Te enviamos el alias/CBU al instante por WhatsApp'
                  },
                  {
                    value: 'Mercado Pago / Tarjeta',
                    name: 'Mercado Pago / Tarjetas de Débito o Crédito',
                    desc: 'Link de pago oficial seguro'
                  },
                  {
                    value: 'Efectivo al retirar',
                    name: 'Efectivo al Retirar en el Local',
                    desc: 'Abonás al momento del retiro'
                  }
                ].map((opt) => (
                  <label key={opt.value} className="payment-radio-item">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={opt.value}
                      checked={paymentMethod === opt.value}
                      onChange={() => setPaymentMethod(opt.value)}
                    />
                    <div className="payment-info">
                      <span className="pay-name">{opt.name}</span>
                      <small>{opt.desc}</small>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="checkout-order-summary">
            <div className="summary-line">
              <span>Productos a ordenar:</span>
              <span>
                {totals.totalItems} producto{totals.totalItems === 1 ? '' : 's'}
              </span>
            </div>
            <div className="summary-line total-highlight">
              <span>Total a Pagar:</span>
              <span className="price-val">{formatCurrency(totals.total)}</span>
            </div>
          </div>

          <button type="submit" className="btn btn-whatsapp-full btn-lg">
            <i className="fa-brands fa-whatsapp"></i> Confirmar y Abrir WhatsApp para Enviar Pedido
          </button>
        </form>
      </div>
    </div>
  );
}
