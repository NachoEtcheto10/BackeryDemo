import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AnnouncementBar from './components/AnnouncementBar.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import CheckoutModal from './components/CheckoutModal.jsx';
import FloatingWhatsapp from './components/FloatingWhatsapp.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import MobileNavDrawer from './components/MobileNavDrawer.jsx';
import { EASE_OUT_EXPO } from './components/MotionPrimitives.jsx';
import OrderSuccessModal from './components/OrderSuccessModal.jsx';
import QuickViewModal from './components/QuickViewModal.jsx';
import ScrollProgressBar from './components/ScrollProgressBar.jsx';
import ToastContainer from './components/ToastContainer.jsx';
import AdminPage from './pages/AdminPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import CartaPage from './pages/CartaPage.jsx';
import ClubPage from './pages/ClubPage.jsx';
import HomePage from './pages/HomePage.jsx';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname, location.hash]);

  return (
    <>
      <ScrollProgressBar />
      <AnnouncementBar />
      <Header />
      <MobileNavDrawer />

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/carta" element={<CartaPage />} />
              <Route path="/club" element={<ClubPage />} />
              <Route path="/cuenta" element={<AuthPage defaultTab="login" />} />
              <Route path="/ingresar" element={<AuthPage defaultTab="login" />} />
              <Route path="/login" element={<AuthPage defaultTab="login" />} />
              <Route path="/registro" element={<AuthPage defaultTab="register" />} />
              <Route path="/crear-cuenta" element={<AuthPage defaultTab="register" />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/carta.html" element={<Navigate to="/carta" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <QuickViewModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <ToastContainer />
      <FloatingWhatsapp />
    </>
  );
}
