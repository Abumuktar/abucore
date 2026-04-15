import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const steps = [
  { step: "01", title: "Consultation", desc: "Understanding client needs, project scope, and delivery requirements." },
  { step: "02", title: "Quotation", desc: "Transparent and competitive pricing delivered within 24 hours." },
  { step: "03", title: "Execution", desc: "Procurement, packaging, vendor coordination, and quality control." },
  { step: "04", title: "Delivery", desc: "Timely delivery to specified location — on time, every time." },
];

const HowWeWork = () => {
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
          <span className="text-gold text-xs tracking-[2px] uppercase font-semibold mb-3 block">
            Our Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            How We Work
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl border border-border hover:shadow-card hover:border-gold/20 transition-all duration-500"
            >
              <div className="text-3xl font-extrabold text-gold mb-3">{s.step}</div>
              <h4 className="font-bold text-foreground mb-2">{s.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
