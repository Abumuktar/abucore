import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  LayoutDashboard,
  FolderKanban,
  Wallet,
  CheckCircle2,
  Inbox,
  Plus,
  ArrowRight,
  Activity,
  Loader2,
} from "lucide-react";
import { fetchApi } from "@/lib/api";
import { formatNaira, formatNairaCompact } from "@/lib/project";

interface OverviewData {
  activeProjects: number;
  totalContractValue: number;
  completedThisMonth: number;
  unreadSubmissions: number;
  totalProjects: number;
  recentActivity: { projectId: string; message: string; createdAt: string }[];
}

const Overview = () => {
  const { data, isLoading, isError } = useQuery<OverviewData>({
    queryKey: ["overview"],
    queryFn: () => fetchApi<OverviewData>("/api/admin/overview"),
  });

  const stats = [
    {
      icon: FolderKanban,
      label: "Active Projects",
      value: data ? String(data.activeProjects) : "—",
    },
    {
      icon: Wallet,
      label: "Total Contract Value",
      value: data ? formatNairaCompact(data.totalContractValue) : "—",
      title: data ? formatNaira(data.totalContractValue) : undefined,
    },
    {
      icon: CheckCircle2,
      label: "Completed This Month",
      value: data ? String(data.completedThisMonth) : "—",
    },
    {
      icon: Inbox,
      label: "Unread Submissions",
      value: data ? String(data.unreadSubmissions) : "—",
    },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center">
          <LayoutDashboard className="w-4 h-4 text-gold" />
        </div>
        <h1 className="text-xl md:text-2xl font-display font-bold text-foreground">Overview</h1>
      </div>

      {isError && (
        <p className="text-destructive text-sm py-6">Failed to load. Is the API running?</p>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-background border border-border rounded-2xl p-5">
            <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center mb-3">
              <s.icon className="w-4 h-4 text-gold" />
            </div>
            <div
              title={s.title}
              className="text-xl sm:text-2xl font-display font-bold text-foreground leading-tight tabular-nums break-words"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /> : s.value}
            </div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mt-1">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Quick actions */}
        <div className="bg-background border border-border rounded-2xl p-5">
          <h2 className="font-bold text-foreground mb-4 text-sm">Quick Actions</h2>
          <div className="space-y-2">
            <Action to="/admin/projects?new=1" icon={Plus} label="Add New Project" primary />
            <Action to="/admin/projects" icon={FolderKanban} label="View All Projects" />
            <Action to="/admin/submissions" icon={Inbox} label="View Submissions" />
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-background border border-border rounded-2xl p-5 lg:col-span-2">
          <h2 className="font-bold text-foreground mb-4 text-sm flex items-center gap-2">
            <Activity className="w-4 h-4 text-gold" />
            Recent Activity
          </h2>
          {data && data.recentActivity.length === 0 && (
            <p className="text-sm text-muted-foreground">No activity yet.</p>
          )}
          <ul className="space-y-3">
            {data?.recentActivity.map((a, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                <div>
                  <span className="text-foreground">{a.message}</span>{" "}
                  <Link to={`/admin/projects?view=${a.projectId}`} className="text-gold font-medium">
                    {a.projectId}
                  </Link>
                  <div className="text-[11px] text-muted-foreground">
                    {a.createdAt ? format(new Date(a.createdAt), "MMM d, yyyy · h:mm a") : ""}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Action = ({
  to,
  icon: Icon,
  label,
  primary,
}: {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  primary?: boolean;
}) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all group ${
      primary
        ? "gradient-gold text-navy hover:shadow-glow"
        : "bg-muted/50 text-foreground hover:bg-muted border border-border"
    }`}
  >
    <Icon className="w-4 h-4" />
    <span className="flex-1">{label}</span>
    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
  </Link>
);

export default Overview;
