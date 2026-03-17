import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { FileText, Armchair, Printer, HardHat, Fuel, Shirt, Wheat, HeartPulse, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ease = [0.16, 1, 0.3, 1] as const;

const services = [
  { icon: FileText, title: "Stationery & Office Supply", desc: "Complete range of office supplies including paper, pens, files, folders, toners, and all stationery items needed by government offices and private organizations.", features: ["Bulk Orders", "Custom Packaging", "Fast Delivery"] },
  { icon: Armchair, title: "Furniture Supply", desc: "Quality office furniture including desks, chairs, shelving, filing cabinets, and custom furniture for institutions and government offices.", features: ["Office Desks", "Ergonomic Chairs", "Custom Solutions"] },
  { icon: Printer, title: "Printing & Branding", desc: "Professional printing services including letterheads, ID cards, banners, brochures, branded materials, and large-format printing.", features: ["ID Cards", "Banners", "Brochures"] },
  { icon: HardHat, title: "Civil Works & Renovation", desc: "Building renovation, painting, plumbing, electrical work, and general construction projects for government and private facilities.", features: ["Renovations", "Construction", "Maintenance"] },
  { icon: Fuel, title: "Diesel & Fuel Supply", desc: "Reliable diesel and fuel supply for government vehicle fleets, generators, and organizational operations across all LGAs.", features: ["Bulk Diesel", "Generator Fuel", "Fleet Supply"] },
  { icon: Shirt, title: "Uniforms & Workwear", desc: "Custom-designed uniforms, safety gear, and workwear for schools, hospitals, security agencies, and corporate organizations.", features: ["School Uniforms", "Safety Gear", "Corporate Wear"] },
  { icon: Wheat, title: "Agricultural Inputs", desc: "Supply of seeds, fertilizers, herbicides, farming equipment, and other agricultural inputs for government farming programs.", features: ["Seeds", "Fertilizers", "Equipment"] },
  { icon: HeartPulse, title: "Medical Consumables", desc: "Medical supplies, consumables, and equipment for government hospitals, clinics, and healthcare facilities across the state.", features: ["PPE Supplies", "Lab Equipment", "Consumables"] },
];

const Services = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <PageHero
        label="Our Services"
        title="What We Supply & Deliver"
        description="Comprehensive supply and contracting solutions tailored for government and private sector needs."
      />

      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.06 }}
                className="group bg-background border border-border rounded-2xl p-6 sm:p-8 hover:shadow-card hover:border-gold/20 transition-all duration-500"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl gradient-navy flex items-center justify-center shrink-0 shadow-soft">
                    <s.icon className="w-6 h-6 text-gold" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground text-lg mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {s.features.map((f) => (
                        <span key={f} className="text-[11px] font-medium text-gold bg-gold/10 rounded-full px-3 py-1">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-14"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 gradient-gold text-navy px-8 py-4 font-semibold text-sm rounded-xl hover:shadow-glow transition-all duration-300 group"
            >
              Get a Quote for Any Service
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </div>
  );
};

export default Services;
