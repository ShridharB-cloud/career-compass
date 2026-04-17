import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Download, Sparkles, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/resume")({
  component: ResumeBuilder,
});

type Experience = { role: string; company: string; period: string; detail: string };
type Education = { school: string; degree: string; period: string };

function ResumeBuilder() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState("");
  const [experiences, setExperiences] = useState<Experience[]>([
    { role: "", company: "", period: "", detail: "" },
  ]);
  const [education, setEducation] = useState<Education[]>([
    { school: "", degree: "", period: "" },
  ]);

  const skillList = skills.split(",").map((s) => s.trim()).filter(Boolean);

  const handlePrint = () => {
    if (!name) {
      toast.error("Add your name first");
      return;
    }
    window.print();
  };

  return (
    <div>
      <PageHeader
        eyebrow="Step 3 · Resume Builder"
        title="Build your resume"
        description="Fill in your details on the left — your polished resume renders live on the right."
        actions={
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-ember px-4 py-2 text-sm font-semibold text-primary-foreground shadow-ember hover:scale-105 transition-transform print:hidden"
          >
            <Download className="h-4 w-4" /> Download PDF
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-6 print:block">
        {/* Form */}
        <div className="space-y-5 print:hidden">
          <Card title="Personal info">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Full name" value={name} onChange={setName} placeholder="Jane Doe" />
              <Field label="Title" value={title} onChange={setTitle} placeholder="Data Scientist" />
              <Field label="Email" value={email} onChange={setEmail} placeholder="you@example.com" />
              <Field label="Phone" value={phone} onChange={setPhone} placeholder="+1 555…" />
              <div className="sm:col-span-2">
                <Field label="Location" value={location} onChange={setLocation} placeholder="Bangalore, India" />
              </div>
            </div>
          </Card>

          <Card title="Professional summary" icon={<Sparkles className="h-4 w-4" />}>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={4}
              placeholder="2–3 sentences about your expertise and what you're looking for…"
              className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-y"
            />
          </Card>

          <Card title="Skills" hint="Comma separated">
            <input
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Python, React, AWS, SQL…"
              className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </Card>

          <Card
            title="Experience"
            action={
              <button
                onClick={() => setExperiences([...experiences, { role: "", company: "", period: "", detail: "" }])}
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            }
          >
            <div className="space-y-4">
              {experiences.map((ex, i) => (
                <div key={i} className="rounded-lg border border-border bg-input/50 p-3 space-y-2 relative">
                  {experiences.length > 1 && (
                    <button
                      onClick={() => setExperiences(experiences.filter((_, j) => j !== i))}
                      className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <MiniField v={ex.role} on={(v) => setExperiences(experiences.map((e, j) => j === i ? { ...e, role: v } : e))} p="Role" />
                    <MiniField v={ex.company} on={(v) => setExperiences(experiences.map((e, j) => j === i ? { ...e, company: v } : e))} p="Company" />
                  </div>
                  <MiniField v={ex.period} on={(v) => setExperiences(experiences.map((e, j) => j === i ? { ...e, period: v } : e))} p="2022 — Present" />
                  <textarea
                    value={ex.detail}
                    onChange={(e) => setExperiences(experiences.map((x, j) => j === i ? { ...x, detail: e.target.value } : x))}
                    rows={2}
                    placeholder="Key achievements and responsibilities…"
                    className="w-full rounded-md border border-border bg-input px-2.5 py-1.5 text-xs outline-none focus:border-primary resize-y"
                  />
                </div>
              ))}
            </div>
          </Card>

          <Card
            title="Education"
            action={
              <button
                onClick={() => setEducation([...education, { school: "", degree: "", period: "" }])}
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            }
          >
            <div className="space-y-3">
              {education.map((ed, i) => (
                <div key={i} className="rounded-lg border border-border bg-input/50 p-3 space-y-2 relative">
                  {education.length > 1 && (
                    <button
                      onClick={() => setEducation(education.filter((_, j) => j !== i))}
                      className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <MiniField v={ed.school} on={(v) => setEducation(education.map((e, j) => j === i ? { ...e, school: v } : e))} p="School / University" />
                  <div className="grid grid-cols-2 gap-2">
                    <MiniField v={ed.degree} on={(v) => setEducation(education.map((e, j) => j === i ? { ...e, degree: v } : e))} p="Degree" />
                    <MiniField v={ed.period} on={(v) => setEducation(education.map((e, j) => j === i ? { ...e, period: v } : e))} p="2018 — 2022" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Preview */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-2xl border border-border bg-white text-zinc-900 shadow-card overflow-hidden print:border-0 print:shadow-none print:rounded-none">
            <div className="bg-gradient-ember text-primary-foreground px-6 md:px-10 py-6 md:py-8">
              <div className="font-display text-2xl md:text-3xl font-bold">{name || "Your Name"}</div>
              <div className="text-sm opacity-90 mt-0.5">{title || "Your Professional Title"}</div>
              <div className="text-xs opacity-80 mt-2 flex flex-wrap gap-x-3">
                {email && <span>{email}</span>}
                {phone && <span>· {phone}</span>}
                {location && <span>· {location}</span>}
              </div>
            </div>
            <div className="p-6 md:p-10 space-y-5 text-sm">
              {summary && (
                <Section title="Summary">
                  <p className="text-zinc-700 leading-relaxed">{summary}</p>
                </Section>
              )}
              {skillList.length > 0 && (
                <Section title="Skills">
                  <div className="flex flex-wrap gap-1.5">
                    {skillList.map((s, i) => (
                      <span key={i} className="rounded-md bg-zinc-100 border border-zinc-200 px-2 py-0.5 text-xs font-medium text-zinc-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </Section>
              )}
              {experiences.some((e) => e.role || e.company) && (
                <Section title="Experience">
                  <div className="space-y-3">
                    {experiences.map((ex, i) => (ex.role || ex.company) && (
                      <div key={i}>
                        <div className="flex justify-between items-baseline gap-2 flex-wrap">
                          <div className="font-semibold">{ex.role || "Role"}{ex.company && <span className="text-zinc-500 font-normal"> · {ex.company}</span>}</div>
                          <div className="text-xs text-zinc-500">{ex.period}</div>
                        </div>
                        {ex.detail && <p className="text-zinc-700 mt-1 leading-relaxed">{ex.detail}</p>}
                      </div>
                    ))}
                  </div>
                </Section>
              )}
              {education.some((e) => e.school || e.degree) && (
                <Section title="Education">
                  <div className="space-y-2">
                    {education.map((ed, i) => (ed.school || ed.degree) && (
                      <div key={i} className="flex justify-between items-baseline gap-2 flex-wrap">
                        <div>
                          <span className="font-semibold">{ed.degree || "Degree"}</span>
                          {ed.school && <span className="text-zinc-500"> · {ed.school}</span>}
                        </div>
                        <div className="text-xs text-zinc-500">{ed.period}</div>
                      </div>
                    ))}
                  </div>
                </Section>
              )}
              {!name && !summary && skillList.length === 0 && (
                <div className="text-center text-zinc-400 py-8 text-sm">
                  Start filling in your details — your resume appears here.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, children, hint, action, icon }: { title: string; children: React.ReactNode; hint?: string; action?: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {icon && <span className="text-primary">{icon}</span>}
          <h3 className="font-display font-semibold">{title}</h3>
          {hint && <span className="text-xs text-muted-foreground">· {hint}</span>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </label>
  );
}

function MiniField({ v, on, p }: { v: string; on: (v: string) => void; p: string }) {
  return (
    <input
      value={v}
      onChange={(e) => on(e.target.value)}
      placeholder={p}
      className="w-full rounded-md border border-border bg-input px-2.5 py-1.5 text-xs outline-none focus:border-primary"
    />
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-orange-600 mb-2 border-b border-zinc-200 pb-1.5">
        {title}
      </div>
      {children}
    </div>
  );
}
