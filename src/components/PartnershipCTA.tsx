import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import meetingImg from "@/assets/meeting.jpg";

const ease = [0.16, 1, 0.3, 1] as const;

const PartnershipCTA = () => {
  return (
    <section className="py-20 md:py-28 bg-muted/50 overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="order-2 lg:order-1"
          >
            <div className="rounded-2xl overflow-hidden shadow-elevated">
              <img
                src={meetingImg}
                alt="Business partnership meeting"
                className="w-full h-auto object-cover aspect-[16/10]"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <span className="inline-flex items-center text-gold text-xs tracking-[2px] uppercase font-semibold bg-gold/10 rounded-full px-4 py-1.5 mb-5">
              Partner With Us
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground leading-tight mb-5">
              Let's Build Something{" "}
              <span className="text-gold">Together</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Whether you're a government agency looking for a reliable vendor, or a private company needing supply chain support — Abucore is your partner.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Vendor registration support",
                "Dedicated account management",
                "Flexible contract terms",
                "Priority response for partners",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                  <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 gradient-gold text-navy px-7 py-3.5 font-semibold text-sm rounded-xl hover:shadow-glow transition-all duration-300 group"
            >
              Start a Conversation
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PartnershipCTA;
