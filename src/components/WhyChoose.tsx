import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const reasons = [
  { title: "Execution-Focused", desc: "We don't just supply — we deliver complete contract outcomes from sourcing to final delivery.", highlights: ["Full Lifecycle", "Contract Delivery", "Managed Execution"] },
  { title: "Reliable & Time-Bound", desc: "Strict timelines with a zero-failure execution mindset. Your deadlines are our priority.", highlights: ["On-Time Delivery", "Zero Delays", "100% Rate"] },
  { title: "Transparent Processes", desc: "Clear procurement, pricing, and delivery systems so you always know where things stand.", highlights: ["Clear Pricing", "Open Reporting", "Full Accountability"] },
  { title: "End-to-End Control", desc: "From sourcing to delivery — fully managed. We handle the entire value chain so you don't have to.", highlights: ["Vendor Management", "Quality Control", "Last Mile Delivery"] },
];

const WhyChoose = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-14"
        >
          <span className="text-gold text-xs tracking-[2px] uppercase font-semibold mb-3 block">
            Why Abucore
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            Built Different. <span className="text-gold">Built to Deliver.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: i * 0.08 }}
              className="bg-background rounded-2xl p-6 sm:p-8 border border-border hover:shadow-card hover:border-gold/20 transition-all duration-500"
            >
              <h4 className="font-bold text-foreground mb-2 text-lg">{r.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{r.desc}</p>
              <div className="flex flex-wrap gap-2">
                {r.highlights.map((h) => (
                  <span key={h} className="text-[11px] font-medium text-gold bg-gold/10 rounded-full px-3 py-1">
                    {h}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
