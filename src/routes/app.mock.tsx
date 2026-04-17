import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Clock, CheckCircle2, XCircle, Trophy, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/app/mock")({
  component: MockInterview,
});

type Level = "beginner" | "medium" | "hard";
type MCQ = { q: string; options: string[]; correct: number; explain: string };

const BANK: Record<Level, MCQ[]> = {
  beginner: [
    { q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Machine Lang", "Hyperlink Markup Lang", "Home Tool Markup Lang"], correct: 0, explain: "HTML = Hyper Text Markup Language — the structure of web pages." },
    { q: "Which data structure uses LIFO (Last In First Out)?", options: ["Queue", "Stack", "Array", "Linked List"], correct: 1, explain: "A stack is LIFO; the last pushed element is the first popped." },
    { q: "Which SQL keyword removes duplicate rows?", options: ["UNIQUE", "DISTINCT", "REMOVE", "DEDUPE"], correct: 1, explain: "SELECT DISTINCT removes duplicates from the result set." },
    { q: "What does API stand for?", options: ["Application Programming Interface", "Applied Program Interaction", "Automated Process Interface", "Application Public Index"], correct: 0, explain: "API = Application Programming Interface." },
    { q: "Which one is not a programming language?", options: ["Python", "Java", "HTML", "C++"], correct: 2, explain: "HTML is a markup language, not a programming language." },
    { q: "The time complexity of binary search is:", options: ["O(n)", "O(n log n)", "O(log n)", "O(1)"], correct: 2, explain: "Binary search halves the search space each step → O(log n)." },
  ],
  medium: [
    { q: "In React, when should you use useEffect's cleanup function?", options: ["Never", "To cancel subscriptions / timers", "To memoize values", "To batch state updates"], correct: 1, explain: "Cleanup runs before re-run and unmount — use it to cancel subscriptions, timers, listeners." },
    { q: "Which HTTP status indicates a successful POST that created a resource?", options: ["200", "201", "204", "301"], correct: 1, explain: "201 Created. 200 is generic success, 204 is success with no body." },
    { q: "What's the main benefit of database indexing?", options: ["Saves storage", "Faster writes", "Faster reads on indexed columns", "Encrypts data"], correct: 2, explain: "Indexes speed up reads but slightly slow down writes." },
    { q: "CSS z-index only works on elements that are:", options: ["Block level", "Positioned (relative/absolute/fixed/sticky)", "Inside flex containers", "Children of body"], correct: 1, explain: "z-index requires a non-static position (or a few other properties that create a stacking context)." },
    { q: "TCP vs UDP — which is connectionless?", options: ["TCP", "UDP", "Both", "Neither"], correct: 1, explain: "UDP is connectionless and fire-and-forget; TCP establishes a connection with handshake + retransmission." },
    { q: "Which Git command combines commits into one?", options: ["git merge", "git rebase -i", "git squash", "git fold"], correct: 1, explain: "Interactive rebase (git rebase -i) lets you squash commits." },
  ],
  hard: [
    { q: "In distributed systems, CAP theorem forces you to choose at most 2 of:", options: ["Consistency, Availability, Partition Tolerance", "Cost, Accuracy, Performance", "Cache, Auth, Persistence", "CPU, Ability, Power"], correct: 0, explain: "CAP: during a network partition you must choose between consistency and availability." },
    { q: "Which consistent hashing benefit is most important for caching?", options: ["Faster hashes", "Minimal key redistribution on node add/remove", "Better collision resistance", "Smaller memory"], correct: 1, explain: "Consistent hashing minimizes the keys that need to be moved when cluster size changes." },
    { q: "In transformer architecture, attention complexity is:", options: ["O(n)", "O(n log n)", "O(n²)", "O(1)"], correct: 2, explain: "Vanilla self-attention is O(n²) in sequence length. Flash-Attention and similar reduce wall-clock but not asymptotic cost." },
    { q: "React 19's compiler removes the need for:", options: ["JSX", "Hooks", "Manual useMemo/useCallback in most cases", "Suspense"], correct: 2, explain: "The compiler auto-memoizes, removing most manual memoization." },
    { q: "Which isolation level prevents phantom reads?", options: ["Read Uncommitted", "Read Committed", "Repeatable Read", "Serializable"], correct: 3, explain: "Only Serializable prevents phantom reads. Repeatable Read prevents non-repeatable reads but not phantoms (in most DBs)." },
    { q: "To achieve exactly-once semantics in Kafka, you need:", options: ["At-least-once + idempotent producers + transactions", "Higher replication factor", "Smaller batch size", "Synchronous acks only"], correct: 0, explain: "Idempotent producers + transactional writes + read_committed consumers give effective exactly-once." },
  ],
};

const LEVEL_TIME: Record<Level, number> = { beginner: 8 * 60, medium: 12 * 60, hard: 18 * 60 };

function MockInterview() {
  const [level, setLevel] = useState<Level | null>(null);
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const questions = level ? BANK[level] : [];

  useEffect(() => {
    if (!started || submitted || !level) return;
    if (timeLeft <= 0) {
      setSubmitted(true);
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [started, submitted, timeLeft, level]);

  const score = useMemo(() => {
    return questions.reduce((acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0), 0);
  }, [answers, questions]);

  const startExam = (l: Level) => {
    setLevel(l);
    setAnswers({});
    setSubmitted(false);
    setTimeLeft(LEVEL_TIME[l]);
    setStarted(true);
  };

  const reset = () => {
    setLevel(null);
    setStarted(false);
    setSubmitted(false);
    setAnswers({});
  };

  const min = Math.floor(timeLeft / 60);
  const sec = timeLeft % 60;

  // Level picker
  if (!started) {
    return (
      <div>
        <PageHeader
          eyebrow="Step 3 · Mock Interview"
          title="Take an exam-style test"
          description="Pick your level. A timer will start — answer all questions, then submit for your score and explanations."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {([
            { l: "beginner" as Level, title: "Beginner", time: "8 min", desc: "Fundamentals, terminology, basic concepts.", color: "from-emerald-500/20 to-emerald-500/5", accent: "text-emerald-400" },
            { l: "medium" as Level, title: "Medium", time: "12 min", desc: "Applied concepts, trade-offs, real-world scenarios.", color: "from-amber-500/20 to-amber-500/5", accent: "text-amber-400" },
            { l: "hard" as Level, title: "Hard", time: "18 min", desc: "System design, distributed systems, deep internals.", color: "from-rose-500/20 to-rose-500/5", accent: "text-rose-400" },
          ]).map((L) => (
            <button
              key={L.l}
              onClick={() => startExam(L.l)}
              className={`group rounded-2xl border border-border bg-gradient-to-br ${L.color} p-6 text-left hover:border-primary/40 hover:-translate-y-0.5 transition-all shadow-card`}
            >
              <div className={`text-[10px] uppercase tracking-[0.3em] font-bold ${L.accent}`}>{L.title}</div>
              <div className="font-display text-3xl font-bold mt-2">{L.time}</div>
              <p className="text-sm text-muted-foreground mt-2">{L.desc}</p>
              <div className="text-xs text-primary font-semibold mt-4">{BANK[L.l].length} questions →</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Results
  if (submitted) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div>
        <PageHeader eyebrow="Mock Interview · Results" title="Here's how you did" />
        <div className="rounded-2xl border border-border bg-gradient-to-br from-card to-primary/10 shadow-card p-8 mb-6 text-center relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <Trophy className="h-12 w-12 mx-auto text-primary mb-3 relative" />
          <div className="font-display text-6xl font-bold text-gradient-ember relative">{score}<span className="text-3xl text-muted-foreground">/{questions.length}</span></div>
          <div className="text-sm text-muted-foreground mt-2 relative">{pct}% — {pct >= 80 ? "Excellent! 🔥" : pct >= 60 ? "Solid work." : pct >= 40 ? "Keep practicing." : "Review the basics and try again."}</div>
          <button
            onClick={reset}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-gradient-ember px-4 py-2 text-sm font-semibold text-primary-foreground shadow-ember hover:scale-105 transition-transform relative"
          >
            <RotateCcw className="h-4 w-4" /> Take another test
          </button>
        </div>
        <div className="space-y-3">
          {questions.map((q, i) => {
            const picked = answers[i];
            const ok = picked === q.correct;
            return (
              <div key={i} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-start gap-2 mb-3">
                  {ok ? <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" /> : <XCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />}
                  <div className="font-medium text-sm">{i + 1}. {q.q}</div>
                </div>
                <div className="space-y-1 pl-7 text-sm">
                  {q.options.map((o, j) => (
                    <div key={j} className={`rounded-md px-2.5 py-1.5 ${
                      j === q.correct ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30" :
                      j === picked ? "bg-rose-500/10 text-rose-300 border border-rose-500/30" :
                      "text-muted-foreground"
                    }`}>
                      {o}
                    </div>
                  ))}
                </div>
                <div className="mt-3 pl-7 text-xs text-muted-foreground italic">{q.explain}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Exam
  const answered = Object.keys(answers).length;
  return (
    <div>
      <div className="sticky top-0 -mx-4 md:-mx-8 px-4 md:px-8 py-3 bg-background/90 backdrop-blur border-b border-border z-20 mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
            level === "beginner" ? "bg-emerald-500/15 text-emerald-400" :
            level === "medium" ? "bg-amber-500/15 text-amber-400" :
            "bg-rose-500/15 text-rose-400"
          }`}>{level}</div>
          <div className="text-xs text-muted-foreground">{answered}/{questions.length} answered</div>
        </div>
        <div className={`flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 font-mono text-sm font-bold ${
          timeLeft < 60 ? "text-rose-400 border-rose-500/40 animate-pulse" : ""
        }`}>
          <Clock className="h-4 w-4" />
          {String(min).padStart(2, "0")}:{String(sec).padStart(2, "0")}
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((q, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-5 shadow-card">
            <div className="font-display text-base font-semibold mb-3">{i + 1}. {q.q}</div>
            <div className="space-y-2">
              {q.options.map((opt, j) => (
                <label
                  key={j}
                  className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm cursor-pointer transition-all ${
                    answers[i] === j
                      ? "border-primary bg-primary/10"
                      : "border-border bg-input/30 hover:border-primary/40"
                  }`}
                >
                  <input
                    type="radio"
                    name={`q${i}`}
                    checked={answers[i] === j}
                    onChange={() => setAnswers({ ...answers, [i]: j })}
                    className="accent-primary"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mt-8">
        <button
          onClick={reset}
          className="rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold hover:bg-accent"
        >
          Cancel
        </button>
        <button
          onClick={() => setSubmitted(true)}
          disabled={answered === 0}
          className="flex-1 rounded-lg bg-gradient-ember px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-ember hover:scale-[1.01] active:scale-[0.99] transition-transform disabled:opacity-50"
        >
          Submit test ({answered}/{questions.length})
        </button>
      </div>
    </div>
  );
}
