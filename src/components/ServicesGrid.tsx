import { motion } from "framer-motion";
import { FileText, Armchair, Printer, HardHat, Fuel, Shirt, Wheat, HeartPulse } from "lucide-react";

const ease = [0.16, 1, 0.3, 1];

const services = [
  { icon: FileText, title: "Stationery & Office Supply", desc: "Complete office supply solutions for government and private organizations." },
  { icon: Armchair, title: "Furniture Supply", desc: "Quality office and institutional furniture delivered on time." },
  { icon: Printer, title: "Printing & Branding", desc: "Professional printing and branding materials for all needs." },
  { icon: HardHat, title: "Civil Works", desc: "Building renovation, construction, and infrastructure projects." },
  { icon: Fuel, title: "Diesel & Fuel Supply", desc: "Reliable fuel supply for government fleets and organizations." },
  { icon: Shirt, title: "Uniforms & Workwear", desc: "Custom uniforms and workwear for staff and institutions." },
  { icon: Wheat, title: "Agricultural Inputs", desc: "Seeds, fertilizers, and farming tools for agricultural programs." },
  { icon: HeartPulse, title: "Medical Consumables", desc: "Medical supplies for hospitals and healthcare facilities." },
];

const ServicesGrid = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-gold text-xs tracking-[2px] uppercase font-body font-semibold">Our Services</span>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mt-3">
            What We Supply & Deliver
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease, delay: i * 0.08 }}
              className="group bg-surface p-6 border-b-[3px] border-gold hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-11 h-11 bg-navy flex items-center justify-center mb-4">
                <service.icon className="w-5 h-5 text-gold" />
              </div>
              <h4 className="text-sm font-semibold text-foreground font-body mb-2">{service.title}</h4>
              <p className="text-xs text-muted-foreground font-body leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
