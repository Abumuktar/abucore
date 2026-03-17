import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-navy">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-primary-foreground/10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gold flex items-center justify-center" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}>
                <span className="text-[10px] font-bold text-navy font-body">A</span>
              </div>
              <span className="text-primary-foreground font-bold text-sm tracking-wide font-body">ABUCORE ENTERPRISES LIMITED</span>
            </div>
            <p className="text-primary-foreground/50 text-sm font-body leading-relaxed">
              Your trusted partner for supply, logistics, and general contracting. Serving government agencies and private organizations nationwide.
            </p>
          </div>

          <div>
            <h4 className="text-gold text-xs tracking-[2px] uppercase font-body font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "About Us", "Services", "Who We Serve", "Contact"].map((item) => (
                <li key={item}>
                  <Link to={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, "-")}`} className="text-primary-foreground/50 text-sm font-body hover:text-gold transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gold text-xs tracking-[2px] uppercase font-body font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {["Stationery Supply", "Furniture Supply", "Civil Works", "Printing & Branding", "Diesel Supply"].map((item) => (
                <li key={item} className="text-primary-foreground/50 text-sm font-body">{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gold text-xs tracking-[2px] uppercase font-body font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-primary-foreground/50 text-sm font-body">07079462587</li>
              <li className="text-primary-foreground/50 text-sm font-body">abucoreenterprises@gmail.com</li>
              <li className="text-primary-foreground/50 text-sm font-body">Katsina State, Nigeria</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-6 gap-4">
          <p className="text-primary-foreground/30 text-xs font-body">© 2026 Abucore Enterprises Limited. All rights reserved.</p>
          <span className="text-gold text-xs font-body">Supply · Logistics · General Contracting</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
