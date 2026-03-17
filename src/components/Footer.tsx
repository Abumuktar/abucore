import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

const footerLinks = {
  "Quick Links": [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Who We Serve", path: "/who-we-serve" },
    { label: "Contact", path: "/contact" },
  ],
  Services: [
    { label: "Stationery Supply" },
    { label: "Furniture Supply" },
    { label: "Civil Works" },
    { label: "Printing & Branding" },
    { label: "Diesel Supply" },
  ],
};

const Footer = () => {
  return (
    <footer className="gradient-navy">
      <div className="container pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-primary-foreground/10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 gradient-gold rounded-lg flex items-center justify-center">
                <span className="text-xs font-extrabold text-navy">A</span>
              </div>
              <div>
                <span className="text-primary-foreground font-bold text-sm tracking-wide block leading-none">
                  ABUCORE
                </span>
                <span className="text-primary-foreground/40 text-[9px] tracking-[2px] uppercase">
                  Enterprises
                </span>
              </div>
            </div>
            <p className="text-primary-foreground/50 text-sm leading-relaxed max-w-xs">
              Your trusted partner for supply, logistics, and general contracting across Nigeria.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-gold text-xs tracking-[2px] uppercase font-semibold mb-5">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((item) => (
                  <li key={item.label}>
                    {"path" in item ? (
                      <Link
                        to={item.path}
                        className="text-primary-foreground/50 text-sm hover:text-gold transition-colors duration-300 inline-flex items-center gap-1 group"
                      >
                        {item.label}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ) : (
                      <span className="text-primary-foreground/50 text-sm">
                        {item.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="text-gold text-xs tracking-[2px] uppercase font-semibold mb-5">
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
            © 2026 Abucore Enterprises Limited. All rights reserved.
          </p>
          <span className="text-gold/50 text-xs font-medium tracking-wider">
            Supply · Logistics · General Contracting
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
