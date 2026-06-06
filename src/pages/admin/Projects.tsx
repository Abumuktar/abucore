import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  FolderKanban,
  Plus,
  Search,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { fetchApi } from "@/lib/api";
import { ProjectStatus, ProjectSummary, STATUS_STYLES, formatNaira } from "@/lib/project";

const FILTERS: (ProjectStatus | "All")[] = [
  "All",
  "Pending",
  "In Progress",
  "Completed",
  "On Hold",
  "Cancelled",
];

const Projects = () => {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useQuery<{ projects: ProjectSummary[] }>({
    queryKey: ["projects"],
    queryFn: () => fetchApi<{ projects: ProjectSummary[] }>("/api/admin/projects"),
  });

  const term = search.trim().toLowerCase();
  const rows = (data?.projects ?? []).filter((p) => {
    const matchesFilter = filter === "All" || p.status === filter;
    const matchesSearch =
      !term ||
      p.projectId.toLowerCase().includes(term) ||
      p.clientName.toLowerCase().includes(term);
    return matchesFilter && matchesSearch;
  });

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center">
            <FolderKanban className="w-4 h-4 text-gold" />
          </div>
          <h1 className="text-xl md:text-2xl font-display font-bold text-foreground">Projects</h1>
        </div>
        <Link
          to="/admin/projects/new"
          className="inline-flex items-center gap-2 gradient-gold text-navy px-4 py-2.5 rounded-lg text-sm font-semibold hover:shadow-glow transition-all"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add New Project</span>
          <span className="sm:hidden">New</span>
        </Link>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex gap-1.5 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                filter === f
                  ? "bg-navy text-primary-foreground"
                  : "bg-background border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative flex-1 sm:max-w-xs sm:ml-auto">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ID or client…"
            className="w-full border border-border bg-background pl-10 pr-4 py-2.5 text-sm rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
          />
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-gold" />
        </div>
      )}
      {isError && (
        <p className="text-destructive text-sm py-10 text-center">Failed to load projects.</p>
      )}
      {!isLoading && !isError && rows.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <FolderKanban className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No projects found.</p>
          <Link to="/admin/projects/new" className="text-gold text-sm font-semibold mt-2 inline-block">
            + Add your first project
          </Link>
        </div>
      )}

      {/* Table (desktop) / cards (mobile) */}
      {!isLoading && rows.length > 0 && (
        <div className="bg-background border border-border rounded-2xl overflow-hidden">
          {/* header row */}
          <div className="hidden md:grid grid-cols-[1.1fr_1.4fr_1fr_0.9fr_1fr_auto] gap-3 px-5 py-3 bg-muted/40 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground border-b border-border">
            <span>Project ID</span>
            <span>Client</span>
            <span>Service</span>
            <span>Value</span>
            <span>Status</span>
            <span className="w-5" />
          </div>
          {rows.map((p) => (
            <Link
              key={p.projectId}
              to={`/admin/projects/${p.projectId}`}
              className="grid grid-cols-2 md:grid-cols-[1.1fr_1.4fr_1fr_0.9fr_1fr_auto] gap-2 md:gap-3 px-5 py-4 items-center border-b border-border last:border-0 hover:bg-muted/40 transition-colors"
            >
              <span className="font-semibold text-foreground text-sm">{p.projectId}</span>
              <span className="text-sm text-foreground truncate">{p.clientName}</span>
              <span className="text-xs text-muted-foreground truncate hidden md:block">
                {p.serviceType}
              </span>
              <span className="text-sm text-foreground hidden md:block">
                {formatNaira(p.contractValue)}
              </span>
              <span className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${STATUS_STYLES[p.status]}`}
                >
                  {p.status}
                </span>
                <span className="text-[10px] text-muted-foreground hidden lg:inline">
                  {p.progress}%
                </span>
              </span>
              <ChevronRight className="w-4 h-4 text-muted-foreground justify-self-end hidden md:block" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
