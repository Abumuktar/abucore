import { motion } from "framer-motion";
import { Shield, Clock, Handshake, MapPin, CheckCircle2 } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const reasons = [
  { icon: Shield, title: "Trusted & Verified", desc: "Fully registered with CAC. Tax-compliant. Ready for government procurement.", highlights: ["CAC Registered", "Tax Compliant", "Verified Vendor"] },
  { icon: Clock, title: "24hr Response Time", desc: "We respond to every inquiry within 24 hours — no delays, no excuses.", highlights: ["Fast Turnaround", "Dedicated Support", "Always Available"] },
  { icon: Handshake, title: "End-to-End Delivery", desc: "From procurement to doorstep delivery, we handle the entire process.", highlights: ["Full Logistics", "Quality Control", "On-Time Delivery"] },
  { icon: MapPin, title: "Nationwide Coverage", desc: "Operating across 34+ LGAs with logistics support across Nigeria.", highlights: ["34+ LGAs", "Cross-State", "Last Mile Delivery"] },
];

const WhyChoose = () => {
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
          <span className="inline-flex items-center gap-2 text-gold text-xs tracking-[2px] uppercase font-semibold bg-gold/10 rounded-full px-4 py-1.5 mb-4">
            Why Abucore
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground">
            Built Different. Built to Deliver.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: i * 0.1 }}
              className="bg-background rounded-2xl p-6 sm:p-8 border border-border hover:shadow-card hover:border-gold/20 transition-all duration-500 group"
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl gradient-navy flex items-center justify-center shrink-0 shadow-soft">
                  <r.icon className="w-6 h-6 text-gold" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-2 text-lg">{r.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{r.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {r.highlights.map((h) => (
                      <span key={h} className="inline-flex items-center gap-1 text-[11px] font-medium text-gold bg-gold/10 rounded-full px-3 py-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
