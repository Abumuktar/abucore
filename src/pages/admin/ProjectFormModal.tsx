import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Save, Plus } from "lucide-react";
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
  "w-full border border-border bg-background px-4 py-2.5 text-sm rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Pass a projectId to edit; omit/null to create. */
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2.5 font-display">
            <span className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
              {isEdit ? <Save className="w-4 h-4 text-gold" /> : <Plus className="w-4 h-4 text-gold" />}
            </span>
            {isEdit ? `Edit ${projectId}` : "Add New Project"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the contract details."
              : "A Project ID is generated automatically and the 5 milestones start fresh."}
          </DialogDescription>
        </DialogHeader>

        {isEdit && isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-gold" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Client Name *">
                <input className={input} required value={form.clientName} onChange={(e) => set("clientName", e.target.value)} placeholder="e.g. Ministry of Health" />
              </Field>
              <Field label="Client Phone *">
                <input className={input} required value={form.clientPhone} onChange={(e) => set("clientPhone", e.target.value)} placeholder="080..." />
              </Field>
              <Field label="Client Email">
                <input type="email" className={input} value={form.clientEmail} onChange={(e) => set("clientEmail", e.target.value)} placeholder="optional" />
              </Field>
              <Field label="Service Type *">
                <select className={input} required value={form.serviceType} onChange={(e) => set("serviceType", e.target.value)}>
                  <option value="">Select a service</option>
                  {SERVICE_OPTIONS.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Project Description *">
              <textarea rows={3} className={input + " resize-none"} required value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Scope of the contract / works…" />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="Contract Value (₦) *">
                <input type="number" min="0" className={input} required value={form.contractValue} onChange={(e) => set("contractValue", e.target.value)} placeholder="0" />
              </Field>
              <Field label="Start Date *">
                <input type="date" className={input} required value={form.startDate} onChange={(e) => set("startDate", e.target.value)} />
              </Field>
              <Field label="Expected End *">
                <input type="date" className={input} required value={form.expectedEndDate} onChange={(e) => set("expectedEndDate", e.target.value)} />
              </Field>
            </div>

            <Field label="Internal Notes (not visible to client)">
              <textarea rows={2} className={input + " resize-none"} value={form.internalNotes} onChange={(e) => set("internalNotes", e.target.value)} placeholder="Private notes for your team…" />
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
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 gradient-gold text-navy px-6 py-2.5 font-semibold text-sm rounded-lg hover:shadow-glow transition-all disabled:opacity-60"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {isEdit ? "Save Changes" : "Create Project"}
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="text-xs uppercase tracking-[1px] text-muted-foreground font-semibold mb-2 block">
      {label}
    </label>
    {children}
  </div>
);

export default ProjectFormModal;
