import { AnimatePresence, motion } from 'motion/react';
import { useStore } from '../context/StoreContext.jsx';
import { EASE_OUT_EXPO } from './MotionPrimitives.jsx';

export default function ToastContainer() {
  const { toasts } = useStore();

  return (
    <div className="toast-container" id="toastContainer" aria-live="polite">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: toast.hiding ? 0 : 1, y: toast.hiding ? 10 : 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.92 }}
            transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
            className="toast"
          >
            <span className="toast-icon">
              <i className={toast.iconClass}></i>
            </span>
            <span className="toast-text">{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
