import { motion } from "framer-motion";
import warehouseImg from "@/assets/supply-warehouse.jpg";
import logisticsImg from "@/assets/logistics.jpg";
import constructionImg from "@/assets/construction.jpg";

const ease = [0.16, 1, 0.3, 1] as const;

const projects = [
  { img: warehouseImg, title: "Procurement & Supply", desc: "End-to-end procurement — from vendor sourcing to inventory coordination and quality control." },
  { img: logisticsImg, title: "Logistics & Delivery", desc: "Dedicated logistics network covering 34+ LGAs with last-mile delivery to any location." },
  { img: constructionImg, title: "Civil Works & Infrastructure", desc: "Building construction, renovation, maintenance, and facility upgrades across Katsina State." },
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
            Our Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            What We Bring to the Table
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
              className="group rounded-2xl overflow-hidden bg-background border border-border hover:shadow-card transition-all duration-500"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-5">
                <h4 className="font-bold text-foreground mb-1.5">{p.title}</h4>
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
