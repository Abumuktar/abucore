import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  Inbox,
  Loader2,
  Search,
  MessageCircle,
  Trash2,
  Mail,
  Phone,
  CheckCheck,
  Eye,
  Tag,
  Calendar,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { fetchApi } from "@/lib/api";
import ConfirmDialog from "./ConfirmDialog";

export type SubmissionStatus = "New" | "Read" | "Responded";

export interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceNeeded: string;
  message: string;
  status: SubmissionStatus;
  createdAt: string;
}

export interface SubmissionsResponse {
  submissions: Submission[];
  unread: number;
}

const STATUS_STYLES: Record<SubmissionStatus, string> = {
  New: "bg-gold/15 text-gold border-gold/30",
  Read: "bg-muted text-muted-foreground border-border",
  Responded: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
};

const FILTERS: (SubmissionStatus | "All")[] = ["All", "New", "Read", "Responded"];

function waLink(phone: string) {
  const digits = phone.replace(/\D/g, "");
  let intl = digits;
  if (digits.startsWith("0")) intl = "234" + digits.slice(1);
  else if (digits.length === 10) intl = "234" + digits;
  return `https://wa.me/${intl}`;
}

const fmt = (value: string) => {
  const d = new Date(value);
  return isNaN(d.getTime()) ? "—" : format(d, "MMM d, yyyy · h:mm a");
};

const Submissions = () => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [search, setSearch] = useState("");
  const [viewSub, setViewSub] = useState<Submission | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading, isError } = useQuery<SubmissionsResponse>({
    queryKey: ["submissions"],
    queryFn: () => fetchApi<SubmissionsResponse>("/api/admin/submissions"),
  });

  const setStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: SubmissionStatus }) =>
      fetchApi(`/api/admin/submissions/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["submissions"] }),
  });

  const remove = useMutation({
    mutationFn: (id: string) => fetchApi(`/api/admin/submissions/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
      setDeleteId(null);
    },
  });

  const open = (s: Submission) => {
    setViewSub(s);
    if (s.status === "New") setStatus.mutate({ id: s.id, status: "Read" });
  };

  const all = data?.submissions ?? [];
  const term = search.trim().toLowerCase();
  const rows = all.filter((s) => {
    const matchesFilter = filter === "All" || s.status === filter;
    const matchesSearch =
      !term ||
      s.name.toLowerCase().includes(term) ||
      s.phone.toLowerCase().includes(term) ||
      s.email.toLowerCase().includes(term);
    return matchesFilter && matchesSearch;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-1">
        <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center">
          <Inbox className="w-4 h-4 text-gold" />
        </div>
        <h1 className="text-xl md:text-2xl font-display font-bold text-foreground">Contact Submissions</h1>
      </div>
      <p className="text-muted-foreground text-sm mb-6 ml-12">
        Quote requests sent from the website contact form.
      </p>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex gap-1.5 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                filter === f
                  ? "bg-navy text-primary-foreground"
                  : "bg-background border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
              {f === "New" && data?.unread ? ` (${data.unread})` : ""}
            </button>
          ))}
        </div>
        <div className="relative flex-1 sm:max-w-xs sm:ml-auto">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, phone, email…"
            className="w-full border border-border bg-background pl-10 pr-4 py-2.5 text-sm rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
          />
        </div>
      </div>

      {/* States */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-gold" />
        </div>
      )}
      {isError && (
        <p className="text-destructive text-sm py-10 text-center">Failed to load submissions. Please refresh.</p>
      )}
      {!isLoading && !isError && rows.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <Inbox className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No submissions{filter !== "All" ? ` marked "${filter}"` : ""} yet.</p>
        </div>
      )}

      {/* List */}
      {!isLoading && rows.length > 0 && (
        <div className="bg-background border border-border rounded-2xl overflow-hidden divide-y divide-border">
          {rows.map((s) => (
            <button
              key={s.id}
              onClick={() => open(s)}
              className="w-full text-left flex items-center gap-3 p-4 hover:bg-muted/40 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground text-sm truncate">{s.name}</span>
                  <span
                    className={`shrink-0 inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${STATUS_STYLES[s.status]}`}
                  >
                    {s.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">
                  {s.serviceNeeded || "General enquiry"} · {fmt(s.createdAt)}
                </p>
              </div>
              <Eye className="w-4 h-4 text-muted-foreground shrink-0" />
            </button>
          ))}
        </div>
      )}

      {/* View modal */}
      <Dialog open={!!viewSub} onOpenChange={(o) => !o && setViewSub(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          {viewSub && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${STATUS_STYLES[viewSub.status]}`}
                  >
                    {viewSub.status}
                  </span>
                </div>
                <DialogTitle className="font-display text-xl">{viewSub.name}</DialogTitle>
              </DialogHeader>

              <div className="space-y-2.5">
                <Meta icon={Mail} label="Email">
                  <a href={`mailto:${viewSub.email}`} className="text-foreground hover:text-gold transition-colors break-all">
                    {viewSub.email}
                  </a>
                </Meta>
                <Meta icon={Phone} label="Phone">
                  <span className="text-foreground">{viewSub.phone || "—"}</span>
                </Meta>
                <Meta icon={Tag} label="Service">
                  <span className="text-foreground">{viewSub.serviceNeeded || "General enquiry"}</span>
                </Meta>
                <Meta icon={Calendar} label="Received">
                  <span className="text-foreground">{fmt(viewSub.createdAt)}</span>
                </Meta>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                  Message
                </h3>
                <div className="bg-muted/40 rounded-lg p-4 text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
                  {viewSub.message}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {viewSub.phone && (
                  <a
                    href={waLink(viewSub.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setStatus.mutate({ id: viewSub.id, status: "Responded" })}
                    className="inline-flex items-center gap-2 gradient-navy text-primary-foreground px-4 py-2 rounded-lg text-xs font-semibold hover:shadow-soft transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-gold" />
                    Reply on WhatsApp
                  </a>
                )}
                <button
                  onClick={() => setStatus.mutate({ id: viewSub.id, status: "Responded" })}
                  className="inline-flex items-center gap-2 bg-background border border-border text-foreground px-4 py-2 rounded-lg text-xs font-semibold hover:border-gold/30 transition-all"
                >
                  <CheckCheck className="w-4 h-4" />
                  Mark Responded
                </button>
                <button
                  onClick={() => {
                    const id = viewSub.id;
                    setViewSub(null);
                    setDeleteId(id);
                  }}
                  className="inline-flex items-center gap-2 bg-background border border-border text-destructive px-4 py-2 rounded-lg text-xs font-semibold hover:border-destructive/40 transition-all ml-auto"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
        title="Delete submission?"
        description="This message will be permanently removed."
        confirmLabel="Delete"
        loading={remove.isPending}
        onConfirm={() => deleteId && remove.mutate(deleteId)}
      />
    </div>
  );
};

const Meta = ({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-center gap-3 text-sm">
    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
      <Icon className="w-4 h-4 text-gold" />
    </div>
    <div className="min-w-0">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{label}</p>
      {children}
    </div>
  </div>
);

export default Submissions;
