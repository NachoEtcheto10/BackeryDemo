import AboutSection from '../components/AboutSection.jsx';
import AllianceSection from '../components/AllianceSection.jsx';
import BirthdaySection from '../components/BirthdaySection.jsx';
import BoxBuilderSection from '../components/BoxBuilderSection.jsx';
import ContactSection from '../components/ContactSection.jsx';
import FaqSection from '../components/FaqSection.jsx';
import HeroSection from '../components/HeroSection.jsx';
import InstagramSection from '../components/InstagramSection.jsx';
import OfferingsSection from '../components/OfferingsSection.jsx';
import TestimonialsSection from '../components/TestimonialsSection.jsx';
import ValuesMarquee from '../components/ValuesMarquee.jsx';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ValuesMarquee />
      <OfferingsSection />
      <BoxBuilderSection />
      <BirthdaySection />
      <AboutSection />
      <InstagramSection />
      <TestimonialsSection />
      <AllianceSection />
      <ContactSection />
      <FaqSection />
    </>
  );
}
