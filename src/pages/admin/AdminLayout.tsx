import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Inbox, LayoutDashboard, FolderKanban, Settings, LogOut } from "lucide-react";
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

  const items = NAV.map((n) => (
    <NavItem key={n.to} {...n} badge={n.badgeKey ? unread : undefined} />
  ));

  return (
    <div className="min-h-screen bg-muted/40">
      {/* Mobile top bar */}
      <header className="md:hidden sticky top-0 z-30 bg-navy flex items-center justify-between px-4 h-14">
        <img src="/logo1.png" alt="Abucore" className="h-9 w-auto rounded" />
        <button
          onClick={logout}
          className="inline-flex items-center gap-1.5 text-primary-foreground/70 hover:text-primary-foreground text-xs font-medium px-2 py-1.5"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </header>
      {/* Mobile nav strip */}
      <nav className="md:hidden sticky top-14 z-20 bg-navy border-t border-white/5 flex gap-1.5 px-3 py-2 overflow-x-auto">
        {items}
      </nav>

      <div className="md:flex">
        {/* Desktop sidebar — sticky so it stays in place while content scrolls */}
        <aside className="hidden md:flex md:flex-col md:w-60 md:sticky md:top-0 md:h-screen bg-navy shrink-0">
          <div className="p-5 border-b border-white/5">
            <img src="/logo1.png" alt="Abucore Enterprises Limited" className="h-11 w-auto rounded-lg" />
          </div>
          <nav className="flex flex-col gap-1 p-3 flex-1 overflow-y-auto">{items}</nav>
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

        {/* Content */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 md:p-8 max-w-5xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const NavItem = ({
  to,
  icon: Icon,
  label,
  badge,
  end,
}: {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  badge?: number;
  end?: boolean;
}) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors shrink-0 whitespace-nowrap ${
        isActive
          ? "bg-gold/15 text-gold"
          : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/5"
      }`
    }
  >
    <Icon className="w-4 h-4" />
    <span className="md:flex-1">{label}</span>
    {badge ? (
      <span className="bg-gold text-navy text-[10px] font-bold rounded-full min-w-5 h-5 px-1.5 flex items-center justify-center">
        {badge}
      </span>
    ) : null}
  </NavLink>
);

export default AdminLayout;
