import { Link } from 'react-router-dom';
import LoyaltyCardSection from '../components/LoyaltyCardSection.jsx';

export default function ClubPage() {
  return (
    <>
      <section className="carta-page-hero">
        <div className="container carta-page-hero-inner">
          <Link to="/" className="carta-back-link">
            <i className="fa-solid fa-arrow-left"></i> Volver al inicio
          </Link>
          <div className="carta-page-actions">
            <Link to="/carta" className="btn btn-primary btn-sm">
              <i className="fa-solid fa-cookie-bite"></i> Ir a la Carta
            </Link>
          </div>
        </div>
      </section>

      <LoyaltyCardSection />
    </>
  );
}
