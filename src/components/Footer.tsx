import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import logoImg from "@/assets/logo.png";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Who We Serve", path: "/who-we-serve" },
  { label: "Contact", path: "/contact" },
];

const services = [
  "Stationery Supply",
  "Furniture Supply",
  "Civil Works",
  "Printing & Branding",
  "Diesel Supply",
];

const Footer = () => {
  return (
    <footer className="bg-foreground">
      <div className="container pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-primary-foreground/10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <img
                src={logoImg}
                alt="Abucore"
                className="h-9 w-auto brightness-0 invert"
              />
              <div>
                <span className="text-primary-foreground font-bold text-sm tracking-wide block leading-none">
                  ABUCORE
                </span>
                <span className="text-primary-foreground/40 text-[9px] tracking-[1.5px] uppercase">
                  Enterprises
                </span>
              </div>
            </div>
            <p className="text-primary-foreground/50 text-sm leading-relaxed max-w-xs">
              Your trusted partner for supply, logistics, and general contracting across Nigeria.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-primary-foreground text-xs tracking-[2px] uppercase font-semibold mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-primary-foreground/50 text-sm hover:text-gold transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-primary-foreground text-xs tracking-[2px] uppercase font-semibold mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item}>
                  <span className="text-primary-foreground/50 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-primary-foreground text-xs tracking-[2px] uppercase font-semibold mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span className="text-primary-foreground/50 text-sm">07079462587</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span className="text-primary-foreground/50 text-sm break-all">abucoreenterprises@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span className="text-primary-foreground/50 text-sm">Katsina State, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 gap-4">
          <p className="text-primary-foreground/30 text-xs">
            © {new Date().getFullYear()} Abucore Enterprises Limited. All rights reserved.
          </p>
          <span className="text-primary-foreground/20 text-xs font-medium">
            Supply · Logistics · General Contracting
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
