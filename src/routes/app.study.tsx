import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { BookOpen, ExternalLink, Brain, Database, Package, Shield, Cloud } from "lucide-react";

export const Route = createFileRoute("/app/study")({
  component: StudyMaterial,
});

type Track = {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  blurb: string;
  topics: { title: string; notes: string[]; resources: { label: string; url: string }[] }[];
};

const tracks: Track[] = [
  {
    id: "aiml",
    title: "AI / ML Engineering",
    icon: Brain,
    blurb: "From linear regression to transformers, MLOps, and LLM deployment.",
    topics: [
      {
        title: "Foundations",
        notes: [
          "Linear algebra: vectors, matrices, eigenvalues — the backbone of every model.",
          "Probability: Bayes' theorem, distributions, MLE/MAP.",
          "Calculus: gradients, chain rule — how backprop actually works.",
        ],
        resources: [
          { label: "3Blue1Brown — Essence of Linear Algebra", url: "https://www.3blue1brown.com/topics/linear-algebra" },
          { label: "Stanford CS229", url: "https://cs229.stanford.edu/" },
        ],
      },
      {
        title: "Deep Learning",
        notes: [
          "Neural nets: forward pass, loss, backprop, optimizers (Adam vs SGD).",
          "CNNs for vision, RNN→LSTM→Transformers for sequence.",
          "Attention: Q·Kᵀ/√d · V — read the original 'Attention Is All You Need'.",
        ],
        resources: [
          { label: "Deep Learning Book (Goodfellow)", url: "https://www.deeplearningbook.org/" },
          { label: "Karpathy — Neural Networks: Zero to Hero", url: "https://karpathy.ai/zero-to-hero.html" },
        ],
      },
      {
        title: "LLMs & MLOps",
        notes: [
          "Fine-tuning vs RAG vs prompt engineering — when to use which.",
          "Serving: vLLM, TGI, quantization (GPTQ/AWQ), batching.",
          "Evaluation: BLEU is dead, use LLM-as-judge with rubrics.",
        ],
        resources: [
          { label: "Hugging Face course", url: "https://huggingface.co/learn" },
        ],
      },
    ],
  },
  {
    id: "data",
    title: "Data Science",
    icon: Database,
    blurb: "Statistics, SQL, experimentation, and turning data into decisions.",
    topics: [
      {
        title: "SQL & Analytics",
        notes: [
          "Window functions (ROW_NUMBER, LAG, running totals) separate seniors from juniors.",
          "CTEs > subqueries for readability.",
          "Know EXPLAIN ANALYZE — query plans tell you where indexes are missing.",
        ],
        resources: [
          { label: "Mode SQL Tutorial", url: "https://mode.com/sql-tutorial/" },
        ],
      },
      {
        title: "Statistics & A/B Testing",
        notes: [
          "p-value ≠ probability the null is true. It's P(data | null).",
          "Power analysis before the test, not after.",
          "Watch for SRM (sample ratio mismatch) — it usually means a bug.",
        ],
        resources: [
          { label: "StatQuest", url: "https://statquest.org/" },
        ],
      },
    ],
  },
  {
    id: "pm",
    title: "Product Manager",
    icon: Package,
    blurb: "Strategy, discovery, prioritization, and shipping.",
    topics: [
      {
        title: "Discovery & Frameworks",
        notes: [
          "JTBD (Jobs to be Done): customers hire products to do a job.",
          "RICE scoring: Reach × Impact × Confidence ÷ Effort.",
          "North star metric = single number that captures product value.",
        ],
        resources: [
          { label: "Lenny's Newsletter", url: "https://www.lennysnewsletter.com/" },
          { label: "Inspired — Marty Cagan", url: "https://svpg.com/" },
        ],
      },
      {
        title: "Interview Frameworks",
        notes: [
          "Product design: CIRCLES (Comprehend, Identify user, Report needs, Cut, List solutions, Evaluate, Summarize).",
          "Estimation: top-down vs bottom-up — state assumptions explicitly.",
          "Strategy: use Porter's 5 forces or moat analysis.",
        ],
        resources: [
          { label: "Exponent", url: "https://www.tryexponent.com/" },
        ],
      },
    ],
  },
  {
    id: "cyber",
    title: "Cybersecurity",
    icon: Shield,
    blurb: "AppSec, network security, and offensive/defensive fundamentals.",
    topics: [
      {
        title: "AppSec Fundamentals",
        notes: [
          "OWASP Top 10: Injection, Broken Access Control, XSS, SSRF…",
          "Auth: prefer OAuth 2.1 / OIDC over rolling your own.",
          "Secrets: never in code — use a vault.",
        ],
        resources: [
          { label: "OWASP", url: "https://owasp.org/www-project-top-ten/" },
          { label: "PortSwigger Web Security Academy", url: "https://portswigger.net/web-security" },
        ],
      },
      {
        title: "Networking & Crypto",
        notes: [
          "TLS 1.3 handshake, certificate pinning, HSTS.",
          "Symmetric (AES-GCM) vs asymmetric (RSA/ECDSA).",
          "Hashing ≠ encryption — use Argon2id for passwords.",
        ],
        resources: [
          { label: "Cryptopals challenges", url: "https://cryptopals.com/" },
        ],
      },
    ],
  },
  {
    id: "cloud",
    title: "Cloud Engineering",
    icon: Cloud,
    blurb: "AWS/GCP/Azure, infrastructure as code, and reliability.",
    topics: [
      {
        title: "Core Services",
        notes: [
          "Compute: EC2 / ECS / Lambda — know the cost curve.",
          "Storage: S3 tiers (Standard → Glacier) and lifecycle rules.",
          "Networking: VPC, subnets, NAT, security groups vs NACLs.",
        ],
        resources: [
          { label: "AWS Well-Architected", url: "https://aws.amazon.com/architecture/well-architected/" },
        ],
      },
      {
        title: "IaC & Reliability",
        notes: [
          "Terraform > Click-ops. Always. State in remote backend with locking.",
          "SLOs, error budgets, and the 4 golden signals (latency, traffic, errors, saturation).",
          "Chaos engineering: break things on purpose to find weak spots.",
        ],
        resources: [
          { label: "Google SRE Book", url: "https://sre.google/sre-book/table-of-contents/" },
        ],
      },
    ],
  },
];

function StudyMaterial() {
  const [active, setActive] = useState(tracks[0].id);
  const track = tracks.find((t) => t.id === active)!;
  const Icon = track.icon;

  return (
    <div>
      <PageHeader
        eyebrow="Step 3 · Study Material"
        title="Deep notes by specialization"
        description="Curated notes and resources for each career track — the stuff that actually comes up."
      />

      <div className="flex flex-wrap gap-2 mb-6">
        {tracks.map((t) => {
          const I = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                active === t.id
                  ? "bg-gradient-ember text-primary-foreground shadow-ember"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
            >
              <I className="h-4 w-4" />
              {t.title}
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border border-border bg-gradient-to-br from-card to-primary/5 p-6 md:p-8 shadow-card mb-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-ember text-primary-foreground shadow-ember">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold">{track.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{track.blurb}</p>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {track.topics.map((topic, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card shadow-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-4 w-4 text-primary" />
              <h3 className="font-display text-lg font-semibold">{topic.title}</h3>
            </div>
            <ul className="space-y-2 mb-4">
              {topic.notes.map((n, j) => (
                <li key={j} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-ember" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
            {topic.resources.length > 0 && (
              <div className="border-t border-border pt-4">
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2">Resources</div>
                <div className="flex flex-wrap gap-2">
                  {topic.resources.map((r) => (
                    <a
                      key={r.url}
                      href={r.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-input/30 px-3 py-1.5 text-xs font-medium hover:border-primary/40 hover:text-primary transition-colors"
                    >
                      {r.label} <ExternalLink className="h-3 w-3" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
