import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProgramSection from '@/components/ProgramSection';
import ModulesSection from '@/components/ModulesSection';
import CertificationSection from '@/components/CertificationSection';
import InstructorsSection from '@/components/InstructorsSection';
import PricingSection from '@/components/PricingSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ProgramSection />
        <ModulesSection />
        <CertificationSection />
        <InstructorsSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
