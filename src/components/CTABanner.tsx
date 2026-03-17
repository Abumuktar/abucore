import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTABanner = () => {
  return (
    <section className="bg-navy relative overflow-hidden">
      <div
        className="absolute top-0 left-0 w-64 h-64 bg-gold/5"
        style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
      />
      <div className="container py-20 md:py-28 relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-3xl md:text-4xl text-primary-foreground mb-4"
        >
          Ready to Work With <span className="text-gold">Abucore?</span>
        </motion.h2>
        <p className="text-primary-foreground/60 font-body max-w-md mx-auto mb-8">
          Whether you need a quote, want to register us as a vendor, or simply have questions — we're here.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/contact"
            className="bg-gold text-navy px-7 py-3.5 font-bold text-sm font-body hover:bg-gold-light transition-colors duration-200"
          >
            Request a Quote
          </Link>
          <Link
            to="/contact"
            className="border border-primary-foreground/30 text-primary-foreground px-7 py-3.5 font-semibold text-sm font-body hover:bg-primary-foreground hover:text-navy transition-colors duration-200"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
