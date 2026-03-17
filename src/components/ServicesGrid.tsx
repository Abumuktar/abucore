import { motion } from "framer-motion";
import { FileText, Armchair, Printer, HardHat, Fuel, Shirt, Wheat, HeartPulse, ArrowUpRight } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

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
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-gold text-xs tracking-[2px] uppercase font-semibold bg-gold/10 rounded-full px-4 py-1.5 mb-4">
            Our Services
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground">
            What We Supply & Deliver
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-sm sm:text-base">
            From stationery to civil works, we provide end-to-end supply and contracting solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.5, ease, delay: i * 0.06 }}
              className="group relative bg-background border border-border rounded-2xl p-6 hover:shadow-card hover:border-gold/30 transition-all duration-500 cursor-pointer overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 gradient-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-2xl" />
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors duration-300">
                <service.icon className="w-5 h-5 text-gold" />
              </div>
              <h4 className="text-sm font-semibold text-foreground mb-2">{service.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {service.desc}
              </p>
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="w-4 h-4 text-gold" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
