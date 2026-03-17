import { motion } from "framer-motion";
import { ClipboardCheck, Truck, PackageCheck, Handshake } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const steps = [
  { icon: ClipboardCheck, step: "01", title: "Request & Consultation", desc: "Submit your requirements through our contact form, phone, or WhatsApp. We review and respond within 24 hours." },
  { icon: Handshake, step: "02", title: "Quote & Agreement", desc: "We prepare a detailed quote tailored to your needs. Once approved, we formalize the contract and begin procurement." },
  { icon: Truck, step: "03", title: "Procurement & Delivery", desc: "Our logistics team sources, quality-checks, and delivers your order to any location across Nigeria." },
  { icon: PackageCheck, step: "04", title: "Completion & Support", desc: "We ensure everything meets your specifications. Our relationship doesn't end at delivery — we're always here." },
];

const HowWeWork = () => {
  return (
    <section className="py-20 md:py-28 bg-muted/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center text-gold text-xs tracking-[2px] uppercase font-semibold bg-gold/10 rounded-full px-4 py-1.5 mb-4">
            Our Process
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground">
            How We Work
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-sm sm:text-base">
            A simple, transparent process from inquiry to delivery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: i * 0.1 }}
              className="relative bg-background rounded-2xl p-6 border border-border hover:shadow-card hover:border-gold/20 transition-all duration-500 group"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-3 w-6 border-t-2 border-dashed border-gold/30 z-10" />
              )}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center shadow-glow shrink-0">
                  <s.icon className="w-5 h-5 text-navy" />
                </div>
                <span className="text-gold/40 font-display text-3xl font-bold">{s.step}</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2 text-base">{s.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
