import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

const AboutPreview = () => {
  return (
    <section className="py-24 md:py-32 bg-surface">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <span className="text-gold text-xs tracking-[2px] uppercase font-body font-semibold">Our Story</span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mt-3 mb-5 leading-tight">
              Built on Trust.<br />Driven by Reliability.
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed mb-4">
              Abucore Enterprises Limited was founded with a clear purpose — to become the most reliable general contracting and supply company serving government agencies and private organizations across Nigeria.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed">
              From stationery supply to civil works, we approach every contract with the same commitment: deliver on time, deliver quality, and build relationships that last beyond a single transaction.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
            className="bg-navy p-8 border-l-4 border-gold"
          >
            <div className="w-16 h-16 bg-gold flex items-center justify-center rounded-full mb-5">
              <span className="font-display text-2xl font-bold text-navy">AM</span>
            </div>
            <h3 className="text-primary-foreground text-lg font-body font-semibold mb-1">Abubakar Muktar</h3>
            <p className="text-gold text-sm font-body mb-4">Founder & Managing Director</p>
            <p className="text-primary-foreground/60 text-sm font-body leading-relaxed">
              An entrepreneur with deep roots in Katsina and a vision to build a contracting company known across Nigeria for speed, professionalism, and unwavering reliability. Under his leadership, Abucore is positioned to serve clients at every level of government and the private sector.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
