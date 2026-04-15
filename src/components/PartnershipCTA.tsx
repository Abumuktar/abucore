import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import meetingImg from "@/assets/meeting.jpg";

const ease = [0.16, 1, 0.3, 1] as const;

const PartnershipCTA = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="rounded-2xl overflow-hidden"
          >
            <img
              src={meetingImg}
              alt="Partnership meeting"
              className="w-full h-auto object-cover aspect-[16/10]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
          >
            <span className="text-gold text-xs tracking-[2px] uppercase font-semibold mb-4 block">
              Partner With Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-5">
              Let's Execute Your Next{" "}
              <span className="text-gold">Contract Together</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Whether you're a government agency seeking a reliable procurement partner or a private organization looking for a trusted contractor — Abucore is ready to deliver complete contract outcomes.
            </p>
            <ul className="space-y-2 mb-8">
              {["Competitive & transparent pricing", "End-to-end contract management", "On-time delivery guarantee", "Dedicated account management"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 gradient-gold text-navy px-7 py-3.5 font-semibold text-sm rounded-lg hover:shadow-glow transition-all duration-300 group"
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
