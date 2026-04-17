import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard, FileText, MessageSquareText, BookOpen,
  ClipboardList, Briefcase, Bot, TrendingUp,
} from "lucide-react";

const items = [
  { to: "/app", label: "Home", icon: LayoutDashboard, exact: true },
  { to: "/app/resume", label: "Resume", icon: FileText },
  { to: "/app/mock", label: "Mock", icon: ClipboardList },
  { to: "/app/jobs", label: "Jobs", icon: Briefcase },
  { to: "/app/chatbot", label: "Chat", icon: Bot },
] as const;

const quickLinks = [
  { to: "/app/interview", label: "Interview Prep", icon: MessageSquareText },
  { to: "/app/study", label: "Study Material", icon: BookOpen },
  { to: "/app/skill-gap", label: "Skill Gap", icon: TrendingUp },
] as const;

export function MobileNav() {
  const { pathname } = useLocation();
  return (
    <>
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-card/95 backdrop-blur-md">
        <div className="grid grid-cols-5">
          {items.map((i) => {
            const active = i.exact ? pathname === i.to : pathname.startsWith(i.to);
            const Icon = i.icon;
            return (
              <Link
                key={i.to}
                to={i.to}
                className={`flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium transition-colors ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{i.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
      {/* secondary quick access row on mobile */}
      <div className="md:hidden px-4 pt-3">
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
          {quickLinks.map((q) => {
            const active = pathname.startsWith(q.to);
            const Icon = q.icon;
            return (
              <Link
                key={q.to}
                to={q.to}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-border bg-card text-muted-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {q.label}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
