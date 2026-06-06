import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Inbox, LayoutDashboard, FolderKanban, Settings, LogOut, Menu, X } from "lucide-react";
import { fetchApi } from "@/lib/api";
import { useMe } from "./RequireAuth";
import { SubmissionsResponse } from "./Submissions";

const NAV = [
  { to: "/admin", icon: LayoutDashboard, label: "Overview", end: true },
  { to: "/admin/projects", icon: FolderKanban, label: "Projects", end: false },
  { to: "/admin/submissions", icon: Inbox, label: "Submissions", end: false, badgeKey: true },
  { to: "/admin/settings", icon: Settings, label: "Settings", end: false },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: me } = useMe();
  const [menuOpen, setMenuOpen] = useState(false);

  const { data } = useQuery<SubmissionsResponse>({
    queryKey: ["submissions"],
    queryFn: () => fetchApi<SubmissionsResponse>("/api/admin/submissions"),
  });
  const unread = data?.unread ?? 0;

  const logout = async () => {
    await fetchApi("/api/auth/logout", { method: "POST" }).catch(() => {});
    queryClient.clear();
    navigate("/admin/login", { replace: true });
  };

  const navItems = (onClick?: () => void) =>
    NAV.map((n) => (
      <NavItem key={n.to} {...n} badge={n.badgeKey ? unread : undefined} onClick={onClick} />
    ));

  return (
    <div className="min-h-screen bg-muted/40 md:flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-60 md:sticky md:top-0 md:h-screen bg-navy shrink-0">
        <div className="p-5 border-b border-white/5">
          <img src="/logo.png" alt="Abucore Enterprises Limited" className="h-12 w-auto rounded-lg bg-white p-1" />
        </div>
        <nav className="flex flex-col gap-1 p-3 flex-1 overflow-y-auto">{navItems()}</nav>
        <div className="p-3 border-t border-white/5">
          <p className="text-primary-foreground/40 text-[11px] px-3 mb-2 truncate">{me?.email}</p>
          <button
            onClick={logout}
            className="w-full inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="md:hidden sticky top-0 z-30 bg-navy flex items-center justify-between px-4 h-14">
        <img src="/logo.png" alt="Abucore" className="h-9 w-auto rounded bg-white p-0.5" />
        <button
          onClick={() => setMenuOpen(true)}
          className="text-primary-foreground p-2 -mr-2 rounded-lg hover:bg-white/5"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <div className="md:hidden fixed inset-0 z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 bg-navy/70 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 top-0 h-full w-72 max-w-[80%] bg-navy flex flex-col shadow-2xl"
            >
              <div className="p-4 flex items-center justify-between border-b border-white/5">
                <img src="/logo.png" alt="Abucore" className="h-9 w-auto rounded bg-white p-0.5" />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-primary-foreground/70 hover:text-primary-foreground p-2 rounded-lg hover:bg-white/5"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-1 p-3 flex-1 overflow-y-auto">
                {navItems(() => setMenuOpen(false))}
              </nav>
              <div className="p-3 border-t border-white/5">
                <p className="text-primary-foreground/40 text-[11px] px-3 mb-2 truncate">{me?.email}</p>
                <button
                  onClick={logout}
                  className="w-full inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Content */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 md:p-8 max-w-5xl w-full mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

const NavItem = ({
  to,
  icon: Icon,
  label,
  badge,
  end,
  onClick,
}: {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  badge?: number;
  end?: boolean;
  onClick?: () => void;
}) => (
  <NavLink
    to={to}
    end={end}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-3 md:py-2.5 rounded-lg text-sm font-medium transition-colors ${
        isActive
          ? "bg-gold/15 text-gold"
          : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/5"
      }`
    }
  >
    <Icon className="w-4 h-4 shrink-0" />
    <span className="flex-1">{label}</span>
    {badge ? (
      <span className="bg-gold text-navy text-[10px] font-bold rounded-full min-w-5 h-5 px-1.5 flex items-center justify-center">
        {badge}
      </span>
    ) : null}
  </NavLink>
);

export default AdminLayout;
