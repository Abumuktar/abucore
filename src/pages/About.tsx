import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { Target, Eye, Heart, Zap } from "lucide-react";
import founderImg from "@/assets/founder.png";

const ease = [0.16, 1, 0.3, 1] as const;

const values = [
  { icon: Heart, title: "Integrity", desc: "We operate with transparency and honesty in every transaction." },
  { icon: Target, title: "Reliability", desc: "Timely delivery is not a promise — it's our standard." },
  { icon: Zap, title: "Excellence", desc: "We hold ourselves to the highest professional standards." },
  { icon: Eye, title: "Partnership", desc: "We build lasting relationships, not one-time transactions." },
];

const timeline = [
  { year: "2020", event: "Abucore Enterprises Limited founded in Katsina State." },
  { year: "2021", event: "Secured first government supply contracts across multiple LGAs." },
  { year: "2023", event: "Expanded services to include civil works and fuel supply." },
  { year: "2025", event: "Operating across 34+ LGAs with 10+ service categories." },
];

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <PageHero
        label="About Us"
        title="The Company Behind the Contracts"
        description="Learn about our mission, values, and the people driving Abucore forward."
      />

      {/* Story */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-8">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Abucore Enterprises Limited was founded with a clear purpose — to become the most reliable general contracting and supply company serving government agencies and private organizations across Nigeria.
                </p>
                <p>
                  From stationery supply to civil works, we approach every contract with the same commitment: deliver on time, deliver quality, and build relationships that last beyond a single transaction.
                </p>
                <p>
                  Based in Katsina State, we have steadily grown our operations to cover 34+ local government areas, delivering across 10+ service categories with a 100% delivery completion rate.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-muted/50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center text-gold text-xs tracking-[2px] uppercase font-semibold bg-gold/10 rounded-full px-4 py-1.5 mb-4">
              Our Values
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground">What Guides Us</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.08 }}
                className="bg-background rounded-2xl p-6 border border-border hover:shadow-card hover:border-gold/20 transition-all duration-500 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-5 h-5 text-gold" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{v.title}</h4>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container max-w-2xl">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl text-foreground mb-12 text-center"
          >
            Our Journey
          </motion.h2>
          <div className="relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border" />
            <div className="space-y-8">
              {timeline.map((t, i) => (
                <motion.div
                  key={t.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease, delay: i * 0.1 }}
                  className="flex gap-6 items-start relative"
                >
                  <div className="w-10 h-10 rounded-xl gradient-gold flex items-center justify-center shrink-0 text-xs font-bold text-navy shadow-glow z-10">
                    {t.year.slice(-2)}
                  </div>
                  <div className="bg-background border border-border rounded-xl p-5 flex-1 hover:shadow-card transition-shadow">
                    <span className="text-gold text-xs font-semibold">{t.year}</span>
                    <p className="text-muted-foreground text-sm mt-1">{t.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-20 md:py-28 bg-muted/50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
            >
              <span className="inline-flex items-center text-gold text-xs tracking-[2px] uppercase font-semibold bg-gold/10 rounded-full px-4 py-1.5 mb-5">
                Leadership
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-5">
                Meet the <span className="text-gold italic">Founder</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Under the leadership of Abubakar Muktar, Abucore has grown from a local supply company into a recognized name in government contracting across Katsina State and beyond.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                An entrepreneur with deep roots in Katsina and a vision to build a contracting company known across Nigeria for speed, professionalism, and unwavering reliability.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.15 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-elevated bg-muted">
                <div className="aspect-[3/4] relative">
                  <img
                    src={founderImg}
                    alt="Abubakar Muktar"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent rounded-3xl" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <h3 className="text-primary-foreground text-xl font-display font-bold">
                    Abubakar Muktar
                  </h3>
                  <p className="text-gold text-sm font-medium mt-1">Founder & Managing Director</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-gold/20 rounded-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </div>
  );
};

export default About;
