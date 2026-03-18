import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const CTABanner = () => {
  return (
    <section className="py-20 gradient-navy">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-primary-foreground/60 mb-8 max-w-md mx-auto">
            Get a free quote today and experience reliable, professional contracting services.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 gradient-gold text-navy px-8 py-4 font-semibold text-sm rounded-lg hover:shadow-glow transition-all duration-300 group"
            >
              Request a Quote
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 bg-primary-foreground/10 text-primary-foreground px-8 py-4 font-semibold text-sm rounded-lg border border-primary-foreground/20 hover:bg-primary-foreground/15 transition-all duration-300"
            >
              Explore Services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;
