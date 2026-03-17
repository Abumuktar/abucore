import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Play, Shield, Truck, Building2 } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const ease = [0.16, 1, 0.3, 1] as const;

const stats = [
  { value: 34, suffix: "+", label: "LGAs Covered" },
  { value: 10, suffix: "+", label: "Service Categories" },
  { value: 100, suffix: "%", label: "Delivery Rate" },
  { value: 24, suffix: "hr", label: "Response Time" },
];

const CountUp = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 2000;
          const step = (ts: number) => {
            if (!start) start = ts;
            const p = Math.min((ts - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setCount(Math.floor(eased * value));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const highlights = [
  { icon: Shield, text: "Verified & Certified" },
  { icon: Truck, text: "Nationwide Delivery" },
  { icon: Building2, text: "Gov. Approved" },
];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/40" />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary-foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary-foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container relative z-10 pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="inline-flex items-center gap-2 bg-primary-foreground/[0.06] border border-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-primary-foreground/70 text-xs font-medium tracking-wide">
                Supply · Logistics · General Contracting
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-7xl text-primary-foreground leading-[1.08] mb-6 text-balance"
            >
              Your Trusted Partner
              <br />
              for <span className="text-gold">Every Contract</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.2 }}
              className="text-primary-foreground/55 text-base sm:text-lg max-w-lg mb-8 leading-relaxed"
            >
              Abucore Enterprises delivers reliable supply, logistics, and
              general contracting services to government agencies and private
              organizations across Nigeria.
            </motion.p>

            {/* Highlight chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.25 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              {highlights.map((h) => (
                <div
                  key={h.text}
                  className="inline-flex items-center gap-2 text-primary-foreground/60 text-xs font-medium"
                >
                  <h.icon className="w-3.5 h-3.5 text-gold" />
                  {h.text}
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 gradient-gold text-navy px-7 py-3.5 font-semibold text-sm rounded-xl hover:shadow-glow transition-all duration-300 group"
              >
                Request a Quote
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 bg-primary-foreground/[0.08] backdrop-blur-sm text-primary-foreground px-7 py-3.5 font-semibold text-sm rounded-xl border border-primary-foreground/15 hover:bg-primary-foreground/[0.12] transition-all duration-300"
              >
                <Play className="w-4 h-4" />
                View Our Services
              </Link>
            </motion.div>
          </div>

          {/* Right side — floating stat cards (desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease, delay: 0.4 }}
            className="hidden lg:grid grid-cols-2 gap-3 w-[280px]"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.5 + i * 0.1 }}
                className="bg-primary-foreground/[0.06] backdrop-blur-md border border-primary-foreground/10 rounded-2xl p-5 text-center hover:bg-primary-foreground/[0.1] transition-colors duration-300"
              >
                <div className="font-display text-2xl text-gold font-bold mb-1">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-primary-foreground/45 text-[10px] uppercase tracking-[1.5px] font-medium leading-tight">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile stats — horizontal scroll */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-14 lg:hidden"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-primary-foreground/[0.06] backdrop-blur-sm border border-primary-foreground/10 rounded-xl p-4 text-center"
            >
              <div className="font-display text-2xl sm:text-3xl text-gold font-bold mb-0.5">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-primary-foreground/45 text-[10px] uppercase tracking-[1.5px] font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
