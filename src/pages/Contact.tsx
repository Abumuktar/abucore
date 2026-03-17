import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ease = [0.16, 1, 0.3, 1] as const;

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message Sent", description: "Thank you! We'll respond within 24 hours." });
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen">
      <Header />

      <section className="bg-navy py-20 md:py-28">
        <div className="container">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gold text-xs tracking-[2px] uppercase font-body font-semibold">
            Get in Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="font-display text-4xl md:text-5xl text-primary-foreground mt-3 max-w-xl"
          >
            Contact Abucore
          </motion.h1>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease }}
            >
              <h2 className="font-display text-2xl text-foreground mb-6">Request a Quote</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-xs uppercase tracking-[1px] text-muted-foreground font-body font-semibold mb-1.5 block">Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-border bg-background px-4 py-3 text-sm font-body text-foreground focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs uppercase tracking-[1px] text-muted-foreground font-body font-semibold mb-1.5 block">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-border bg-background px-4 py-3 text-sm font-body text-foreground focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-[1px] text-muted-foreground font-body font-semibold mb-1.5 block">Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full border border-border bg-background px-4 py-3 text-sm font-body text-foreground focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[1px] text-muted-foreground font-body font-semibold mb-1.5 block">Message</label>
                  <textarea
                    rows={5}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-border bg-background px-4 py-3 text-sm font-body text-foreground focus:outline-none focus:border-gold transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gold text-navy px-7 py-3.5 font-bold text-sm font-body hover:bg-gold-light transition-colors duration-200 w-full md:w-auto"
                >
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.15 }}
              className="space-y-8"
            >
              <h2 className="font-display text-2xl text-foreground mb-6">Contact Information</h2>

              <div className="flex gap-4 items-start">
                <div className="w-11 h-11 bg-navy flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="font-body font-semibold text-foreground text-sm mb-1">Phone / WhatsApp</h4>
                  <p className="text-muted-foreground font-body text-sm">07079462587</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-11 h-11 bg-navy flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="font-body font-semibold text-foreground text-sm mb-1">Email</h4>
                  <p className="text-muted-foreground font-body text-sm">abucoreenterprises@gmail.com</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-11 h-11 bg-navy flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="font-body font-semibold text-foreground text-sm mb-1">Office Address</h4>
                  <p className="text-muted-foreground font-body text-sm">Katsina State, Nigeria</p>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/2347079462587"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-navy text-primary-foreground px-6 py-3.5 font-bold text-sm font-body hover:bg-navy-light transition-colors duration-200"
              >
                Chat on WhatsApp
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
