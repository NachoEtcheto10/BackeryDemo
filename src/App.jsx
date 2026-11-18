import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AnnouncementBar from './components/AnnouncementBar.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import CheckoutModal from './components/CheckoutModal.jsx';
import FloatingWhatsapp from './components/FloatingWhatsapp.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import MobileNavDrawer from './components/MobileNavDrawer.jsx';
import OrderSuccessModal from './components/OrderSuccessModal.jsx';
import QuickViewModal from './components/QuickViewModal.jsx';
import ToastContainer from './components/ToastContainer.jsx';
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
      <AnnouncementBar />
      <Header />
      <MobileNavDrawer />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/carta" element={<CartaPage />} />
          <Route path="/club" element={<ClubPage />} />
          <Route path="/carta.html" element={<Navigate to="/carta" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
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
