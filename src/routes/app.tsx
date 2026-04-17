import { createFileRoute, Outlet, redirect, Link } from "@tanstack/react-router";
import { AppSidebar } from "@/components/AppSidebar";
import { MobileNav } from "@/components/MobileNav";
import { useAuth } from "@/lib/auth";
import { Flame, Menu } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // check after hydration; localStorage only on client
    const raw = typeof window !== "undefined" ? localStorage.getItem("careerforge_user") : null;
    if (!raw) {
      navigate({ to: "/login" });
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-card/80 backdrop-blur">
          <Link to="/app" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-ember shadow-ember">
              <Flame className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">CareerForge</span>
          </Link>
          <div className="text-xs text-muted-foreground flex items-center gap-1.5">
            <Menu className="h-4 w-4" /> {user?.name ?? "Guest"}
          </div>
        </header>

        <MobileNav />

        <main className="flex-1 px-4 md:px-8 py-6 md:py-10 pb-28 md:pb-10 max-w-6xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
