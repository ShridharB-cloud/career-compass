import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Bot, Send, User as UserIcon, Sparkles } from "lucide-react";

export const Route = createFileRoute("/app/chatbot")({
  component: Chatbot,
});

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "How do I transition from a backend role to ML engineering?",
  "What skills should I learn for a product manager role?",
  "Review my resume — what's missing for a senior position?",
  "What are the most common system design interview patterns?",
];

// Simple canned responder — replaced by real AI when Lovable Cloud is enabled.
function respond(userMsg: string): string {
  const m = userMsg.toLowerCase();
  if (m.includes("resume") || m.includes("cv")) {
    return "Here's a quick framework for a strong resume:\n\n• **Top 3 lines matter most** — title, 1-sentence summary, contact.\n• Use the XYZ formula: *Accomplished [X] as measured by [Y] by doing [Z]*.\n• Quantify everything — % improved, users served, $ saved.\n• Tailor skills to the job description keywords.\n• Keep it to 1 page for <8 years experience.\n\nHead to the **Resume Builder** to generate yours in minutes.";
  }
  if (m.includes("interview")) {
    return "For interview prep, I recommend this order:\n\n1. **Fundamentals** — data structures + algorithms (LeetCode easy/medium).\n2. **Role-specific** — check the Interview Prep section for curated questions.\n3. **Behavioral** — prepare 6 STAR stories covering leadership, failure, conflict, impact.\n4. **Mock tests** — take our Mock Interview at your level and review explanations.\n\nWhat role are you targeting? I can get specific.";
  }
  if (m.includes("ml") || m.includes("machine learning") || m.includes("ai")) {
    return "To break into ML engineering:\n\n• **Foundations**: linear algebra, probability, calculus.\n• **Core**: scikit-learn → PyTorch/TF → one production project end-to-end.\n• **LLM era**: fine-tuning, RAG, serving (vLLM), evaluation.\n• **Portfolio**: 2–3 GitHub projects that solve a real problem, not Kaggle re-runs.\n\nCheck the **Study Material > AI/ML Engineering** track for notes and resources.";
  }
  if (m.includes("product") || m.includes("pm")) {
    return "For PM roles:\n\n• **Frameworks**: CIRCLES, RICE, JTBD, North Star.\n• **Read**: *Inspired* (Cagan), Lenny's Newsletter.\n• **Interview**: practice product design, estimation, strategy, and execution cases.\n• **Portfolio**: document 1–2 shipped features with problem → decision → outcome.\n\nWe have PM-specific questions in **Interview Prep**. Want me to walk you through a case?";
  }
  if (m.includes("skill gap") || m.includes("missing")) {
    return "Head to **Skill Gap Analysis** — enter your current skills and target role, and I'll tell you exactly what's missing and in what priority order.";
  }
  if (m.includes("job") || m.includes("hiring")) {
    return "Visit the **Job Opportunities** page for live roles filtered by type and level. Pay attention to the deadline chip — some close in under a week. Always tailor your resume to each application.";
  }
  return "Great question! Here's my take:\n\n• Break it into a concrete next step you can do this week.\n• Use one of the platform sections — **Resume Builder**, **Interview Prep**, **Mock Interview**, **Study Material**, **Jobs**, or **Skill Gap** — to go deeper.\n• Come back and tell me the outcome so I can help you iterate.\n\nWhat specific role or skill are you focused on right now?";
}

function Chatbot() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi! I'm your AI career mentor. Ask me anything about resumes, interviews, study plans, or breaking into a specific role.\n\nTip: connect Lovable Cloud and I can answer with real AI — for now I use curated responses." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Msg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: respond(text) }]);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-7rem)] min-h-[500px]">
      <PageHeader
        eyebrow="Step 3 · AI Chatbot"
        title="Your career mentor"
        description="Ask anything — get career guidance, study suggestions, and honest feedback."
      />

      <div className="flex-1 overflow-y-auto rounded-2xl border border-border bg-card shadow-card p-4 md:p-5 space-y-4 mb-4">
        {messages.map((m, i) => (
          <Bubble key={i} msg={m} />
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-ember text-primary-foreground shrink-0">
              <Bot className="h-4 w-4" />
            </div>
            <div className="rounded-2xl bg-accent/50 px-4 py-2.5 text-sm">
              <span className="inline-flex gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
              </span>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {messages.length === 1 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
            >
              <Sparkles className="h-3 w-3 text-primary" />
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => { e.preventDefault(); send(input); }}
        className="flex gap-2 rounded-2xl border border-border bg-card p-2 shadow-card"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about resumes, interviews, careers…"
          className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-ember px-4 py-2 text-sm font-semibold text-primary-foreground shadow-ember disabled:opacity-50 hover:scale-105 transition-transform"
        >
          <Send className="h-4 w-4" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>
    </div>
  );
}

function Bubble({ msg }: { msg: Msg }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div className={`flex h-8 w-8 items-center justify-center rounded-full shrink-0 ${
        isUser ? "bg-accent text-foreground" : "bg-gradient-ember text-primary-foreground"
      }`}>
        {isUser ? <UserIcon className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div className={`rounded-2xl px-4 py-2.5 text-sm max-w-[85%] whitespace-pre-wrap leading-relaxed ${
        isUser ? "bg-gradient-ember text-primary-foreground" : "bg-accent/50 text-foreground"
      }`}>
        {msg.content}
      </div>
    </div>
  );
}
