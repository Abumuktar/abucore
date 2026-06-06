import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ClientsStrip from "@/components/ClientsStrip";
import ServicesGrid from "@/components/ServicesGrid";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import WhyChoose from "@/components/WhyChoose";
import HowWeWork from "@/components/HowWeWork";
import AboutPreview from "@/components/AboutPreview";
import PartnershipCTA from "@/components/PartnershipCTA";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ClientsStrip />
      <ServicesGrid />
      <ProjectsShowcase />
      <WhyChoose />
      <HowWeWork />
      <div className="space-y-0">
        <AboutPreview />
        <PartnershipCTA />
        <Testimonials />
      </div>
      <CTABanner />
      <Footer />
    </div>
  );
};

export default Index;
