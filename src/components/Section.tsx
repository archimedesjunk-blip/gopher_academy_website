export function Section({
  id,
  eyebrow,
  children,
  className = "",
}: {
  id: string;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`px-6 py-24 md:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl">
        {eyebrow && (
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            {eyebrow}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
