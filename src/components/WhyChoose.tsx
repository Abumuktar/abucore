import { motion } from "framer-motion";
import { Shield, Clock, Handshake, MapPin } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const reasons = [
  { icon: Shield, title: "Trusted & Verified", desc: "Fully registered with CAC. Tax-compliant. Ready for government procurement." },
  { icon: Clock, title: "24hr Response Time", desc: "We respond to every inquiry within 24 hours — no delays, no excuses." },
  { icon: Handshake, title: "End-to-End Delivery", desc: "From procurement to doorstep delivery, we handle the entire process." },
  { icon: MapPin, title: "Nationwide Coverage", desc: "Operating across 34+ LGAs with logistics support across Nigeria." },
];

const WhyChoose = () => {
  return (
    <section className="py-24 md:py-32 bg-surface">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-gold text-xs tracking-[2px] uppercase font-body font-semibold">Why Abucore</span>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mt-3">
            Built Different. Built to Deliver.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 bg-navy mx-auto flex items-center justify-center mb-5">
                <r.icon className="w-6 h-6 text-gold" />
              </div>
              <h4 className="font-body font-semibold text-foreground mb-2">{r.title}</h4>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
