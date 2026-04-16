import { motion } from "framer-motion";
import procurementImg from "@/assets/procurement_luxury.png";
import logisticsImg from "@/assets/logistics_fleet.png";
import constructionImg from "@/assets/construction_premium.png";

const ease = [0.16, 1, 0.3, 1] as const;

const projects = [
  { img: procurementImg, title: "Modern Procurement", desc: "Coordinating high-end office infrastructure and critical supplies for corporate and government institutions." },
  { img: logisticsImg, title: "Statewide Logistics", desc: "Maintaining a modern delivery fleet ensuring rapid, last-mile fulfillment across all LGAs." },
  { img: constructionImg, title: "Infrastructure Engineering", desc: "Executing building construction and facility renovations with precision and technical excellence." },
];

const ProjectsShowcase = () => {
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
          <span className="text-gold text-xs tracking-[2px] uppercase font-semibold mb-3 block">
            Project Capability
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Proven Results. <span className="text-gold">Real Execution.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: i * 0.1 }}
              className="group rounded-2xl overflow-hidden bg-background border border-border hover:border-gold/30 hover:shadow-elevated transition-all duration-500"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className="p-6">
                <h4 className="font-display font-bold text-foreground text-lg mb-2">{p.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;
