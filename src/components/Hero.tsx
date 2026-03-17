import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ease = [0.16, 1, 0.3, 1];

const stats = [
  { value: "34+", label: "LGAs Covered" },
  { value: "10+", label: "Service Categories" },
  { value: "100%", label: "Delivery Rate" },
  { value: "24hr", label: "Response Time" },
];

const CountUp = ({ value }: { value: string }) => {
  const num = parseInt(value);
  const suffix = value.replace(/[\d]/g, "");
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (isNaN(num)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1500;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            setCount(Math.floor(progress * num));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [num]);

  if (isNaN(num)) return <span>{value}</span>;

  return <span ref={ref}>{count}{suffix}</span>;
};

const Hero = () => {
  return (
    <section className="bg-navy relative overflow-hidden">
      {/* Decorative hexagon */}
      <div
        className="absolute -top-20 -right-20 w-80 h-80 bg-gold/5"
        style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
      />

      <div className="container py-24 md:py-32 lg:py-40 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="inline-block border border-gold/40 bg-gold/10 px-4 py-1.5 mb-6"
        >
          <span className="text-gold text-xs tracking-[2px] uppercase font-body font-semibold">
            Supply · Logistics · General Contracting
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.15 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl text-primary-foreground leading-[1.1] max-w-2xl mb-6"
        >
          Your Trusted Partner
          <br />
          for <span className="text-gold">Every Contract</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.3 }}
          className="text-primary-foreground/60 text-base md:text-lg max-w-lg mb-10 leading-relaxed font-body"
        >
          Abucore Enterprises Limited delivers reliable supply, logistics, and general contracting services to government agencies and private sector organizations nationwide.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.45 }}
          className="flex flex-wrap gap-4"
        >
          <Link
            to="/contact"
            className="bg-gold text-navy px-7 py-3.5 font-bold text-sm font-body hover:bg-gold-light transition-colors duration-200"
          >
            Request a Quote
          </Link>
          <Link
            to="/services"
            className="border border-primary-foreground/30 text-primary-foreground px-7 py-3.5 font-semibold text-sm font-body hover:bg-primary-foreground hover:text-navy transition-colors duration-200"
          >
            View Our Services
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.6 }}
          className="flex flex-wrap gap-10 md:gap-16 mt-16 pt-8 border-t border-primary-foreground/10"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-3xl md:text-4xl text-gold font-bold">
                <CountUp value={stat.value} />
              </div>
              <div className="text-primary-foreground/50 text-xs uppercase tracking-[1px] mt-1 font-body">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
