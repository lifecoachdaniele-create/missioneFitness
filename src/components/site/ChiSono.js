import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GraduationCap, Medal, Lightbulb } from "lucide-react";
import { Reveal, Lines, Stagger, item } from "@/components/site/Reveal";

const POINTS = [
  { icon: GraduationCap, text: "Laureato: un metodo costruito su basi scientifiche, non su improvvisazione." },
  { icon: Lightbulb, text: "Ideatore del Mind & Body Method: un percorso originale che non trovi da nessun'altra parte." },
  { icon: Medal, text: "Atleta e coach: ogni fase è testata in prima persona, sul campo, prima di arrivare a te." },
];

function Frame({ src, alt, className = "", style, label, testId }) {
  return (
    <motion.figure style={style} data-testid={testId} className={`group relative overflow-hidden border border-white/10 bg-[#141414] ${className}`}>
      <img src={src} alt={alt} loading="lazy"
        className="w-full h-full object-cover grayscale-[0.35] group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />
      <span className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,transparent_35%,rgba(10,10,10,0.75)_100%)] pointer-events-none" />
      {label && (
        <figcaption className="absolute left-4 bottom-4 text-[10px] tracking-[0.3em] text-neutral-300 flex items-center gap-2">
          <span className="h-px w-6 bg-acid" /> {label}
        </figcaption>
      )}
    </motion.figure>
  );
}

export default function ChiSono() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -30]);
  const y3 = useTransform(scrollYProgress, [0, 1], [30, -40]);

  return (
    <section ref={ref} id="chi-sono" data-testid="chi-sono-section" className="py-24 md:py-36 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-center">
        <div>
          <Reveal><p className="text-acid text-sm font-bold tracking-[0.3em] mb-6">CHI SONO</p></Reveal>
          <h2 data-testid="chi-sono-title" className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.92] mb-8">
            <Lines lines={["PRIMA DI", "CHIEDERLO A TE,", <span key="io">L'HO FATTO <span className="text-acid">IO</span>.</span>]} />
          </h2>
          <Reveal delay={0.25}>
            <p className="text-neutral-400 text-base md:text-lg leading-relaxed mb-10">
              Non ho improvvisato nulla. Da laureato ho unito studio scientifico e anni di pratica in palestra per creare un percorso che allena il corpo e forgia la mente: il <strong className="text-white">Mind &amp; Body Method</strong>. Un sistema in 4 fasi, diverso per Uomo e Donna, perché ogni corpo — e ogni mente — ha il suo percorso.
            </p>
          </Reveal>
          <Stagger className="space-y-6" gap={0.12}>
            {POINTS.map((pt, i) => (
              <motion.div key={i} variants={item} data-testid={`about-point-${i}`} className="flex items-start gap-4">
                <pt.icon size={24} className="text-acid shrink-0 mt-1" />
                <p className="text-neutral-300 text-sm md:text-base">{pt.text}</p>
              </motion.div>
            ))}
          </Stagger>
        </div>

        <div className="relative grid grid-cols-12 gap-5 md:gap-8" data-testid="chi-sono-gallery">
          <Frame testId="chi-sono-photo-main" style={{ y: y1 }} src="/assets/img1.jpeg" alt="Daniele, ideatore del Mind & Body Method"
            className="col-span-7 aspect-[3/4]" label="DANIELE — COACH" />
          <Frame testId="chi-sono-photo-2" style={{ y: y2 }} src="/assets/img5.jpeg" alt="Daniele durante una sessione di coaching in palestra"
            className="col-span-5 aspect-[4/5] self-end" label="SUL CAMPO" />
          <Frame testId="chi-sono-photo-3" style={{ y: y3 }} src="/assets/img6.jpeg" alt="Daniele in allenamento al rack"
            className="col-span-5 md:col-span-4 aspect-[3/4] mt-6 md:mt-14" label="ALLENAMENTO" />
          <Frame testId="chi-sono-photo-4" style={{ y: y1 }} src="/assets/img2.jpeg" alt="Daniele in allenamento"
            className="col-span-7 md:col-span-8 aspect-[16/10] self-start mt-6 md:mt-10" label="MIND & BODY METHOD" />
          <span className="absolute -top-6 -right-4 font-display text-8xl lg:text-9xl text-transparent [-webkit-text-stroke:1px_rgba(225,255,0,0.35)] pointer-events-none select-none hidden lg:block">
            M&amp;B
          </span>
        </div>
      </div>
    </section>
  );
}
