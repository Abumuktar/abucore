import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";
import WhyChoose from "@/components/WhyChoose";
import AboutPreview from "@/components/AboutPreview";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ServicesGrid />
      <WhyChoose />
      <AboutPreview />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default Index;
