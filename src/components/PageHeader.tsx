import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && (
          <div className="text-[10px] uppercase tracking-[0.3em] text-primary font-semibold mb-2">
            {eyebrow}
          </div>
        )}
        <h1 className="font-display text-3xl md:text-4xl font-bold leading-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </header>
  );
}
