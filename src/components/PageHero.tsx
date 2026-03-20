import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

interface PageHeroProps {
  label: string;
  title: string;
  description?: string;
}

const PageHero = ({ label, title, description }: PageHeroProps) => {
  return (
    <section className="relative gradient-navy pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/3 rounded-full blur-3xl" />
      <div className="container relative z-10 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="text-gold text-xs tracking-[2px] uppercase font-semibold mb-4 block"
        >
          {label}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary-foreground max-w-3xl mx-auto leading-tight font-extrabold tracking-tight text-balance"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="text-primary-foreground/55 mt-5 max-w-lg mx-auto text-sm sm:text-base leading-relaxed"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default PageHero;
