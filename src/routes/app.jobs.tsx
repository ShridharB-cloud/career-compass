import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { MapPin, Building2, Calendar, Briefcase, ExternalLink, Search } from "lucide-react";

export const Route = createFileRoute("/app/jobs")({
  component: Jobs,
});

type Job = {
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Internship" | "Contract";
  level: "Entry" | "Mid" | "Senior";
  tags: string[];
  postedDays: number;
  deadlineDays: number;
  salary?: string;
  url: string;
};

const JOBS: Job[] = [
  { title: "AI/ML Engineer", company: "Scale AI", location: "Remote · Global", type: "Full-time", level: "Mid", tags: ["Python", "PyTorch", "LLMs"], postedDays: 2, deadlineDays: 21, salary: "$140k–$180k", url: "https://scale.com/careers" },
  { title: "Data Scientist (Growth)", company: "Razorpay", location: "Bangalore, IN", type: "Full-time", level: "Senior", tags: ["SQL", "Experimentation", "Python"], postedDays: 5, deadlineDays: 14, salary: "₹45L–₹70L", url: "https://razorpay.com/jobs" },
  { title: "Associate Product Manager", company: "Atlassian", location: "Sydney · Remote", type: "Full-time", level: "Entry", tags: ["PM", "Analytics"], postedDays: 1, deadlineDays: 30, salary: "AU$110k", url: "https://www.atlassian.com/company/careers" },
  { title: "Security Engineer", company: "GitHub", location: "Remote · US/EU", type: "Full-time", level: "Mid", tags: ["AppSec", "Go", "Code Review"], postedDays: 7, deadlineDays: 10, salary: "$155k–$210k", url: "https://github.com/about/careers" },
  { title: "Cloud Engineer (AWS)", company: "Stripe", location: "Dublin, IE", type: "Full-time", level: "Senior", tags: ["AWS", "Terraform", "Kubernetes"], postedDays: 3, deadlineDays: 25, salary: "€95k–€140k", url: "https://stripe.com/jobs" },
  { title: "ML Research Intern", company: "Anthropic", location: "San Francisco, US", type: "Internship", level: "Entry", tags: ["Research", "Python", "LLMs"], postedDays: 1, deadlineDays: 7, salary: "$10k/mo", url: "https://www.anthropic.com/careers" },
  { title: "Frontend Engineer", company: "Vercel", location: "Remote · Global", type: "Full-time", level: "Mid", tags: ["React", "Next.js", "TypeScript"], postedDays: 4, deadlineDays: 20, salary: "$130k–$170k", url: "https://vercel.com/careers" },
  { title: "Product Analytics Contract", company: "Notion", location: "Remote · Americas", type: "Contract", level: "Mid", tags: ["SQL", "Amplitude"], postedDays: 10, deadlineDays: 5, url: "https://notion.so/careers" },
];

function Jobs() {
  const [q, setQ] = useState("");
  const [type, setType] = useState<"All" | Job["type"]>("All");
  const [level, setLevel] = useState<"All" | Job["level"]>("All");

  const filtered = useMemo(() => {
    return JOBS.filter((j) => {
      if (type !== "All" && j.type !== type) return false;
      if (level !== "All" && j.level !== level) return false;
      if (q) {
        const s = q.toLowerCase();
        if (!j.title.toLowerCase().includes(s) && !j.company.toLowerCase().includes(s) && !j.tags.some((t) => t.toLowerCase().includes(s))) return false;
      }
      return true;
    });
  }, [q, type, level]);

  return (
    <div>
      <PageHeader
        eyebrow="Step 3 · Job Opportunities"
        title="Live roles, hiring now"
        description="Filter by type and level. Apply before the deadline runs out."
      />

      <div className="flex flex-col gap-3 mb-5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by role, company, or skill…"
            className="w-full rounded-lg border border-border bg-input pl-10 pr-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Filter label="Type" value={type} setValue={setType} options={["All", "Full-time", "Internship", "Contract"]} />
          <Filter label="Level" value={level} setValue={setLevel} options={["All", "Entry", "Mid", "Senior"]} />
        </div>
      </div>

      <div className="text-xs text-muted-foreground mb-4">
        {filtered.length} role{filtered.length !== 1 ? "s" : ""} found
      </div>

      <div className="space-y-3">
        {filtered.map((j, i) => (
          <div key={i} className="group rounded-2xl border border-border bg-card p-5 md:p-6 shadow-card hover:border-primary/40 transition-all">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-ember text-primary-foreground font-display font-bold shadow-ember">
                    {j.company[0]}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-semibold leading-tight">{j.title}</h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1"><Building2 className="h-3 w-3" /> {j.company}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {j.location}</span>
                      <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" /> {j.type}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {j.tags.map((t) => (
                    <span key={t} className="rounded-md bg-primary/10 text-primary text-[11px] font-medium px-2 py-0.5">{t}</span>
                  ))}
                  <span className={`rounded-md text-[11px] font-medium px-2 py-0.5 ${
                    j.level === "Entry" ? "bg-emerald-500/10 text-emerald-400" :
                    j.level === "Mid" ? "bg-amber-500/10 text-amber-400" :
                    "bg-rose-500/10 text-rose-400"
                  }`}>{j.level}</span>
                </div>
              </div>
              <div className="md:text-right flex md:flex-col md:items-end justify-between gap-2 shrink-0">
                {j.salary && <div className="text-sm font-semibold text-gradient-ember">{j.salary}</div>}
                <div className={`flex items-center gap-1 text-xs ${j.deadlineDays <= 7 ? "text-rose-400" : "text-muted-foreground"}`}>
                  <Calendar className="h-3 w-3" />
                  {j.deadlineDays <= 7 ? `Closes in ${j.deadlineDays}d` : `${j.deadlineDays} days left`}
                </div>
                <div className="text-[10px] text-muted-foreground">Posted {j.postedDays}d ago</div>
                <a
                  href={j.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-ember px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-ember hover:scale-105 transition-transform"
                >
                  Apply <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            No matching roles. Try broadening your filters.
          </div>
        )}
      </div>
    </div>
  );
}

function Filter<T extends string>({ label, value, setValue, options }: { label: string; value: T; setValue: (v: T) => void; options: readonly T[] }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-lg border border-border bg-card p-1">
      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2">{label}</span>
      {options.map((o) => (
        <button
          key={o}
          onClick={() => setValue(o)}
          className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
            value === o ? "bg-gradient-ember text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
