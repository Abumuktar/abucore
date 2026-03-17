import { motion } from "framer-motion";
import { Building2, Landmark, HeartPulse, Briefcase } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const clients = [
  { icon: Landmark, name: "Government Agencies" },
  { icon: Building2, name: "State Ministries" },
  { icon: HeartPulse, name: "Healthcare Sector" },
  { icon: Briefcase, name: "Private Companies" },
];

const ClientsStrip = () => {
  return (
    <section className="py-16 bg-muted/50 border-y border-border">
      <div className="container">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-muted-foreground uppercase tracking-[3px] font-medium mb-8"
        >
          Trusted by organizations across Nigeria
        </motion.p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {clients.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-center justify-center gap-3 text-muted-foreground/70 hover:text-foreground transition-colors duration-300"
            >
              <c.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{c.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsStrip;
