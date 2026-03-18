import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const clients = [
  { title: "Federal MDAs", desc: "Ministries, Departments, and Agencies at the federal level requiring supply and procurement partners.", tags: ["Federal Government", "MDAs"] },
  { title: "State Government Ministries", desc: "State-level ministries and parastatals across Nigeria, with a strong presence in Katsina State.", tags: ["State Level", "Katsina"] },
  { title: "LGA Secretariats", desc: "Local Government Area secretariats and offices across 34+ LGAs in Katsina and neighboring states.", tags: ["34+ LGAs", "Local Govt"] },
  { title: "SUBEB & Education Sector", desc: "State Universal Basic Education Boards and educational institutions requiring supplies and infrastructure.", tags: ["Education", "SUBEB"] },
  { title: "Hospitals & Health Sector", desc: "Government hospitals, primary health centres, and healthcare facilities needing medical consumables.", tags: ["Healthcare", "PHCs"] },
  { title: "Private Corporations", desc: "Private companies and businesses seeking reliable supply chain and contracting partners.", tags: ["Corporate", "Private"] },
  { title: "NGOs & International Orgs", desc: "Non-governmental and international organizations operating development programs in Northern Nigeria.", tags: ["NGOs", "Development"] },
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
