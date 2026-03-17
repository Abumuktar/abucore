import { motion } from "framer-motion";
import warehouseImg from "@/assets/supply-warehouse.jpg";
import logisticsImg from "@/assets/logistics.jpg";
import constructionImg from "@/assets/construction.jpg";

const ease = [0.16, 1, 0.3, 1] as const;

const projects = [
  { img: warehouseImg, title: "Supply & Inventory", desc: "Fully stocked warehouses ensuring rapid order fulfillment across all service categories." },
  { img: logisticsImg, title: "Logistics & Delivery", desc: "Dedicated fleet operations covering 34+ LGAs with on-time delivery guarantee." },
  { img: constructionImg, title: "Civil Works", desc: "Building renovations and construction projects for government and private facilities." },
];

const ProjectsShowcase = () => {
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
          <span className="inline-flex items-center text-gold text-xs tracking-[2px] uppercase font-semibold bg-gold/10 rounded-full px-4 py-1.5 mb-4">
            What We Do
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground">
            Our Capabilities
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-sm sm:text-base">
            From procurement to last-mile delivery, see how we operate at scale.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: i * 0.1 }}
              className="group rounded-2xl overflow-hidden border border-border hover:shadow-elevated transition-all duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{p.title}</h3>
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
