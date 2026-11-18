import { useStore } from '../context/StoreContext.jsx';

export default function ToastContainer() {
  const { toasts } = useStore();

  return (
    <div className="toast-container" id="toastContainer" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.hiding ? 'hiding' : ''}`}>
          <span className="toast-icon">
            <i className={toast.iconClass}></i>
          </span>
          <span className="toast-text">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
