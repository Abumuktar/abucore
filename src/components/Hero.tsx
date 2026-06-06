import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Download } from "lucide-react";
import heroBg from "@/assets/real_contracting.png";

const ease = [0.16, 1, 0.3, 1] as const;

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-navy">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-80" />
        {/* Dynamic overlay with radial center light */}
        <div className="absolute inset-0 bg-navy/85 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-navy/85 to-navy" />
      </div>

      <div className="container relative z-10 py-24 md:py-32 lg:py-40">
        <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="inline-flex items-center gap-2 bg-primary-foreground/8 border border-primary-foreground/12 backdrop-blur-sm rounded-full px-5 py-2 mb-6 md:mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-primary-foreground/70 text-xs font-medium tracking-widest">
              ABUCORE ENTERPRISES LIMITED
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.25rem] text-primary-foreground leading-[1.05] mb-5 md:mb-7 font-display font-extrabold tracking-tight text-balance drop-shadow-sm"
          >
            Reliable Procurement.{" "}
            <span className="text-gold brightness-110 drop-shadow-[0_2px_10px_rgba(234,179,8,0.2)]">Precision Execution.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="text-primary-foreground/70 text-sm sm:text-base md:text-lg lg:text-xl max-w-md sm:max-w-lg md:max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed font-medium"
          >
            Streamlining procurement, logistics, and infrastructure projects 
            across Nigeria with transparency and excellence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center"
          >
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 gradient-gold text-navy px-8 py-3.5 md:px-10 md:py-4 font-semibold text-sm md:text-base rounded-lg hover:shadow-glow active:scale-[0.97] transition-all duration-300 group"
            >
              Request a Quote
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="tel:+2349138266715"
              className="inline-flex items-center justify-center gap-2 bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground px-8 py-3.5 md:px-10 md:py-4 font-semibold text-sm md:text-base rounded-lg border border-primary-foreground/15 hover:bg-primary-foreground/15 active:scale-[0.97] transition-all duration-300"
            >
              <Phone className="w-4 h-4 md:w-5 md:h-5" />
              Call Us Today
            </a>
            <a
              href="/Abucore-Company-Profile.pdf"
              download
              className="inline-flex items-center justify-center gap-2 bg-transparent text-primary-foreground/80 px-8 py-3.5 md:px-10 md:py-4 font-semibold text-sm md:text-base rounded-lg border border-primary-foreground/15 hover:text-primary-foreground hover:bg-primary-foreground/5 active:scale-[0.97] transition-all duration-300"
            >
              <Download className="w-4 h-4 md:w-5 md:h-5" />
              Download Profile
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-8 sm:gap-12 md:gap-16 mt-14 md:mt-20 pt-10 border-t border-primary-foreground/5"
          >
            {[
              { value: "34+", label: "LGAs Across Nigeria" },
              { value: "10+", label: "Service Categories" },
              { value: "100%", label: "Delivery Commitment" },
            ].map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gold transition-transform duration-300 group-hover:scale-110">{stat.value}</div>
                <div className="text-primary-foreground/40 text-[10px] sm:text-xs uppercase tracking-[2px] mt-2 font-semibold">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
