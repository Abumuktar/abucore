import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const CTABanner = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="relative gradient-navy rounded-3xl p-8 sm:p-12 md:p-16 overflow-hidden"
        >
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/5 rounded-full blur-2xl" />
          <div className="absolute top-8 right-8 opacity-10">
            <Sparkles className="w-24 h-24 text-gold" />
          </div>

          <div className="relative z-10 max-w-2xl">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-primary-foreground mb-4 leading-tight">
              Ready to Work With{" "}
              <span className="text-gold italic">Abucore?</span>
            </h2>
            <p className="text-primary-foreground/60 mb-8 max-w-lg text-sm sm:text-base leading-relaxed">
              Whether you need a quote, want to register us as a vendor, or simply have questions — we're ready to deliver.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 gradient-gold text-navy px-8 py-4 font-semibold text-sm rounded-xl hover:shadow-glow transition-all duration-300 group"
              >
                Request a Quote
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-primary-foreground/10 text-primary-foreground px-8 py-4 font-semibold text-sm rounded-xl border border-primary-foreground/20 hover:bg-primary-foreground/15 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;
