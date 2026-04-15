import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const clients = [
  { title: "Government Agencies", desc: "Federal, State, and Local Government agencies requiring reliable procurement and supply chain partners for contract execution.", tags: ["Federal", "State", "LGA"] },
  { title: "Ministries & Departments", desc: "State-level ministries, departments, and parastatals across Nigeria, with a strong presence in Katsina State.", tags: ["MDAs", "Parastatals"] },
  { title: "Healthcare Institutions", desc: "Government hospitals, primary health centres, and healthcare facilities needing medical consumables and equipment.", tags: ["Hospitals", "PHCs", "Medical"] },
  { title: "Educational Institutions", desc: "State Universal Basic Education Boards, schools, and educational institutions requiring supplies and infrastructure.", tags: ["SUBEB", "Schools", "Education"] },
  { title: "NGOs & Development Orgs", desc: "Non-governmental and international development organizations operating programs across Northern Nigeria.", tags: ["NGOs", "Development", "International"] },
  { title: "Private Sector Companies", desc: "Private companies and businesses seeking reliable supply chain, procurement, and general contracting partners.", tags: ["Corporate", "Private", "Business"] },
];

const WhoWeServe = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <PageHero
        label="Our Clients"
        title="Who We Serve"
        description="Trusted by government agencies, private corporations, and international organizations across Nigeria."
      />

      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {clients.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.06 }}
                className="bg-background border border-border rounded-2xl p-6 sm:p-8 hover:shadow-card hover:border-gold/20 transition-all duration-500"
              >
                <h3 className="font-bold text-foreground text-lg mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{c.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {c.tags.map((tag) => (
                    <span key={tag} className="text-[11px] font-medium text-gold bg-gold/10 rounded-full px-3 py-1">
                      {tag}
                    </span>
                  ))}
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

export default WhoWeServe;
