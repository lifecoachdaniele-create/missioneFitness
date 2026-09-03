import { Dumbbell, Brain, HeartPulse } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal, Lines, Stagger, item } from "@/components/site/Reveal";

const CHAPTERS = [
  { n: "01", icon: Dumbbell, title: "FITNESS", claim: "Il corpo si costruisce con un piano, non con la fortuna.", desc: "Schede d'allenamento progressive in 4 fasi, dalla costruzione delle basi alla massima performance. Volumi, intensità e progressioni calibrati su Uomo e Donna." },
  { n: "02", icon: Brain, title: "MINDSET", claim: "La disciplina è un muscolo. Si allena.", desc: "Il workbook mentale che trasforma la motivazione in abitudine e l'abitudine in identità. Perché il corpo segue la mente, mai il contrario." },
  { n: "03", icon: HeartPulse, title: "LIFESTYLE", claim: "I risultati che durano si decidono fuori dalla palestra.", desc: "Alimentazione, sonno, routine quotidiana: il sistema di vita che rende permanente ciò che hai costruito allenandoti." },
];

const FASI = [
  { n: "01", t: "Fondamenta", d: "Costruisci la base: tecnica, costanza e prime abitudini vincenti." },
  { n: "02", t: "Accelerazione", d: "Intensità crescente, nuovi stimoli e mentalità da atleta." },
  { n: "03", t: "Trasformazione", d: "Corpo, mente e stile di vita finalmente allineati." },
  { n: "04", t: "Maestria", d: "Il livello più alto: mantieni i risultati e supera i tuoi limiti." },
];

function Chapter({ c, i }) {
  return (
    <motion.article
      data-testid={`pillar-${c.title.toLowerCase()}`}
      variants={item}
      className="group relative grid md:grid-cols-[140px_1fr_1.2fr] gap-6 md:gap-12 items-start py-12 border-t border-white/10 last:border-b overflow-hidden"
    >
      <span className="absolute inset-0 bg-[#141414] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] -z-10" />
      <span className="font-display text-7xl md:text-8xl leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.35)] group-hover:text-acid group-hover:[-webkit-text-stroke:0px] transition-colors duration-500">
        {c.n}
      </span>
      <div>
        <c.icon size={28} className="text-acid mb-4" />
        <h3 className="font-display text-5xl md:text-6xl leading-none">{c.title}</h3>
        <p className="mt-3 text-white/90 font-semibold text-sm md:text-base max-w-xs">{c.claim}</p>
      </div>
      <p className="text-neutral-400 text-sm md:text-base leading-relaxed md:pt-12">{c.desc}</p>
    </motion.article>
  );
}

export default function Metodo() {
  return (
    <section id="metodo" data-testid="metodo-section" className="py-24 md:py-36 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal><p className="text-acid text-sm font-bold tracking-[0.3em] mb-6">IL METODO — MANIFESTO</p></Reveal>
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-12 items-end mb-20 md:mb-28">
          <h2 className="font-display text-5xl sm:text-6xl lg:text-8xl leading-[0.92]">
            <Lines lines={["NON UN SEMPLICE", "ALLENAMENTO.", <span key="m">UN <span className="text-acid">METODO</span>.</span>]} />
          </h2>
          <Reveal delay={0.3}>
            <p className="text-neutral-400 text-base md:text-lg max-w-lg">
              Il Mind &amp; Body Method è un percorso originale ideato da Daniele, laureato e coach. Nasce da anni di studio e pratica sul campo: un sistema in 4 fasi che integra allenamento, psicologia del comportamento e stile di vita. Disponibile in versione Uomo e Donna.
            </p>
          </Reveal>
        </div>

        <Stagger gap={0.15}>
          {CHAPTERS.map((c, i) => <Chapter key={c.n} c={c} i={i} />)}
        </Stagger>

        <div className="mt-28 md:mt-36">
          <Reveal>
            <div className="flex items-end justify-between mb-10 gap-6">
              <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-none">LE <span className="text-acid">4 FASI</span></h3>
              <p className="text-neutral-500 text-xs tracking-[0.25em] hidden sm:block">PROGRESSIONE · UOMO & DONNA</p>
            </div>
          </Reveal>
          <Stagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10" gap={0.1}>
            {FASI.map((f) => (
              <motion.div key={f.n} variants={item} data-testid={`fase-card-${f.n}`}
                className="group bg-[#0A0A0A] p-8 md:p-10 hover:bg-[#141414] transition-colors duration-500 relative overflow-hidden">
                <span className="absolute -right-4 -top-6 font-display text-[9rem] leading-none text-white/[0.04] group-hover:text-acid/10 transition-colors duration-500">{f.n}</span>
                <span className="font-display text-6xl text-acid relative">{f.n}</span>
                <h4 className="font-display text-2xl mt-6 mb-2 relative">FASE {f.n} — {f.t.toUpperCase()}</h4>
                <p className="text-neutral-400 text-sm relative">{f.d}</p>
                <span className="block h-px w-8 bg-acid mt-6 group-hover:w-full transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />
              </motion.div>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
