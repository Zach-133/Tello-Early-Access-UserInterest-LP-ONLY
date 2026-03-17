import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EarlyAccessProvider } from '@/context/EarlyAccessContext';
import { EarlyAccessDrawer } from '@/components/landing/EarlyAccessDrawer';
import { Navbar } from '@/components/landing/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { BenefitsSection } from '@/components/landing/BenefitsSection';
import { FAQSection } from '@/components/landing/FAQSection';
import { CTASection } from '@/components/landing/CTASection';
import { Footer } from '@/components/landing/Footer';
import { PrivacyPolicy } from '@/pages/PrivacyPolicy';
import { TermsOfService } from '@/pages/TermsOfService';

function LandingPage() {
  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <BenefitsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <EarlyAccessProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
        <EarlyAccessDrawer />
      </EarlyAccessProvider>
    </BrowserRouter>
  );
}

export default App;
