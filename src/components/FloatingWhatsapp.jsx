import { motion } from 'motion/react';
import { whatsappUrl } from '../data/catalog.js';

export default function FloatingWhatsapp() {
  return (
    <motion.a
      href={whatsappUrl('Hola!! 🍪 Tengo una consulta.')}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp-bubble"
      aria-label="Contactar por WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.65 }}
      whileHover={{ scale: 1.1, rotate: 6 }}
      whileTap={{ scale: 0.94 }}
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full border-2 border-[#25D366]"
        animate={{ scale: [1, 1.38], opacity: [0.65, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
      />
      <i className="fa-brands fa-whatsapp"></i>
      <span className="whatsapp-tooltip">¿Dudas? Escribinos por WhatsApp</span>
    </motion.a>
  );
}
