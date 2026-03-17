import './index.css';
import { EarlyAccessProvider } from '@/context/EarlyAccessContext';
import { EarlyAccessDrawer } from '@/components/landing/EarlyAccessDrawer';
import { Navbar } from '@/components/landing/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { BenefitsSection } from '@/components/landing/BenefitsSection';
import { FAQSection } from '@/components/landing/FAQSection';
import { CTASection } from '@/components/landing/CTASection';
import { Footer } from '@/components/landing/Footer';

function App() {
  return (
    <EarlyAccessProvider>
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
      <EarlyAccessDrawer />
    </EarlyAccessProvider>
  );
}

export default App;
