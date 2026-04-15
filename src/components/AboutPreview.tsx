import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import founderImg from "@/assets/founder.png";

const ease = [0.16, 1, 0.3, 1] as const;

const AboutPreview = () => {
  return (
    <section className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="text-gold text-xs tracking-[2px] uppercase font-semibold mb-4 block">
              About Abucore
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6">
              Built on Trust.{" "}
              <span className="text-gold">Driven by Execution.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Abucore Enterprises Limited is a Nigerian-based general contracting and procurement execution company delivering reliable, end-to-end solutions for government agencies, institutions, and private organizations.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We specialize in executing contracts efficiently — from sourcing and procurement to logistics and final delivery — ensuring projects are completed on time, within scope, and to specification.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-gold text-sm font-semibold hover:gap-3 transition-all duration-300"
            >
              Learn More About Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden bg-muted h-[360px] md:h-[420px] lg:h-[460px]">
              <img
                src={founderImg}
                alt="Abubakar Muktar — Founder & Managing Director"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="mt-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-navy">AM</span>
              </div>
              <div>
                <h3 className="text-foreground font-bold">Abubakar Muktar</h3>
                <p className="text-muted-foreground text-sm">Founder & Managing Director</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
