import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import warehouseImg from "@/assets/supply-warehouse.jpg";
import logisticsImg from "@/assets/logistics.jpg";
import constructionImg from "@/assets/construction.jpg";
import meetingImg from "@/assets/meeting.jpg";

const ease = [0.16, 1, 0.3, 1] as const;

const services = [
  { img: warehouseImg, title: "Supply & Procurement", desc: "Complete supply solutions — stationery, furniture, uniforms, medical consumables, and agricultural inputs for government and private organizations." },
  { img: logisticsImg, title: "Logistics & Delivery", desc: "Reliable logistics fleet covering 34+ LGAs with last-mile delivery to every location across Katsina State and beyond." },
  { img: constructionImg, title: "Civil Works & Construction", desc: "Building renovation, construction, maintenance, and infrastructure projects for government facilities and private developments." },
  { img: meetingImg, title: "Consulting & Partnerships", desc: "Strategic partnerships with government agencies and private corporations for procurement planning and vendor management." },
];

const ServicesGrid = () => {
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
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            What We Supply & Deliver
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-sm sm:text-base">
            From stationery to civil works, we provide end-to-end supply and contracting solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: i * 0.08 }}
              className="group rounded-2xl overflow-hidden border border-border hover:shadow-card transition-all duration-500"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <h4 className="text-lg font-bold text-foreground mb-2">{service.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-gold text-sm font-semibold hover:gap-3 transition-all duration-300"
          >
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;
