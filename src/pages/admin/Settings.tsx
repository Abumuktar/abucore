import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Settings as SettingsIcon, Loader2, Save, Lock, Check } from "lucide-react";
import { fetchApi, ApiError } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface Service {
  key: string;
  label: string;
  active: boolean;
}
interface SiteSettings {
  companyPhone: string;
  companyEmail: string;
  activeServices: Service[];
}

const input =
  "w-full border border-border bg-background px-4 py-3 text-sm rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all";

const Settings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<SiteSettings>({
    queryKey: ["admin-settings"],
    queryFn: () => fetchApi<SiteSettings>("/api/admin/settings"),
  });

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [savingInfo, setSavingInfo] = useState(false);

  useEffect(() => {
    if (data) {
      setPhone(data.companyPhone);
      setEmail(data.companyEmail);
      setServices(data.activeServices || []);
    }
  }, [data]);

  const saveInfo = async () => {
    setSavingInfo(true);
    try {
      await fetchApi("/api/admin/settings", {
        method: "PATCH",
        body: JSON.stringify({ companyPhone: phone, companyEmail: email, activeServices: services }),
      });
      queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
      toast({ title: "Settings saved" });
    } catch (e) {
      toast({ title: "Could not save", description: e instanceof ApiError ? e.message : "" });
    } finally {
      setSavingInfo(false);
    }
  };

  const toggleService = (key: string) =>
    setServices((s) => s.map((sv) => (sv.key === key ? { ...sv, active: !sv.active } : sv)));

  // Password change
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [pwError, setPwError] = useState<string | null>(null);
  const [pwSaving, setPwSaving] = useState(false);

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError(null);
    setPwSaving(true);
    try {
      await fetchApi("/api/auth/change-password", {
        method: "POST",
        body: JSON.stringify({ currentPassword: current, newPassword: next }),
      });
      setCurrent("");
      setNext("");
      toast({ title: "Password changed" });
    } catch (err) {
      setPwError(err instanceof ApiError ? err.message : "Could not change password.");
    } finally {
      setPwSaving(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center">
          <SettingsIcon className="w-4 h-4 text-gold" />
        </div>
        <h1 className="text-xl md:text-2xl font-display font-bold text-foreground">Settings</h1>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 animate-spin text-gold" />
        </div>
      )}

      {!isLoading && (
        <div className="space-y-5">
          {/* Company info */}
          <section className="bg-background border border-border rounded-2xl p-6">
            <h2 className="font-bold text-foreground text-sm mb-4">Company Contact</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs uppercase tracking-[1px] text-muted-foreground font-semibold mb-2 block">
                  Phone / WhatsApp
                </label>
                <input className={input} value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[1px] text-muted-foreground font-semibold mb-2 block">
                  Email
                </label>
                <input className={input} value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>

            <h3 className="text-xs uppercase tracking-[1px] text-muted-foreground font-semibold mb-3">
              Active Services (shown on the contact form)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
              {services.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => toggleService(s.key)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border text-sm text-left transition-colors ${
                    s.active
                      ? "border-gold/40 bg-gold/5 text-foreground"
                      : "border-border bg-muted/30 text-muted-foreground"
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${
                      s.active ? "gradient-gold" : "border border-border"
                    }`}
                  >
                    {s.active && <Check className="w-3 h-3 text-navy" />}
                  </span>
                  <span className="truncate">{s.label}</span>
                </button>
              ))}
              {services.length === 0 && (
                <p className="text-sm text-muted-foreground">No services configured (run the seed).</p>
              )}
            </div>

            <button
              onClick={saveInfo}
              disabled={savingInfo}
              className="inline-flex items-center gap-2 gradient-gold text-navy px-5 py-2.5 font-semibold text-sm rounded-lg hover:shadow-glow transition-all disabled:opacity-60"
            >
              {savingInfo ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save
            </button>
          </section>

          {/* Password */}
          <section className="bg-background border border-border rounded-2xl p-6">
            <h2 className="font-bold text-foreground text-sm mb-4 flex items-center gap-2">
              <Lock className="w-4 h-4 text-gold" />
              Change Password
            </h2>
            <form onSubmit={changePassword} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-[1px] text-muted-foreground font-semibold mb-2 block">
                    Current Password
                  </label>
                  <input type="password" required className={input} value={current} onChange={(e) => setCurrent(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[1px] text-muted-foreground font-semibold mb-2 block">
                    New Password
                  </label>
                  <input type="password" required minLength={6} className={input} value={next} onChange={(e) => setNext(e.target.value)} placeholder="At least 6 characters" />
                </div>
              </div>
              {pwError && <p className="text-destructive text-sm font-semibold">{pwError}</p>}
              <button
                type="submit"
                disabled={pwSaving}
                className="inline-flex items-center gap-2 bg-navy text-primary-foreground px-5 py-2.5 font-semibold text-sm rounded-lg hover:shadow-soft transition-all disabled:opacity-60"
              >
                {pwSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                Update Password
              </button>
            </form>
          </section>
        </div>
      )}
    </div>
  );
};

export default Settings;
