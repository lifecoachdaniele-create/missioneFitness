const WORDS = ["FITNESS", "MINDSET", "LIFESTYLE", "METODO ORIGINALE", "4 FASI", "UOMO & DONNA"];

export default function Marquee() {
  const row = [...WORDS, ...WORDS];
  return (
    <div data-testid="marquee-strip" className="relative overflow-hidden border-y border-white/10 bg-[#0A0A0A] py-5 select-none">
      <div className="marquee-track flex whitespace-nowrap gap-10 w-max">
        {[0, 1].map((k) => (
          <div key={k} className="flex items-center gap-10" aria-hidden={k === 1}>
            {row.map((w, i) => (
              <span key={i} className="flex items-center gap-10 font-display text-3xl md:text-4xl tracking-wide text-neutral-500">
                <span className={i % 3 === 1 ? "text-acid" : ""}>{w}</span>
                <span className="h-2 w-2 bg-acid rotate-45 inline-block" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
