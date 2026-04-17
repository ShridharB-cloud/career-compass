import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard, FileText, MessageSquareText, BookOpen,
  ClipboardList, Briefcase, Bot, TrendingUp, Flame, LogOut,
} from "lucide-react";
import { useAuth } from "@/lib/auth";

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean };
const nav: NavItem[] = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/app/resume", label: "Resume Builder", icon: FileText },
  { to: "/app/interview", label: "Interview Prep", icon: MessageSquareText },
  { to: "/app/study", label: "Study Material", icon: BookOpen },
  { to: "/app/mock", label: "Mock Interview", icon: ClipboardList },
  { to: "/app/jobs", label: "Job Opportunities", icon: Briefcase },
  { to: "/app/chatbot", label: "AI Chatbot", icon: Bot },
  { to: "/app/skill-gap", label: "Skill Gap Analysis", icon: TrendingUp },
];

export function AppSidebar() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-2 px-5 py-5 border-b border-sidebar-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-ember shadow-ember">
          <Flame className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <div className="font-display text-lg font-bold leading-none">CareerForge</div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">build your future</div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {nav.map((item) => {
          const active = item.exact ? pathname === item.to : pathname === item.to || pathname.startsWith(item.to + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
                active
                  ? "bg-gradient-ember text-primary-foreground shadow-ember font-semibold"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent px-3 py-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-ember text-primary-foreground text-sm font-bold">
            {user?.name?.[0]?.toUpperCase() ?? "U"}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate">{user?.name ?? "Guest"}</div>
            <div className="text-xs text-muted-foreground truncate">{user?.email ?? ""}</div>
          </div>
          <button
            onClick={() => { logout(); navigate({ to: "/login" }); }}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Log out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
