import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  Pencil,
  Trash2,
  CheckCircle2,
  Circle,
  Loader2,
  User,
  Briefcase,
  Wallet,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { fetchApi } from "@/lib/api";
import { AdminProject, STATUS_STYLES, formatNaira } from "@/lib/project";

const fmt = (v?: string | null) => {
  if (!v) return "—";
  const d = new Date(v);
  return isNaN(d.getTime()) ? "—" : format(d, "MMM d, yyyy");
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string | null;
  onEdit: (projectId: string) => void;
  onRequestDelete: (projectId: string) => void;
}

const ProjectDetailModal = ({ open, onOpenChange, projectId, onEdit, onRequestDelete }: Props) => {
  const queryClient = useQueryClient();

  const { data: p, isLoading, isError } = useQuery<AdminProject>({
    queryKey: ["project", projectId],
    queryFn: () => fetchApi<AdminProject>(`/api/admin/projects/${projectId}`),
    enabled: open && !!projectId,
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <DialogTitle className="sr-only">Loading project</DialogTitle>
            <Loader2 className="w-6 h-6 animate-spin text-gold" />
          </div>
        ) : isError || !p ? (
          <div className="py-10 text-center">
            <DialogTitle className="sr-only">Project not found</DialogTitle>
            <p className="text-destructive text-sm">Project not found.</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-gold text-xs tracking-[2px] uppercase font-bold">{p.projectId}</span>
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${STATUS_STYLES[p.status]}`}
                >
                  {p.status}
                </span>
              </div>
              <DialogTitle className="font-display text-xl">{p.clientName}</DialogTitle>
            </DialogHeader>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(p.projectId)}
                className="inline-flex items-center gap-2 bg-background border border-border text-foreground px-4 py-2 rounded-lg text-xs font-semibold hover:border-gold/30 transition-all"
              >
                <Pencil className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => onRequestDelete(p.projectId)}
                className="inline-flex items-center gap-2 bg-background border border-border text-destructive px-4 py-2 rounded-lg text-xs font-semibold hover:border-destructive/40 transition-all"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>

            {/* Info */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <Info icon={Briefcase} label="Service" value={p.serviceType} />
              <Info icon={Wallet} label="Value" value={formatNaira(p.contractValue)} />
              <Info icon={TrendingUp} label="Progress" value={`${p.progress}%`} />
              <Info icon={Phone} label="Phone" value={p.clientPhone || "—"} />
              <Info icon={Mail} label="Email" value={p.clientEmail || "—"} />
              <Info icon={Calendar} label="Expected" value={fmt(p.expectedEndDate)} />
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                Description
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">{p.description}</p>
            </div>
            {p.internalNotes && (
              <div>
                <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                  Internal Notes (private)
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed whitespace-pre-wrap bg-muted/40 rounded-lg p-3">
                  {p.internalNotes}
                </p>
              </div>
            )}

            {/* Status override */}
            <div>
              <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                Status Override
              </h3>
              <select
                value={p.manualStatus ?? "auto"}
                onChange={(e) => setStatus.mutate(e.target.value === "auto" ? null : e.target.value)}
                className="w-full sm:w-auto border border-border bg-background px-4 py-2.5 text-sm rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
              >
                <option value="auto">Automatic (from milestones)</option>
                <option value="On Hold">On Hold</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {/* Milestones */}
            <div>
              <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                Milestones
              </h3>
              <ul className="space-y-2">
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
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

const Info = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) => (
  <div className="bg-muted/40 rounded-xl p-3 border border-border">
    <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
      <Icon className="w-3.5 h-3.5" />
      <span className="text-[10px] uppercase tracking-wider font-semibold">{label}</span>
    </div>
    <p className="text-sm text-foreground font-medium truncate">{value}</p>
  </div>
);

export default ProjectDetailModal;
