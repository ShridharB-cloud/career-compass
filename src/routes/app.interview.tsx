import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Search, ChevronDown, ChevronUp, Sparkles } from "lucide-react";

export const Route = createFileRoute("/app/interview")({
  component: InterviewPrep,
});

type Q = { q: string; a: string; level: "Easy" | "Medium" | "Hard"; tags: string[] };

const BANK: Record<string, Q[]> = {
  "Frontend (React)": [
    { q: "Explain the React reconciliation algorithm and how the virtual DOM helps.", a: "React builds a virtual DOM tree, diffs it against the previous tree, and applies only the minimal set of real DOM mutations. The 2022+ fiber architecture also enables interruptible rendering for concurrent features.", level: "Medium", tags: ["react", "dom"] },
    { q: "What's the difference between useMemo, useCallback, and React.memo in 2024 best practices?", a: "useMemo memoizes a computed value, useCallback memoizes a function reference, React.memo memoizes a component render. Use only when profiling shows a real cost — React 19's compiler removes most manual memoization.", level: "Medium", tags: ["react", "performance"] },
    { q: "How would you architect a design system shared across 5 product teams?", a: "Tokens → primitives → patterns → templates. Ship as a versioned package with Storybook, visual regression tests, and contribution guidelines. Use CSS variables so brands can theme without forking components.", level: "Hard", tags: ["architecture", "design-system"] },
    { q: "What are React Server Components and when would you use them?", a: "RSC render on the server, ship zero JS for that subtree, and can access backend resources directly. Use for data-heavy, interaction-light pages — mix with client components for interactivity.", level: "Hard", tags: ["react", "rsc"] },
    { q: "Explain CSS stacking contexts and the common z-index pitfalls.", a: "A stacking context is created by opacity<1, transform, filter, position + z-index, and a few others. z-index only competes within its own context — raising a modal above its parent requires the context to be at the root.", level: "Medium", tags: ["css"] },
  ],
  "Backend / System Design": [
    { q: "Design a URL shortener that scales to 1B URLs.", a: "Base62 encode an auto-increment ID. Shard the ID range across DBs. Cache hot URLs in Redis. Use async writes for analytics. Add a CDN in front for read path.", level: "Hard", tags: ["system-design"] },
    { q: "Explain idempotency and how you'd implement it for payment APIs.", a: "Client sends an Idempotency-Key header. Server stores (key → response) in a short-TTL store. Subsequent requests with the same key return the stored response without re-executing side effects.", level: "Medium", tags: ["api", "payments"] },
    { q: "SQL vs NoSQL for a social feed — which and why?", a: "Hybrid: Postgres for users/posts (strong consistency, joins), Redis/Cassandra for fan-out feed timelines (write-heavy, eventual consistency is fine).", level: "Medium", tags: ["databases"] },
    { q: "Walk through how HTTPS handshake and TLS 1.3 work.", a: "Client hello → server hello + certificate → key exchange (ECDHE) → session keys derived → encrypted application data. TLS 1.3 collapses the handshake to 1-RTT (0-RTT with PSK).", level: "Hard", tags: ["security", "networking"] },
  ],
  "Data Science / ML": [
    { q: "Bias-variance tradeoff — explain with a concrete example.", a: "High bias = underfitting (linear model on non-linear data). High variance = overfitting (deep tree on small data). Regularization, more data, and ensemble methods trade one for the other.", level: "Medium", tags: ["ml"] },
    { q: "How do you evaluate a classifier on an imbalanced dataset?", a: "Accuracy is misleading. Use precision, recall, F1, PR-AUC. Consider class weights, resampling (SMOTE), or threshold tuning based on the business cost of FP vs FN.", level: "Medium", tags: ["metrics"] },
    { q: "Explain attention and why transformers replaced RNNs.", a: "Attention computes a weighted sum of values using query-key similarity. Unlike RNNs, it parallelizes across sequence length and captures long-range dependencies directly.", level: "Hard", tags: ["nlp"] },
    { q: "What is data leakage and how do you prevent it?", a: "When training data contains info unavailable at inference (e.g., target encoding with the target). Prevent with strict train/val/test splits before any preprocessing, and time-based splits for temporal data.", level: "Medium", tags: ["ml"] },
  ],
  "Behavioral": [
    { q: "Tell me about a time you disagreed with your manager.", a: "STAR format: Situation, Task, Action, Result. Focus on respectful disagreement with data, how you escalated appropriately, and what the outcome taught you.", level: "Easy", tags: ["behavioral"] },
    { q: "Why are you leaving your current role?", a: "Frame around growth, not grievances. 'I've outgrown my current scope' > 'my manager is bad.' Connect the gap to what this new role offers.", level: "Easy", tags: ["behavioral"] },
    { q: "Describe your biggest failure and what you learned.", a: "Pick a real, owned failure with quantified impact. Show reflection, the specific habit/process you changed, and evidence it worked next time.", level: "Medium", tags: ["behavioral"] },
  ],
};

function InterviewPrep() {
  const [topic, setTopic] = useState<keyof typeof BANK>("Frontend (React)");
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState<"All" | "Easy" | "Medium" | "Hard">("All");
  const [open, setOpen] = useState<number | null>(0);

  const questions = useMemo(() => {
    return BANK[topic].filter((q) => {
      if (level !== "All" && q.level !== level) return false;
      if (search && !q.q.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [topic, search, level]);

  return (
    <div>
      <PageHeader
        eyebrow="Step 3 · Interview Prep"
        title="Crack your next interview"
        description="Curated, up-to-date questions for the roles you're targeting — with answer frameworks."
      />

      <div className="flex flex-wrap gap-2 mb-4">
        {Object.keys(BANK).map((t) => (
          <button
            key={t}
            onClick={() => setTopic(t as keyof typeof BANK)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${
              topic === t
                ? "bg-gradient-ember text-primary-foreground shadow-ember"
                : "border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/40"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions…"
            className="w-full rounded-lg border border-border bg-input pl-10 pr-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="flex gap-1 rounded-lg border border-border bg-card p-1">
          {(["All", "Easy", "Medium", "Hard"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                level === l ? "bg-gradient-ember text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
        <Sparkles className="h-3 w-3 text-primary" />
        {questions.length} question{questions.length !== 1 ? "s" : ""} — tap to reveal answer
      </div>

      <div className="space-y-2">
        {questions.map((q, i) => (
          <div key={i} className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-start gap-3 p-4 text-left hover:bg-accent/30 transition-colors"
            >
              <div className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                q.level === "Easy" ? "bg-emerald-500/15 text-emerald-400" :
                q.level === "Medium" ? "bg-amber-500/15 text-amber-400" :
                "bg-rose-500/15 text-rose-400"
              }`}>
                {q.level}
              </div>
              <div className="flex-1 font-medium text-sm">{q.q}</div>
              {open === i ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" /> : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />}
            </button>
            {open === i && (
              <div className="px-4 pb-4 pl-[68px]">
                <div className="rounded-lg bg-background border border-border p-3 text-sm text-muted-foreground leading-relaxed">
                  {q.a}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {q.tags.map((t) => (
                    <span key={t} className="text-[10px] font-mono text-primary bg-primary/10 rounded px-1.5 py-0.5">#{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        {questions.length === 0 && (
          <div className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            No questions match. Try changing filters.
          </div>
        )}
      </div>
    </div>
  );
}
