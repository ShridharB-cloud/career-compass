import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { TrendingUp, CheckCircle2, AlertTriangle, Target } from "lucide-react";

export const Route = createFileRoute("/app/skill-gap")({
  component: SkillGap,
});

const ROLE_SKILLS: Record<string, string[]> = {
  "AI/ML Engineer": ["Python", "PyTorch", "TensorFlow", "Linear Algebra", "Statistics", "Deep Learning", "MLOps", "Docker", "SQL", "Git"],
  "Data Scientist": ["Python", "SQL", "Statistics", "A/B Testing", "Pandas", "Scikit-learn", "Data Visualization", "Experimentation", "Business Acumen"],
  "Product Manager": ["Analytics", "SQL", "Roadmapping", "User Research", "Jira", "Stakeholder Management", "Wireframing", "Experimentation", "Prioritization"],
  "Cybersecurity Engineer": ["Networking", "Linux", "Python", "OWASP Top 10", "Cryptography", "SIEM", "Penetration Testing", "Cloud Security", "IAM"],
  "Cloud Engineer": ["AWS", "Terraform", "Kubernetes", "Docker", "CI/CD", "Linux", "Networking", "Python", "Monitoring", "IaC"],
  "Frontend Engineer": ["React", "TypeScript", "CSS", "HTML", "Accessibility", "Testing", "Performance", "Git", "REST APIs"],
};

function SkillGap() {
  const [role, setRole] = useState<string>("AI/ML Engineer");
  const [mySkills, setMySkills] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  const target = ROLE_SKILLS[role];
  const mine = mySkills.split(",").map((s) => s.trim()).filter(Boolean);
  const mineLower = new Set(mine.map((s) => s.toLowerCase()));

  const have = target.filter((t) => mineLower.has(t.toLowerCase()));
  const missing = target.filter((t) => !mineLower.has(t.toLowerCase()));
  const bonus = mine.filter((m) => !target.some((t) => t.toLowerCase() === m.toLowerCase()));
  const readiness = Math.round((have.length / target.length) * 100);

  return (
    <div>
      <PageHeader
        eyebrow="Step 3 · Skill Gap Analysis"
        title="See what's between you and your dream role"
        description="Enter your current skills and pick a target role. Get a prioritized gap analysis."
      />

      <div className="rounded-2xl border border-border bg-card p-5 md:p-6 shadow-card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Target role</label>
            <select
              value={role}
              onChange={(e) => { setRole(e.target.value); setAnalyzed(false); }}
              className="mt-1 w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              {Object.keys(ROLE_SKILLS).map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Your skills (comma separated)</label>
            <input
              value={mySkills}
              onChange={(e) => setMySkills(e.target.value)}
              placeholder="Python, SQL, React, Docker…"
              className="mt-1 w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
        <button
          onClick={() => setAnalyzed(true)}
          disabled={!mySkills.trim()}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gradient-ember px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-ember disabled:opacity-50 hover:scale-105 transition-transform"
        >
          <TrendingUp className="h-4 w-4" />
          Analyze my gap
        </button>
      </div>

      {analyzed && (
        <div className="space-y-5">
          <div className="rounded-2xl border border-border bg-gradient-to-br from-card to-primary/10 shadow-card p-6 md:p-8 text-center relative overflow-hidden">
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            <Target className="h-10 w-10 mx-auto text-primary mb-2 relative" />
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground relative">Readiness for {role}</div>
            <div className="font-display text-6xl font-bold text-gradient-ember mt-2 relative">{readiness}%</div>
            <div className="max-w-md mx-auto mt-4 h-2 bg-input rounded-full overflow-hidden relative">
              <div
                className="h-full bg-gradient-ember transition-all duration-700"
                style={{ width: `${readiness}%` }}
              />
            </div>
            <p className="mt-4 text-sm text-muted-foreground relative">
              {readiness >= 80 ? "🔥 You're ready — start applying!" :
               readiness >= 50 ? "Solid foundation. Close the gaps below and you'll be competitive." :
               "Build up the missing skills — focus on the top 3 first."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SkillCard
              title="Skills you have"
              icon={<CheckCircle2 className="h-4 w-4" />}
              color="emerald"
              skills={have}
              empty="None of the target skills — time to start learning!"
            />
            <SkillCard
              title="Skills to learn (priority)"
              icon={<AlertTriangle className="h-4 w-4" />}
              color="ember"
              skills={missing}
              empty="Nothing missing — apply with confidence!"
            />
          </div>

          {bonus.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <h3 className="font-display font-semibold mb-2 text-sm">Bonus skills you have</h3>
              <p className="text-xs text-muted-foreground mb-3">Not required for this role, but can differentiate you.</p>
              <div className="flex flex-wrap gap-1.5">
                {bonus.map((s) => (
                  <span key={s} className="rounded-md bg-accent text-accent-foreground text-xs font-medium px-2.5 py-1">{s}</span>
                ))}
              </div>
            </div>
          )}

          {missing.length > 0 && (
            <div className="rounded-2xl border border-primary/40 bg-gradient-to-br from-card to-primary/5 p-6 shadow-card">
              <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" /> Next steps
              </h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="font-bold text-primary">1.</span>
                  Start with <span className="font-semibold text-foreground">{missing[0]}</span> — it's the highest-leverage skill for this role.
                </li>
                {missing[1] && (
                  <li className="flex gap-2">
                    <span className="font-bold text-primary">2.</span>
                    Then <span className="font-semibold text-foreground">{missing[1]}</span> — check <em>Study Material</em> for curated notes.
                  </li>
                )}
                <li className="flex gap-2">
                  <span className="font-bold text-primary">3.</span>
                  Take a <em>Mock Interview</em> at medium level once you've covered the top 3 gaps.
                </li>
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SkillCard({ title, icon, color, skills, empty }: { title: string; icon: React.ReactNode; color: "emerald" | "ember"; skills: string[]; empty: string }) {
  const klass = color === "emerald"
    ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
    : "bg-primary/10 text-primary border-primary/30";
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-center gap-2 mb-3">
        <span className={color === "emerald" ? "text-emerald-400" : "text-primary"}>{icon}</span>
        <h3 className="font-display font-semibold text-sm">{title}</h3>
        <span className="text-xs text-muted-foreground">· {skills.length}</span>
      </div>
      {skills.length === 0 ? (
        <p className="text-xs text-muted-foreground italic">{empty}</p>
      ) : (
        <div className="flex flex-wrap gap-1.5">
          {skills.map((s) => (
            <span key={s} className={`rounded-md border text-xs font-medium px-2.5 py-1 ${klass}`}>
              {s}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
