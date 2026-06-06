import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, ArrowRight, Lock } from "lucide-react";
import { fetchApi, ApiError } from "@/lib/api";

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
    <div className="min-h-screen flex items-center justify-center gradient-navy px-4 py-10 relative overflow-hidden">
      {/* soft accents */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="bg-background rounded-2xl border border-border shadow-elevated p-8 sm:p-10">
          {/* Logo */}
          <Link to="/" className="flex justify-center mb-6">
            <img src="/logo.png" alt="Abucore Enterprises Limited" className="h-16 w-auto" />
          </Link>

          {/* Heading */}
          <div className="text-center mb-7">
            <div className="inline-flex items-center gap-2 bg-gold/10 text-gold text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <Lock className="w-3.5 h-3.5" />
              MD Dashboard
            </div>
            <h1 className="font-display font-bold text-foreground text-2xl">Welcome back</h1>
            <p className="text-muted-foreground text-sm mt-1">Sign in to manage your projects.</p>
          </div>

          {/* Form */}
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

        <p className="text-center text-primary-foreground/30 text-xs mt-5">
          © {new Date().getFullYear()} Abucore Enterprises Limited · RC 9593574
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
