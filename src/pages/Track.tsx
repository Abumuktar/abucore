import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  Search,
  CheckCircle2,
  Clock,
  Circle,
  AlertCircle,
  Calendar,
  User,
  Briefcase,
  Loader2,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { fetchApi, ApiError } from "@/lib/api";
import { PublicProject, STATUS_STYLES } from "@/lib/project";

const ease = [0.16, 1, 0.3, 1] as const;

const fmt = (value?: string | null) => {
  if (!value) return null;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : format(d, "MMM d, yyyy");
};

const Track = () => {
  const [inputId, setInputId] = useState("");
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [emptyError, setEmptyError] = useState(false);

  const { data, isFetching, error } = useQuery<PublicProject>({
    queryKey: ["track", submittedId],
    queryFn: () => fetchApi<PublicProject>(`/api/track?id=${encodeURIComponent(submittedId!)}`),
    enabled: !!submittedId,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = inputId.trim().toUpperCase();
    if (!id) {
      setEmptyError(true);
      return;
    }
    setEmptyError(false);
    setSubmittedId(id);
  };

  const completedCount = data?.milestones.filter((m) => m.completed).length ?? 0;
  const currentIndex = data?.status === "In Progress" ? completedCount : -1;
  const progressPct = data
    ? Math.round((completedCount / data.milestones.length) * 100)
    : 0;

  return (
    <div className="min-h-screen">
      <Header />
      <PageHero
        label="Project Tracker"
        title="Track Your Project"
        description="Enter the Project ID we shared with you to see live progress on your contract."
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-3xl">
          {/* Search */}
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
              <input
                type="text"
                value={inputId}
                onChange={(e) => {
                  setInputId(e.target.value);
                  setEmptyError(false);
                }}
                placeholder="e.g. ABU-2026-001"
                className={`w-full bg-background border ${
                  emptyError ? "border-destructive" : "border-border"
                } rounded-full py-4 pl-14 pr-36 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all font-medium`}
              />
              <button
                type="submit"
                disabled={isFetching}
                className="absolute right-2 top-2 gradient-gold text-navy font-semibold px-6 py-2.5 rounded-full text-sm hover:shadow-glow transition-all active:scale-95 disabled:opacity-60 inline-flex items-center gap-2"
              >
                {isFetching ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                Track
              </button>
            </div>
            {emptyError && (
              <p className="text-destructive text-xs font-semibold mt-3 ml-5">
                Please enter a valid Project ID
              </p>
            )}
          </form>

          {/* Error (not found / server) */}
          {error && !isFetching && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 flex items-start gap-3 bg-destructive/5 border border-destructive/20 rounded-2xl p-5"
            >
              <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <p className="text-sm text-foreground/80">
                {error instanceof ApiError
                  ? error.message
                  : "Something went wrong. Please try again."}
              </p>
            </motion.div>
          )}

          {/* Result */}
          {data && !isFetching && !error && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="mt-8 rounded-2xl border border-border bg-background shadow-card overflow-hidden"
            >
              <div className="h-1 gradient-gold" />
              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                  <div>
                    <span className="text-gold text-xs tracking-[2px] uppercase font-bold">
                      {data.projectId}
                    </span>
                    <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mt-1">
                      {data.description}
                    </h3>
                  </div>
                  <span
                    className={`shrink-0 inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${
                      STATUS_STYLES[data.status]
                    }`}
                  >
                    {data.status}
                  </span>
                </div>

                {/* Meta */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  <Meta icon={User} label="Client" value={data.clientName} />
                  <Meta icon={Briefcase} label="Service" value={data.serviceType} />
                  <Meta icon={Calendar} label="Start Date" value={fmt(data.startDate) ?? "—"} />
                  <Meta
                    icon={Calendar}
                    label="Expected Delivery"
                    value={fmt(data.expectedEndDate) ?? "—"}
                  />
                </div>

                {/* Progress bar */}
                <div className="mb-8">
                  <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground mb-2">
                    <span>Progress</span>
                    <span className="text-gold">{progressPct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full gradient-gold transition-all duration-1000 ease-out"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>

                {/* Milestones */}
                <div className="relative pl-2">
                  <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border" />
                  <ul className="space-y-5">
                    {data.milestones.map((m, idx) => {
                      const isCurrent = idx === currentIndex;
                      return (
                        <li key={m.key} className="relative flex items-start gap-4">
                          <span
                            className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                              m.completed
                                ? "gradient-gold"
                                : isCurrent
                                  ? "bg-background border-2 border-gold ring-4 ring-gold/10"
                                  : "bg-background border-2 border-border"
                            }`}
                          >
                            {m.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-navy" />
                            ) : isCurrent ? (
                              <Clock className="w-4 h-4 text-gold" />
                            ) : (
                              <Circle className="w-3 h-3 text-muted-foreground/40" />
                            )}
                          </span>
                          <div className="pt-1">
                            <p
                              className={`text-sm font-semibold ${
                                m.completed
                                  ? "text-foreground"
                                  : isCurrent
                                    ? "text-gold"
                                    : "text-muted-foreground/60"
                              }`}
                            >
                              {m.name}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {m.completed
                                ? (fmt(m.completedAt) ?? "Completed")
                                : isCurrent
                                  ? "In progress"
                                  : "Pending"}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

const Meta = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-3 bg-muted/40 rounded-xl p-3.5 border border-border">
    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
      <Icon className="w-4 h-4 text-gold" />
    </div>
    <div className="min-w-0">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
        {label}
      </p>
      <p className="text-sm text-foreground font-medium truncate">{value}</p>
    </div>
  </div>
);

export default Track;
