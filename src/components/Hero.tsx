import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const ease = [0.16, 1, 0.3, 1] as const;

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-navy/30" />
      </div>

      <div className="container relative z-10 pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/15 backdrop-blur-sm rounded-full px-4 py-2 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-primary-foreground/80 text-xs font-medium tracking-wide">
              Supply · Logistics · General Contracting
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.75rem] text-primary-foreground leading-[1.1] mb-6 font-extrabold tracking-tight"
          >
            Your Trusted Partner
            <br />
            for <span className="text-gold">Every Contract</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="text-primary-foreground/60 text-base sm:text-lg max-w-lg mb-10 leading-relaxed"
          >
            Abucore Enterprises delivers reliable supply, logistics, and
            general contracting services to government agencies and private
            organizations across Nigeria.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 gradient-gold text-navy px-7 py-3.5 font-semibold text-sm rounded-lg hover:shadow-glow transition-all duration-300 group"
            >
              Request a Quote
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground px-7 py-3.5 font-semibold text-sm rounded-lg border border-primary-foreground/20 hover:bg-primary-foreground/15 transition-all duration-300"
            >
              View Our Services
            </Link>
          </motion.div>

          {/* Simple inline stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease, delay: 0.5 }}
            className="flex flex-wrap gap-8 mt-14 pt-8 border-t border-primary-foreground/10"
          >
            {[
              { value: "34+", label: "LGAs Covered" },
              { value: "10+", label: "Service Categories" },
              { value: "100%", label: "Delivery Rate" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl sm:text-3xl font-bold text-gold">{stat.value}</div>
                <div className="text-primary-foreground/50 text-xs mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
