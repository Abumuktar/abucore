import { motion } from "framer-motion";
import founderImg from "@/assets/founder.png";

const ease = [0.16, 1, 0.3, 1] as const;

const AboutPreview = () => {
  return (
    <section className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <span className="inline-flex items-center gap-2 text-gold text-xs tracking-[2px] uppercase font-semibold bg-gold/10 rounded-full px-4 py-1.5 mb-5">
              Our Story
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-6">
              Built on Trust.
              <br />
              <span className="text-gold">Driven by Reliability.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Abucore Enterprises Limited was founded with a clear purpose — to become the most reliable general contracting and supply company serving government agencies and private organizations across Nigeria.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              From stationery supply to civil works, we approach every contract with the same commitment: deliver on time, deliver quality, and build relationships that last.
            </p>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {[
                { num: "5+", label: "Years Active" },
                { num: "34+", label: "LGAs Served" },
                { num: "100%", label: "Completion" },
              ].map((s) => (
                <div key={s.label} className="text-center p-3 sm:p-4 rounded-xl bg-muted/50 border border-border">
                  <div className="font-display text-xl sm:text-2xl font-bold text-gold">{s.num}</div>
                  <div className="text-[10px] sm:text-[11px] text-muted-foreground uppercase tracking-wider mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
            className="relative"
          >
            {/* Founder card with proper image positioning */}
            <div className="relative rounded-3xl overflow-hidden shadow-elevated bg-muted">
              <div className="aspect-[3/4] relative">
                <img
                  src={founderImg}
                  alt="Abubakar Muktar — Founder & Managing Director"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="inline-flex items-center gap-2 bg-gold/20 backdrop-blur-sm rounded-full px-3 py-1 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span className="text-[10px] text-gold font-semibold uppercase tracking-wider">Founder</span>
                </div>
                <h3 className="text-primary-foreground text-xl sm:text-2xl font-display font-bold">
                  Abubakar Muktar
                </h3>
                <p className="text-gold text-sm font-medium mt-1">Managing Director</p>
                <p className="text-primary-foreground/60 text-sm leading-relaxed mt-3 max-w-sm">
                  An entrepreneur with deep roots in Katsina building a company known for speed and reliability.
                </p>
              </div>
            </div>
            {/* Decorative */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-gold/20 rounded-3xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gold/5 rounded-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
