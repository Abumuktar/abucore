import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Loader2,
  Save,
  Plus,
  User,
  Phone,
  Mail,
  Briefcase,
  FileText,
  Wallet,
  CalendarDays,
  StickyNote,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { fetchApi, ApiError } from "@/lib/api";
import { AdminProject, SERVICE_OPTIONS, dateInputValue } from "@/lib/project";

const empty = {
  clientName: "",
  clientPhone: "",
  clientEmail: "",
  serviceType: "",
  description: "",
  contractValue: "",
  startDate: "",
  expectedEndDate: "",
  internalNotes: "",
};

const input =
  "w-full border border-border bg-background px-3.5 py-2 text-sm rounded-lg text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId?: string | null;
  onSaved?: (project: AdminProject) => void;
}

const ProjectFormModal = ({ open, onOpenChange, projectId, onSaved }: Props) => {
  const isEdit = !!projectId;
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ ...empty });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const { data: existing, isLoading } = useQuery<AdminProject>({
    queryKey: ["project", projectId],
    queryFn: () => fetchApi<AdminProject>(`/api/admin/projects/${projectId}`),
    enabled: open && isEdit,
  });

  useEffect(() => {
    if (!open) return;
    setError(null);
    if (isEdit && existing) {
      setForm({
        clientName: existing.clientName,
        clientPhone: existing.clientPhone,
        clientEmail: existing.clientEmail,
        serviceType: existing.serviceType,
        description: existing.description,
        contractValue: String(existing.contractValue ?? ""),
        startDate: dateInputValue(existing.startDate),
        expectedEndDate: dateInputValue(existing.expectedEndDate),
        internalNotes: existing.internalNotes,
      });
    } else if (!isEdit) {
      setForm({ ...empty });
    }
  }, [open, isEdit, existing]);

  const set = (k: keyof typeof empty, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const payload = { ...form, contractValue: Number(form.contractValue || 0) };
    try {
      const saved = isEdit
        ? await fetchApi<AdminProject>(`/api/admin/projects/${projectId}`, {
            method: "PATCH",
            body: JSON.stringify(payload),
          })
        : await fetchApi<AdminProject>("/api/admin/projects", {
            method: "POST",
            body: JSON.stringify(payload),
          });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["overview"] });
      if (isEdit) queryClient.invalidateQueries({ queryKey: ["project", projectId] });
      onSaved?.(saved);
      onOpenChange(false);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[94vh] overflow-y-auto p-5 sm:p-6 gap-3">
        <DialogHeader className="space-y-1">
          <DialogTitle className="flex items-center gap-2.5 font-display text-lg">
            <span className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center shrink-0">
              {isEdit ? <Save className="w-4 h-4 text-navy" /> : <Plus className="w-4 h-4 text-navy" />}
            </span>
            {isEdit ? `Edit ${projectId}` : "Add New Project"}
          </DialogTitle>
          <DialogDescription className="text-xs">
            {isEdit
              ? "Update the contract details below."
              : "A Project ID is generated automatically and milestones start fresh."}
          </DialogDescription>
        </DialogHeader>

        {isEdit && isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-gold" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Client */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field icon={User} label="Client Name *">
                <input className={input} required value={form.clientName} onChange={(e) => set("clientName", e.target.value)} placeholder="Ministry of Health" />
              </Field>
              <Field icon={Phone} label="Client Phone *">
                <input className={input} required value={form.clientPhone} onChange={(e) => set("clientPhone", e.target.value)} placeholder="080..." />
              </Field>
              <Field icon={Mail} label="Client Email">
                <input type="email" className={input} value={form.clientEmail} onChange={(e) => set("clientEmail", e.target.value)} placeholder="optional" />
              </Field>
              <Field icon={Briefcase} label="Service Type *">
                <select className={input} required value={form.serviceType} onChange={(e) => set("serviceType", e.target.value)}>
                  <option value="">Select a service</option>
                  {SERVICE_OPTIONS.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </Field>
            </div>

            {/* Description */}
            <Field icon={FileText} label="Project Description *">
              <textarea rows={2} className={input + " resize-none"} required value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Scope of the contract / works…" />
            </Field>

            {/* Value & timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Field icon={Wallet} label="Value (₦) *">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₦</span>
                  <input type="number" min="0" className={input + " pl-7"} required value={form.contractValue} onChange={(e) => set("contractValue", e.target.value)} placeholder="0" />
                </div>
              </Field>
              <Field icon={CalendarDays} label="Start Date *">
                <input type="date" className={input} required value={form.startDate} onChange={(e) => set("startDate", e.target.value)} />
              </Field>
              <Field icon={CalendarDays} label="Expected End *">
                <input type="date" className={input} required value={form.expectedEndDate} onChange={(e) => set("expectedEndDate", e.target.value)} />
              </Field>
            </div>

            {/* Notes */}
            <Field icon={StickyNote} label="Internal Notes (private)">
              <textarea rows={2} className={input + " resize-none"} value={form.internalNotes} onChange={(e) => set("internalNotes", e.target.value)} placeholder="Notes for your team — not shown to the client…" />
            </Field>

            {error && <p className="text-destructive text-sm font-semibold">{error}</p>}

            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="flex-1 sm:flex-none border border-border bg-background text-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 inline-flex items-center justify-center gap-2 gradient-gold text-navy px-6 py-2.5 font-semibold text-sm rounded-lg hover:shadow-glow transition-all disabled:opacity-60"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : isEdit ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                {isEdit ? "Save Changes" : "Create Project"}
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

const Field = ({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) => (
  <div>
    <label className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-muted-foreground font-semibold mb-1.5">
      <Icon className="w-3.5 h-3.5 text-gold" />
      {label}
    </label>
    {children}
  </div>
);

export default ProjectFormModal;
