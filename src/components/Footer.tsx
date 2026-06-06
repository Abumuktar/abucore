import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Who We Serve", path: "/who-we-serve" },
  { label: "Track Project", path: "/track" },
  { label: "Contact", path: "/contact" },
];

const services = [
  "Procurement & Supply",
  "Civil Works & Infrastructure",
  "Diesel & Fuel Supply",
  "Printing & Branding",
  "Contract Execution & Delivery",
];

const Footer = () => {
  return (
    <footer className="bg-foreground">
      <div className="container pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-primary-foreground/10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <img
              src="/logo1.png"
              alt="Abucore Enterprises Limited"
              className="h-14 w-auto rounded-lg mb-5"
            />
            <p className="text-primary-foreground/50 text-sm leading-relaxed max-w-xs">
              Delivering reliable contracting solutions that meet the highest standards of quality, timeliness, and accountability.
            </p>
            <p className="text-primary-foreground/40 text-xs mt-4 font-medium tracking-wide">
              RC No: 9593574
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
                <a href="tel:+2349138266715" className="text-primary-foreground/50 text-sm hover:text-gold transition-colors">09138266715</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <a href="mailto:abucoreenterprises@gmail.com" className="text-primary-foreground/50 text-sm break-all hover:text-gold transition-colors">abucoreenterprises@gmail.com</a>
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
            Procurement · Contracting · Delivery
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
