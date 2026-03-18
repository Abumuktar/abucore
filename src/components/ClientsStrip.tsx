import { motion } from "framer-motion";

const clients = [
  "Government Agencies",
  "State Ministries",
  "Healthcare Sector",
  "Private Companies",
  "Educational Institutions",
  "NGOs",
];

const ClientsStrip = () => {
  return (
    <section className="py-12 bg-muted/50 border-y border-border">
      <div className="container">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-muted-foreground uppercase tracking-[3px] font-medium mb-6"
        >
          Trusted by organizations across Nigeria
        </motion.p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {clients.map((c, i) => (
            <motion.span
              key={c}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-sm font-medium text-muted-foreground/70"
            >
              {c}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsStrip;
