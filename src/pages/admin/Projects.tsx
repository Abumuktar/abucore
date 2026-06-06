import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FolderKanban, Plus, Search, Loader2, ChevronRight } from "lucide-react";
import { fetchApi } from "@/lib/api";
import { ProjectStatus, ProjectSummary, STATUS_STYLES, formatNaira } from "@/lib/project";
import ProjectDetailModal from "./ProjectDetailModal";
import ProjectFormModal from "./ProjectFormModal";
import ConfirmDialog from "./ConfirmDialog";

const FILTERS: (ProjectStatus | "All")[] = [
  "All",
  "Pending",
  "In Progress",
  "Completed",
  "On Hold",
  "Cancelled",
];

const Projects = () => {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [search, setSearch] = useState("");

  // Modal state
  const [viewId, setViewId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [formProjectId, setFormProjectId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading, isError } = useQuery<{ projects: ProjectSummary[] }>({
    queryKey: ["projects"],
    queryFn: () => fetchApi<{ projects: ProjectSummary[] }>("/api/admin/projects"),
  });

  // Deep links from Overview: ?new=1 opens the form, ?view=ID opens a project.
  useEffect(() => {
    if (searchParams.get("new") === "1") {
      setFormProjectId(null);
      setFormOpen(true);
      setSearchParams({}, { replace: true });
    }
    const view = searchParams.get("view");
    if (view) {
      setViewId(view);
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const remove = useMutation({
    mutationFn: (id: string) => fetchApi(`/api/admin/projects/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["overview"] });
      setDeleteId(null);
    },
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
        <button
          onClick={() => {
            setFormProjectId(null);
            setFormOpen(true);
          }}
          className="inline-flex items-center gap-2 gradient-gold text-navy px-4 py-2.5 rounded-lg text-sm font-semibold hover:shadow-glow transition-all"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add New Project</span>
          <span className="sm:hidden">New</span>
        </button>
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
      {isError && <p className="text-destructive text-sm py-10 text-center">Failed to load projects.</p>}
      {!isLoading && !isError && rows.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <FolderKanban className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No projects found.</p>
          <button
            onClick={() => {
              setFormProjectId(null);
              setFormOpen(true);
            }}
            className="text-gold text-sm font-semibold mt-2"
          >
            + Add your first project
          </button>
        </div>
      )}

      {/* Responsive list */}
      {!isLoading && rows.length > 0 && (
        <div className="bg-background border border-border rounded-2xl overflow-hidden divide-y divide-border">
          {rows.map((p) => (
            <button
              key={p.projectId}
              onClick={() => setViewId(p.projectId)}
              className="w-full text-left flex items-center gap-3 px-4 sm:px-5 py-4 hover:bg-muted/40 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-foreground text-sm">{p.projectId}</span>
                  <span
                    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${STATUS_STYLES[p.status]}`}
                  >
                    {p.status}
                  </span>
                </div>
                <p className="text-sm text-foreground truncate mt-0.5">{p.clientName}</p>
                <p className="text-xs text-muted-foreground truncate">{p.serviceType}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-semibold text-foreground">{formatNaira(p.contractValue)}</p>
                <p className="text-[11px] text-muted-foreground">{p.progress}% done</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
            </button>
          ))}
        </div>
      )}

      {/* Modals */}
      <ProjectDetailModal
        open={!!viewId}
        onOpenChange={(o) => !o && setViewId(null)}
        projectId={viewId}
        onEdit={(id) => {
          setViewId(null);
          setFormProjectId(id);
          setFormOpen(true);
        }}
        onRequestDelete={(id) => {
          setViewId(null);
          setDeleteId(id);
        }}
      />

      <ProjectFormModal
        open={formOpen}
        onOpenChange={setFormOpen}
        projectId={formProjectId}
        onSaved={(p) => {
          // Re-open the project we just created/edited.
          setViewId(p.projectId);
        }}
      />

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
        title="Delete project?"
        description={`${deleteId} will be permanently removed. This cannot be undone.`}
        confirmLabel="Delete"
        loading={remove.isPending}
        onConfirm={() => deleteId && remove.mutate(deleteId)}
      />
    </div>
  );
};

export default Projects;
