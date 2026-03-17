import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import { motion } from "framer-motion";
import { FileText, Armchair, Printer, HardHat, Fuel, Shirt, Wheat, HeartPulse } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const services = [
  { icon: FileText, title: "Stationery & Office Supply", desc: "Complete range of office supplies including paper, pens, files, folders, toners, and all stationery items needed by government offices and private organizations." },
  { icon: Armchair, title: "Furniture Supply", desc: "Quality office furniture including desks, chairs, shelving, filing cabinets, and custom furniture for institutions and government offices." },
  { icon: Printer, title: "Printing & Branding", desc: "Professional printing services including letterheads, ID cards, banners, brochures, branded materials, and large-format printing." },
  { icon: HardHat, title: "Civil Works & Renovation", desc: "Building renovation, painting, plumbing, electrical work, and general construction projects for government and private facilities." },
  { icon: Fuel, title: "Diesel & Fuel Supply", desc: "Reliable diesel and fuel supply for government vehicle fleets, generators, and organizational operations across all LGAs." },
  { icon: Shirt, title: "Uniforms & Workwear", desc: "Custom-designed uniforms, safety gear, and workwear for schools, hospitals, security agencies, and corporate organizations." },
  { icon: Wheat, title: "Agricultural Inputs", desc: "Supply of seeds, fertilizers, herbicides, farming equipment, and other agricultural inputs for government farming programs." },
  { icon: HeartPulse, title: "Medical Consumables", desc: "Medical supplies, consumables, and equipment for government hospitals, clinics, and healthcare facilities across the state." },
];

const Services = () => {
  return (
    <div className="min-h-screen">
      <Header />

      <section className="bg-navy py-20 md:py-28">
        <div className="container">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gold text-xs tracking-[2px] uppercase font-body font-semibold">
            Our Services
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="font-display text-4xl md:text-5xl text-primary-foreground mt-3 max-w-xl"
          >
            What We Supply & Deliver
          </motion.h1>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease, delay: i * 0.08 }}
                className="flex gap-5 p-6 bg-surface border-l-[3px] border-gold"
              >
                <div className="w-12 h-12 bg-navy flex items-center justify-center shrink-0">
                  <s.icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-body font-semibold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </div>
  );
};

export default Services;
