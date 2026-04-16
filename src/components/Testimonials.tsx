import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const testimonials = [
  {
    quote: "Abucore delivered our office supplies across 12 LGAs within the stipulated time. Their professionalism is unmatched.",
    name: "Ibrahim Bello",
    role: "Procurement Officer, State Ministry of Education",
  },
  {
    quote: "We've worked with many contractors, but Abucore stands out for their consistency and reliability. They never miss a deadline.",
    name: "Fatima Abdullahi",
    role: "Admin Director, Federal Hospital",
  },
  {
    quote: "From diesel supply to furniture procurement, Abucore handles everything seamlessly. A true one-stop solution.",
    name: "Yusuf Garba",
    role: "LGA Secretary, Katsina Central",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-14"
        >
          <span className="text-gold text-xs tracking-[2px] uppercase font-semibold mb-3 block">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            What Our Clients Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: i * 0.1 }}
              className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-6 sm:p-8"
            >
              <p className="text-primary-foreground/80 text-sm leading-relaxed mb-6">
                "{t.quote}"
              </p>
              <div className="pt-4 border-t border-primary-foreground/10">
                <p className="text-primary-foreground text-sm font-semibold">{t.name}</p>
                <p className="text-primary-foreground/50 text-xs mt-0.5">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
