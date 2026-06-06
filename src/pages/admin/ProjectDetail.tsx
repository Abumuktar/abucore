import { useNavigate, useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  ArrowLeft,
  Pencil,
  Trash2,
  CheckCircle2,
  Circle,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { fetchApi } from "@/lib/api";
import { AdminProject, STATUS_STYLES, formatNaira } from "@/lib/project";

const fmt = (v?: string | null) => {
  if (!v) return "—";
  const d = new Date(v);
  return isNaN(d.getTime()) ? "—" : format(d, "MMM d, yyyy");
};

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: p, isLoading, isError } = useQuery<AdminProject>({
    queryKey: ["project", projectId],
    queryFn: () => fetchApi<AdminProject>(`/api/admin/projects/${projectId}`),
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["project", projectId] });
    queryClient.invalidateQueries({ queryKey: ["projects"] });
    queryClient.invalidateQueries({ queryKey: ["overview"] });
  };

  const completeMilestone = useMutation({
    mutationFn: (key: string) =>
      fetchApi(`/api/admin/projects/${projectId}/milestones`, {
        method: "PATCH",
        body: JSON.stringify({ key }),
      }),
    onSuccess: invalidate,
  });

  const setStatus = useMutation({
    mutationFn: (manualStatus: string | null) =>
      fetchApi(`/api/admin/projects/${projectId}`, {
        method: "PATCH",
        body: JSON.stringify({ manualStatus }),
      }),
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: () => fetchApi(`/api/admin/projects/${projectId}`, { method: "DELETE" }),
    onSuccess: () => {
      invalidate();
      navigate("/admin/projects");
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-gold" />
      </div>
    );
  }
  if (isError || !p) {
    return (
      <div className="text-center py-20">
        <p className="text-destructive text-sm mb-3">Project not found.</p>
        <Link to="/admin/projects" className="text-gold text-sm font-semibold">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <Link
        to="/admin/projects"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-5"
      >
        <ArrowLeft className="w-4 h-4" />
        Projects
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-gold text-xs tracking-[2px] uppercase font-bold">{p.projectId}</span>
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${STATUS_STYLES[p.status]}`}
            >
              {p.status}
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-display font-bold text-foreground">{p.clientName}</h1>
        </div>
        <div className="flex gap-2">
          <Link
            to={`/admin/projects/${p.projectId}/edit`}
            className="inline-flex items-center gap-2 bg-background border border-border text-foreground px-4 py-2 rounded-lg text-xs font-semibold hover:border-gold/30 transition-all"
          >
            <Pencil className="w-4 h-4" />
            Edit
          </Link>
          <button
            onClick={() => {
              if (confirm(`Delete ${p.projectId} permanently?`)) remove.mutate();
            }}
            className="inline-flex items-center gap-2 bg-background border border-border text-destructive px-4 py-2 rounded-lg text-xs font-semibold hover:border-destructive/40 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        <Info label="Service" value={p.serviceType} />
        <Info label="Contract Value" value={formatNaira(p.contractValue)} />
        <Info label="Progress" value={`${p.progress}%`} />
        <Info label="Client Phone" value={p.clientPhone || "—"} />
        <Info label="Client Email" value={p.clientEmail || "—"} />
        <Info label="Tracker" value={p.projectId} link={`/track`} />
        <Info label="Start Date" value={fmt(p.startDate)} />
        <Info label="Expected End" value={fmt(p.expectedEndDate)} />
      </div>

      {/* Description + notes */}
      <Block title="Description">{p.description}</Block>
      {p.internalNotes && <Block title="Internal Notes (private)">{p.internalNotes}</Block>}

      {/* Status control */}
      <div className="bg-background border border-border rounded-2xl p-5 mb-5">
        <h2 className="font-bold text-foreground text-sm mb-1">Status Override</h2>
        <p className="text-xs text-muted-foreground mb-3">
          Status is automatic from milestones. Override only to put a project On Hold or mark it Cancelled.
        </p>
        <select
          value={p.manualStatus ?? "auto"}
          onChange={(e) => setStatus.mutate(e.target.value === "auto" ? null : e.target.value)}
          className="border border-border bg-background px-4 py-2.5 text-sm rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
        >
          <option value="auto">Automatic (from milestones)</option>
          <option value="On Hold">On Hold</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Milestones */}
      <div className="bg-background border border-border rounded-2xl p-5">
        <h2 className="font-bold text-foreground text-sm mb-1">Milestones</h2>
        <p className="text-xs text-muted-foreground mb-4">
          Mark each stage complete as the contract progresses. Completed stages are locked (can't be undone).
        </p>
        <ul className="space-y-3">
          {p.milestones.map((m) => (
            <li
              key={m.key}
              className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/30"
            >
              {m.completed ? (
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground/40 shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${m.completed ? "text-foreground" : "text-muted-foreground"}`}>
                  {m.name}
                </p>
                {m.completed && (
                  <p className="text-[11px] text-muted-foreground">Completed {fmt(m.completedAt)}</p>
                )}
              </div>
              {!m.completed && (
                <button
                  onClick={() => completeMilestone.mutate(m.key)}
                  disabled={completeMilestone.isPending}
                  className="shrink-0 gradient-gold text-navy px-3.5 py-2 rounded-lg text-xs font-semibold hover:shadow-glow transition-all disabled:opacity-60"
                >
                  Mark Complete
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Info = ({ label, value, link }: { label: string; value: string; link?: string }) => (
  <div className="bg-muted/40 rounded-xl p-3.5 border border-border">
    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{label}</p>
    {link ? (
      <Link to={link} className="text-sm text-gold font-medium inline-flex items-center gap-1">
        {value} <ExternalLink className="w-3 h-3" />
      </Link>
    ) : (
      <p className="text-sm text-foreground font-medium truncate">{value}</p>
    )}
  </div>
);

const Block = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-background border border-border rounded-2xl p-5 mb-5">
    <h2 className="font-bold text-foreground text-sm mb-2">{title}</h2>
    <p className="text-sm text-foreground/70 leading-relaxed whitespace-pre-wrap">{children}</p>
  </div>
);

export default ProjectDetail;
