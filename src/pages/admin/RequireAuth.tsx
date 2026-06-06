import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { fetchApi } from "@/lib/api";

export interface Me {
  email: string;
}

export function useMe() {
  return useQuery<Me>({
    queryKey: ["auth", "me"],
    queryFn: () => fetchApi<Me>("/api/auth/me"),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, isError } = useMe();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <Loader2 className="w-6 h-6 animate-spin text-gold" />
      </div>
    );
  }
  if (isError || !data) return <Navigate to="/admin/login" replace />;

  return <>{children}</>;
};

export default RequireAuth;
