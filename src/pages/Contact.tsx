import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, ArrowRight, Clock } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { fetchApi } from "@/lib/api";
import { SERVICE_OPTIONS } from "@/lib/project";

const ease = [0.16, 1, 0.3, 1] as const;

interface PublicSettings {
  companyPhone: string;
  activeServices: string[];
}

/** Normalize a Nigerian number to a wa.me target (default Abucore line). */
const toWaNumber = (phone?: string) => {
  const digits = (phone || "").replace(/\D/g, "");
  if (digits.startsWith("0")) return "234" + digits.slice(1);
  if (digits.startsWith("234")) return digits;
  if (digits.length === 10) return "234" + digits;
  return digits || "2349138266715";
};

const contactInfo = [
  { icon: Phone, label: "Phone / WhatsApp", value: "09138266715", href: "tel:+2349138266715" },
  { icon: Mail, label: "Email Address", value: "abucoreenterprises@gmail.com", href: "mailto:abucoreenterprises@gmail.com" },
  { icon: MapPin, label: "Office Location", value: "Katsina State, Nigeria", href: null },
  { icon: Clock, label: "Response Time", value: "Within 24 hours", href: null },
];

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });

  // Active services + WhatsApp number, managed from the dashboard Settings page.
  const { data: settings } = useQuery<PublicSettings>({
    queryKey: ["public-settings"],
    queryFn: () => fetchApi<PublicSettings>("/api/settings"),
    staleTime: 5 * 60 * 1000,
  });
  const serviceOptions =
    settings?.activeServices && settings.activeServices.length > 0
      ? settings.activeServices
      : SERVICE_OPTIONS;
  const waNumber = toWaNumber(settings?.companyPhone);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Save the submission to the dashboard inbox (best-effort — never blocks
    // the user; the WhatsApp hand-off below is the primary contact path).
    fetchApi("/api/contact", {
      method: "POST",
      body: JSON.stringify(form),
    }).catch(() => {
      /* offline or API unavailable — WhatsApp still opens below */
    });

    const lines = [
      "*New Quote Request — Abucore*",
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : null,
      form.service ? `Service: ${form.service}` : null,
      "",
      "Message:",
      form.message,
    ].filter(Boolean);

    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");

    toast({ title: "Opening WhatsApp…", description: "Your details are ready to send. Tap send in WhatsApp to reach us." });
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <PageHero
        label="Get in Touch"
        title="Contact Abucore"
        description="Have a contract? Need a quote? We're ready to help you get started."
      />

      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="lg:col-span-3"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Request a Quote
              </h2>
              <p className="text-muted-foreground text-sm mb-8">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs uppercase tracking-[1px] text-muted-foreground font-semibold mb-2 block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full border border-border bg-background px-4 py-3.5 text-sm rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-[1px] text-muted-foreground font-semibold mb-2 block">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full border border-border bg-background px-4 py-3.5 text-sm rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs uppercase tracking-[1px] text-muted-foreground font-semibold mb-2 block">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+234..."
                      className="w-full border border-border bg-background px-4 py-3.5 text-sm rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-[1px] text-muted-foreground font-semibold mb-2 block">
                      Service Needed
                    </label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full border border-border bg-background px-4 py-3.5 text-sm rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[1px] text-muted-foreground font-semibold mb-2 block">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your contract or requirements..."
                    className="w-full border border-border bg-background px-4 py-3.5 text-sm rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 gradient-gold text-navy px-8 py-4 font-semibold text-sm rounded-lg hover:shadow-glow transition-all duration-300 group w-full sm:w-auto"
                >
                  Send Message
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.1 }}
              className="lg:col-span-2 space-y-5"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Contact Info
              </h2>
              <p className="text-muted-foreground text-sm mb-8">
                Reach out through any of these channels.
              </p>

              <div className="space-y-4">
                {contactInfo.map((c) => (
                  <div
                    key={c.label}
                    className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl border border-border"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                      <c.icon className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} className="text-foreground text-sm font-medium hover:text-gold transition-colors">
                          {c.value}
                        </a>
                      ) : (
                        <p className="text-foreground text-sm font-medium">{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="https://wa.me/2349138266715"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 gradient-navy text-primary-foreground px-6 py-4 rounded-lg font-semibold text-sm hover:shadow-soft transition-all duration-300 mt-6"
              >
                <MessageCircle className="w-5 h-5 text-gold" />
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
