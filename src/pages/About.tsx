import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import founderImg from "@/assets/founder.png";

const ease = [0.16, 1, 0.3, 1] as const;

const values = [
  { title: "Integrity", desc: "We operate with transparency and honesty in every transaction." },
  { title: "Reliability", desc: "Timely delivery is not a promise — it's our standard." },
  { title: "Excellence", desc: "We hold ourselves to the highest professional standards." },
  { title: "Partnership", desc: "We build lasting relationships, not one-time transactions." },
];

const timeline = [
  { year: "2025", event: "Abucore Enterprises Limited founded in Katsina State with a vision to deliver reliable contracting services." },
  { year: "2025", event: "Secured first government supply contracts across multiple LGAs in Katsina State." },
  { year: "2026", event: "Expanded operations to cover 34+ LGAs with 10+ service categories and growing." },
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
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Abucore Enterprises Limited was founded in 2025 with a clear purpose — to become the most reliable general contracting and supply company serving government agencies and private organizations across Nigeria.
                </p>
                <p>
                  From stationery supply to civil works, we approach every contract with the same commitment: deliver on time, deliver quality, and build relationships that last beyond a single transaction.
                </p>
                <p>
                  Based in Katsina State, we have rapidly grown our operations to cover 34+ local government areas, delivering across 10+ service categories with a 100% delivery completion rate. Our growth is a testament to the trust our clients place in us.
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
            <span className="text-gold text-xs tracking-[2px] uppercase font-semibold mb-3 block">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">What Guides Us</h2>
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
                <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center mx-auto mb-4">
                  <span className="text-sm font-bold text-navy">{v.title[0]}</span>
                </div>
                <h4 className="font-bold text-foreground mb-2">{v.title}</h4>
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
            className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center"
          >
            Our Journey
          </motion.h2>
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-8">
              {timeline.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease, delay: i * 0.1 }}
                  className="flex gap-6 items-start relative"
                >
                  <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center shrink-0 text-xs font-bold text-navy z-10">
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
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
            >
              <span className="text-gold text-xs tracking-[2px] uppercase font-semibold mb-4 block">
                Leadership
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5">
                Meet the Founder
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Under the leadership of Abubakar Muktar, Abucore has quickly established itself as a recognized name in government contracting across Katsina State and beyond.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                A young entrepreneur with deep roots in Katsina and a vision to build a contracting company known across Nigeria for speed, professionalism, and unwavering reliability.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: 0.1 }}
            >
              <div className="rounded-2xl overflow-hidden bg-muted h-[360px] md:h-[420px] lg:h-[460px]">
                <img
                  src={founderImg}
                  alt="Abubakar Muktar"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="mt-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-navy">AM</span>
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Abubakar Muktar</h3>
                  <p className="text-muted-foreground text-sm">Founder & Managing Director</p>
                </div>
              </div>
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
