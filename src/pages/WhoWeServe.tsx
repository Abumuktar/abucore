import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import { motion } from "framer-motion";
import { Building2, Landmark, School, HeartPulse, Globe, Briefcase, Users } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const clients = [
  { icon: Landmark, title: "Federal MDAs", desc: "Ministries, Departments, and Agencies at the federal level requiring supply and procurement partners." },
  { icon: Building2, title: "State Government Ministries", desc: "State-level ministries and parastatals across Nigeria, with a strong presence in Katsina State." },
  { icon: Users, title: "LGA Secretariats", desc: "Local Government Area secretariats and offices across 34+ LGAs in Katsina and neighboring states." },
  { icon: School, title: "SUBEB & Education Sector", desc: "State Universal Basic Education Boards and educational institutions requiring supplies and infrastructure." },
  { icon: HeartPulse, title: "Hospitals & Health Sector", desc: "Government hospitals, primary health centres, and healthcare facilities needing medical consumables." },
  { icon: Briefcase, title: "Private Corporations", desc: "Private companies and businesses seeking reliable supply chain and contracting partners." },
  { icon: Globe, title: "NGOs & International Orgs", desc: "Non-governmental and international organizations operating development programs in Northern Nigeria." },
];

const WhoWeServe = () => {
  return (
    <div className="min-h-screen">
      <Header />

      <section className="bg-navy py-20 md:py-28">
        <div className="container">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gold text-xs tracking-[2px] uppercase font-body font-semibold">
            Our Clients
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="font-display text-4xl md:text-5xl text-primary-foreground mt-3 max-w-xl"
          >
            Who We Serve
          </motion.h1>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease, delay: i * 0.08 }}
                className="p-6 bg-surface border-b-[3px] border-gold"
              >
                <div className="w-12 h-12 bg-navy flex items-center justify-center mb-4">
                  <c.icon className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-body font-semibold text-foreground mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{c.desc}</p>
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

export default WhoWeServe;
