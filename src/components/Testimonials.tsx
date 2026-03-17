import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const testimonials = [
  {
    quote: "Abucore delivered our office supplies across 12 LGAs within the stipulated time. Their professionalism is unmatched.",
    name: "Ibrahim Bello",
    role: "Procurement Officer, State Ministry of Education",
    initials: "IB",
  },
  {
    quote: "We've worked with many contractors, but Abucore stands out for their consistency and reliability. They never miss a deadline.",
    name: "Fatima Abdullahi",
    role: "Admin Director, Federal Hospital",
    initials: "FA",
  },
  {
    quote: "From diesel supply to furniture procurement, Abucore handles everything seamlessly. A true one-stop solution.",
    name: "Yusuf Garba",
    role: "LGA Secretary, Katsina Central",
    initials: "YG",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 md:py-28 gradient-navy relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/3 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-gold text-xs tracking-[2px] uppercase font-semibold bg-gold/10 rounded-full px-4 py-1.5 mb-4">
            Testimonials
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary-foreground">
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
              className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-6 sm:p-8 hover:border-gold/20 transition-all duration-500"
            >
              <Quote className="w-8 h-8 text-gold/30 mb-4" />
              <p className="text-primary-foreground/80 text-sm leading-relaxed mb-6">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-primary-foreground/10">
                <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center">
                  <span className="text-xs font-bold text-navy">{t.initials}</span>
                </div>
                <div>
                  <p className="text-primary-foreground text-sm font-semibold">{t.name}</p>
                  <p className="text-primary-foreground/50 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
