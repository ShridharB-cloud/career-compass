import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { useAuth } from "@/lib/auth";
import { FileText, MessageSquareText, BookOpen, ClipboardList, Briefcase, Bot, TrendingUp, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/app/")({
  component: Dashboard,
});

const tiles = [
  { to: "/app/resume", icon: FileText, title: "Resume Builder", desc: "Generate a polished resume", accent: true },
  { to: "/app/interview", icon: MessageSquareText, title: "Interview Prep", desc: "Latest role-specific questions" },
  { to: "/app/study", icon: BookOpen, title: "Study Material", desc: "Notes for AI/ML, Cyber, Cloud…" },
  { to: "/app/mock", icon: ClipboardList, title: "Mock Interview", desc: "Beginner · Medium · Hard" },
  { to: "/app/jobs", icon: Briefcase, title: "Job Opportunities", desc: "Live roles & hiring periods" },
  { to: "/app/chatbot", icon: Bot, title: "AI Chatbot", desc: "Your career mentor, 24/7" },
  { to: "/app/skill-gap", icon: TrendingUp, title: "Skill Gap Analysis", desc: "Identify what's missing" },
];

function Dashboard() {
  const { user } = useAuth();
  return (
    <div>
      <PageHeader
        eyebrow="Welcome back"
        title={`Hey ${user?.name ?? "there"} 👋`}
        description="Pick up where you left off, or explore a new area of your career journey."
      />

      <section className="rounded-2xl border border-border bg-gradient-to-br from-card to-secondary p-6 md:p-8 shadow-card mb-8 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative">
          <div className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-2">Quick start</div>
          <h2 className="font-display text-2xl md:text-3xl font-bold max-w-lg">
            Build your resume in 5 minutes, then ace your next interview.
          </h2>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link to="/app/resume" className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-ember px-4 py-2 text-sm font-semibold text-primary-foreground shadow-ember hover:scale-105 transition-transform">
              Build resume <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/app/mock" className="inline-flex items-center rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-accent">
              Take a mock test
            </Link>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tiles.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            className={`group relative rounded-2xl border p-6 transition-all hover:-translate-y-0.5 ${
              t.accent
                ? "border-primary/40 bg-gradient-to-br from-card to-primary/5 shadow-card hover:shadow-ember"
                : "border-border bg-card shadow-card hover:border-primary/40"
            }`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4 group-hover:bg-gradient-ember group-hover:text-primary-foreground transition-colors">
              <t.icon className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-semibold flex items-center gap-2">
              {t.title}
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{t.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
