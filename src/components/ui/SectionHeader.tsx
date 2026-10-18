interface SectionHeaderProps {
  number?: string;
  kicker?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}

export default function SectionHeader({ number, kicker, title, intro, align = "left" }: SectionHeaderProps) {
  return (
    <header className={`mb-12 md:mb-16 max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {kicker && (
        <p className="font-display text-sm tracking-[0.2em] uppercase text-gold mb-4">
          {number && <span className="text-ash mr-3">{number}</span>}{kicker}
        </p>
      )}
      <h2 className="font-display text-4xl md:text-6xl font-semibold leading-[1.05] text-bone">{title}</h2>
      {intro && <p className="mt-5 text-lg md:text-xl text-bone-dim leading-relaxed">{intro}</p>}
    </header>
  );
}
