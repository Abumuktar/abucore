import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const values = [
  { title: "Integrity", desc: "We operate with transparency and honesty in every transaction." },
  { title: "Reliability", desc: "Timely delivery is not a promise — it's our standard." },
  { title: "Excellence", desc: "We hold ourselves to the highest professional standards." },
  { title: "Partnership", desc: "We build lasting relationships, not one-time transactions." },
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

      {/* Page Hero */}
      <section className="bg-navy py-20 md:py-28">
        <div className="container">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gold text-xs tracking-[2px] uppercase font-body font-semibold"
          >
            About Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="font-display text-4xl md:text-5xl text-primary-foreground mt-3 max-w-xl"
          >
            The Company Behind the Contracts
          </motion.h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-background">
        <div className="container max-w-3xl">
          <h2 className="font-display text-3xl text-foreground mb-6">Our Story</h2>
          <p className="text-muted-foreground font-body leading-relaxed mb-4">
            Abucore Enterprises Limited was founded with a clear purpose — to become the most reliable general contracting and supply company serving government agencies and private organizations across Nigeria.
          </p>
          <p className="text-muted-foreground font-body leading-relaxed mb-4">
            From stationery supply to civil works, we approach every contract with the same commitment: deliver on time, deliver quality, and build relationships that last beyond a single transaction.
          </p>
          <p className="text-muted-foreground font-body leading-relaxed">
            Based in Katsina State, we have steadily grown our operations to cover 34+ local government areas, delivering across 10+ service categories with a 100% delivery completion rate.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-surface">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-gold text-xs tracking-[2px] uppercase font-body font-semibold">Our Values</span>
            <h2 className="font-display text-3xl text-foreground mt-3">What Guides Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease, delay: i * 0.1 }}
                className="bg-background p-6 border-b-[3px] border-gold"
              >
                <h4 className="font-body font-semibold text-foreground mb-2">{v.title}</h4>
                <p className="text-sm text-muted-foreground font-body">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-background">
        <div className="container max-w-2xl">
          <h2 className="font-display text-3xl text-foreground mb-12 text-center">Our Journey</h2>
          <div className="space-y-8">
            {timeline.map((t, i) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease, delay: i * 0.1 }}
                className="flex gap-6 items-start"
              >
                <span className="bg-navy text-gold font-body font-bold text-sm px-3 py-1.5 shrink-0">{t.year}</span>
                <p className="text-muted-foreground font-body leading-relaxed pt-0.5">{t.event}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-24 bg-surface">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-gold text-xs tracking-[2px] uppercase font-body font-semibold">Leadership</span>
              <h2 className="font-display text-3xl text-foreground mt-3 mb-5">Meet the Founder</h2>
              <p className="text-muted-foreground font-body leading-relaxed">
                Under the leadership of Abubakar Muktar, Abucore has grown from a local supply company into a recognized name in government contracting across Katsina State and beyond.
              </p>
            </div>
            <div className="bg-navy p-8 border-l-4 border-gold">
              <div className="w-16 h-16 bg-gold flex items-center justify-center rounded-full mb-5">
                <span className="font-display text-2xl font-bold text-navy">AM</span>
              </div>
              <h3 className="text-primary-foreground text-lg font-body font-semibold mb-1">Abubakar Muktar</h3>
              <p className="text-gold text-sm font-body mb-4">Founder & Managing Director</p>
              <p className="text-primary-foreground/60 text-sm font-body leading-relaxed">
                An entrepreneur with deep roots in Katsina and a vision to build a contracting company known across Nigeria for speed, professionalism, and unwavering reliability.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </div>
  );
};

export default About;
