import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ClientsStrip from "@/components/ClientsStrip";
import ServicesGrid from "@/components/ServicesGrid";
import WhyChoose from "@/components/WhyChoose";
import AboutPreview from "@/components/AboutPreview";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ClientsStrip />
      <ServicesGrid />
      <WhyChoose />
      <AboutPreview />
      <Testimonials />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default Index;
