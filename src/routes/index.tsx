import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, FileText, MessageSquareText, BookOpen, ClipboardList, Briefcase, Bot, TrendingUp, ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

const features = [
  { icon: FileText, title: "Resume Builder", desc: "Generate a polished resume from your skills, experience, and target role." },
  { icon: MessageSquareText, title: "Interview Prep", desc: "Latest questions for the role you want — curated and ranked." },
  { icon: BookOpen, title: "Study Material", desc: "Notes for AI/ML, Data Science, Product, Cybersecurity, Cloud, and more." },
  { icon: ClipboardList, title: "Mock Interview", desc: "Beginner, Medium, Hard — exam-style with timer and scoring." },
  { icon: Briefcase, title: "Job Opportunities", desc: "Live roles with company, location, hiring window, and apply links." },
  { icon: Bot, title: "AI Chatbot", desc: "Your always-on career mentor — ask anything." },
  { icon: TrendingUp, title: "Skill Gap Analysis", desc: "See what's missing between your profile and your dream role." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-hero">
      <header className="flex items-center justify-between px-6 md:px-10 py-5">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-ember shadow-ember">
            <Flame className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="font-display text-xl font-bold">CareerForge</div>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/login" className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-foreground px-4 py-2">
            Log in
          </Link>
          <Link to="/signup" className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-ember px-4 py-2 text-sm font-semibold text-primary-foreground shadow-ember hover:scale-105 transition-transform">
            Get started <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <main className="px-6 md:px-10">
        <section className="max-w-5xl mx-auto pt-12 md:pt-24 pb-16 md:pb-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 backdrop-blur px-3 py-1 text-xs text-muted-foreground mb-6">
            <Sparkles className="h-3 w-3 text-primary" />
            Your complete career operating system
          </div>
          <h1 className="font-display text-4xl md:text-7xl font-bold leading-[1.05] tracking-tight">
            Build your career,<br />
            <span className="text-gradient-ember">end-to-end.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            From resume to offer letter — one platform for resumes, interviews, study,
            mock tests, jobs, AI coaching, and skill gap analysis.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/signup" className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-ember px-6 py-3 text-sm font-semibold text-primary-foreground shadow-ember hover:scale-105 transition-transform">
              Start free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/login" className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-accent transition-colors">
              I already have an account
            </Link>
          </div>
        </section>

        <section className="max-w-6xl mx-auto pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f.title} className="group relative rounded-2xl border border-border bg-card p-6 shadow-card hover:border-primary/40 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4 group-hover:bg-gradient-ember group-hover:text-primary-foreground transition-colors">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-6 px-6 md:px-10 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} CareerForge — built for ambitious careers.
      </footer>
    </div>
  );
}
