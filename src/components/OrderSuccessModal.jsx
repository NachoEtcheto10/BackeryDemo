import { useStore } from '../context/StoreContext.jsx';

export default function OrderSuccessModal() {
  const { successOrder, setSuccessOrder } = useStore();

  if (!successOrder) return null;

  return (
    <div
      className="modal-overlay open"
      aria-hidden="false"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setSuccessOrder(null);
      }}
    >
      <div className="modal-dialog success-dialog text-center">
        <div className="success-icon-badge">
          <i className="fa-solid fa-circle-check"></i>
        </div>
        <h3 className="success-title">¡Tu Pedido ha sido Generado!</h3>
        <p className="success-message">
          Si tu WhatsApp no se abrió automáticamente, podés hacer clic en el botón a continuación para enviar los detalles directamente a Ambrosía.
        </p>

        <div className="order-code-box">
          <span>Código de Pedido:</span>
          <strong>{successOrder.orderCode}</strong>
        </div>

        <div className="success-actions">
          <a
            href={successOrder.waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp-full"
          >
            <i className="fa-brands fa-whatsapp"></i> Abrir WhatsApp Manualmente
          </a>
          <button
            type="button"
            className="btn btn-secondary btn-block"
            onClick={() => setSuccessOrder(null)}
          >
            Volver a la Tienda
          </button>
        </div>
      </div>
    </div>
  );
}
