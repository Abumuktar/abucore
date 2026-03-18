import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import warehouseImg from "@/assets/supply-warehouse.jpg";
import logisticsImg from "@/assets/logistics.jpg";
import constructionImg from "@/assets/construction.jpg";

const ease = [0.16, 1, 0.3, 1] as const;

const services = [
  { title: "Stationery & Office Supply", desc: "Complete range of office supplies including paper, pens, files, folders, toners, and all stationery items needed by government offices and private organizations.", features: ["Bulk Orders", "Custom Packaging", "Fast Delivery"] },
  { title: "Furniture Supply", desc: "Quality office furniture including desks, chairs, shelving, filing cabinets, and custom furniture for institutions and government offices.", features: ["Office Desks", "Ergonomic Chairs", "Custom Solutions"] },
  { title: "Printing & Branding", desc: "Professional printing services including letterheads, ID cards, banners, brochures, branded materials, and large-format printing.", features: ["ID Cards", "Banners", "Brochures"] },
  { title: "Civil Works & Renovation", desc: "Building renovation, painting, plumbing, electrical work, and general construction projects for government and private facilities.", features: ["Renovations", "Construction", "Maintenance"] },
  { title: "Diesel & Fuel Supply", desc: "Reliable diesel and fuel supply for government vehicle fleets, generators, and organizational operations across all LGAs.", features: ["Bulk Diesel", "Generator Fuel", "Fleet Supply"] },
  { title: "Uniforms & Workwear", desc: "Custom-designed uniforms, safety gear, and workwear for schools, hospitals, security agencies, and corporate organizations.", features: ["School Uniforms", "Safety Gear", "Corporate Wear"] },
  { title: "Agricultural Inputs", desc: "Supply of seeds, fertilizers, herbicides, farming equipment, and other agricultural inputs for government farming programs.", features: ["Seeds", "Fertilizers", "Equipment"] },
  { title: "Medical Consumables", desc: "Medical supplies, consumables, and equipment for government hospitals, clinics, and healthcare facilities across the state.", features: ["PPE Supplies", "Lab Equipment", "Consumables"] },
];

const highlights = [
  { img: warehouseImg, title: "Warehousing & Inventory", desc: "Our warehouses are fully stocked with essential supplies, ensuring rapid fulfillment for urgent government orders." },
  { img: logisticsImg, title: "Logistics Fleet", desc: "A dedicated fleet of delivery vehicles covering all 34+ LGAs, ensuring last-mile delivery to any location." },
  { img: constructionImg, title: "On-Site Operations", desc: "Professional teams deployed for civil works, renovations, and construction projects across Katsina State." },
];

const Services = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <PageHero
        label="Our Services"
        title="What We Supply & Deliver"
        description="Comprehensive supply and contracting solutions tailored for government and private sector needs."
      />

      {/* Services grid */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.06 }}
                className="bg-background border border-border rounded-2xl p-6 sm:p-8 hover:shadow-card hover:border-gold/20 transition-all duration-500"
              >
                <h3 className="font-bold text-foreground text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {s.features.map((f) => (
                    <span key={f} className="text-[11px] font-medium text-gold bg-gold/10 rounded-full px-3 py-1">
                      {f}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Operations Highlights */}
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
              Operations
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              How We Deliver at Scale
            </h2>
          </motion.div>

          <div className="space-y-12">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center`}
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="rounded-2xl overflow-hidden">
                    <img src={h.img} alt={h.title} className="w-full h-auto object-cover aspect-[16/10]" />
                  </div>
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{h.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{h.desc}</p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-gold text-sm font-semibold hover:gap-3 transition-all duration-300"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </div>
  );
};

export default Services;
