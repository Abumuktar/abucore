import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, ArrowRight, ShieldCheck, Lock } from "lucide-react";
import { fetchApi, ApiError } from "@/lib/api";

const features = [
  "Track every contract from award to delivery",
  "Manage milestones clients can follow live",
  "See and reply to every quote request",
];

const AdminLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await fetchApi("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      await queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const input =
    "w-full border border-border bg-background px-4 py-3 text-sm rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all";

  return (
    <div className="min-h-screen md:grid md:grid-cols-2">
      {/* Brand panel (desktop) */}
      <div className="relative hidden md:flex flex-col justify-between gradient-navy p-10 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-16 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />

        <Link to="/" className="relative z-10">
          <img src="/logo1.png" alt="Abucore Enterprises Limited" className="h-14 w-auto rounded-lg" />
        </Link>

        <div className="relative z-10">
          <h2 className="text-primary-foreground font-display font-bold text-3xl leading-tight mb-4">
            MD Dashboard
          </h2>
          <p className="text-primary-foreground/60 text-sm max-w-sm mb-8 leading-relaxed">
            The control room for Abucore — projects, milestones, and client requests in one place.
          </p>
          <ul className="space-y-3">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-primary-foreground/80">
                <ShieldCheck className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 text-primary-foreground/30 text-xs">
          © {new Date().getFullYear()} Abucore Enterprises Limited · RC 9593574
        </p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-6 sm:p-10 bg-background min-h-screen md:min-h-0">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <Link to="/" className="md:hidden flex justify-center mb-8">
            <div className="bg-navy rounded-xl p-3">
              <img src="/logo1.png" alt="Abucore" className="h-10 w-auto" />
            </div>
          </Link>

          <div className="inline-flex items-center gap-2 bg-gold/10 text-gold text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            <Lock className="w-3.5 h-3.5" />
            Secure Sign In
          </div>

          <h1 className="font-display font-bold text-foreground text-2xl mb-1">Welcome back</h1>
          <p className="text-muted-foreground text-sm mb-8">Sign in to manage your projects.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-[1px] text-muted-foreground font-semibold mb-2 block">
                Email
              </label>
              <input
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={input}
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[1px] text-muted-foreground font-semibold mb-2 block">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={input}
              />
            </div>

            {error && <p className="text-destructive text-xs font-semibold">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 gradient-gold text-navy px-6 py-3.5 font-semibold text-sm rounded-lg hover:shadow-glow transition-all duration-300 disabled:opacity-60 group"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <Link
            to="/"
            className="block text-center text-xs text-muted-foreground hover:text-foreground mt-6 transition-colors"
          >
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
