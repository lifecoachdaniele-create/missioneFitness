import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Dumbbell } from "lucide-react";
import { Lines } from "@/components/site/Reveal";

const EASE = [0.22, 1, 0.36, 1];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} id="top" data-testid="hero-section" className="relative min-h-[100svh] flex items-end overflow-hidden">
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 will-change-transform">
        <motion.img
          src="/assets/img3.jpeg" alt="Daniele, ideatore del Mind & Body Method, in palestra"
          className="w-full h-full object-cover object-top"
          initial={{ scale: 1.25, filter: "grayscale(1) brightness(0.6)" }}
          animate={{ scale: 1, filter: "grayscale(0.2) brightness(0.85)" }}
          transition={{ duration: 2.2, ease: EASE }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-black/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_35%,rgba(225,255,0,0.10),transparent_55%)] pointer-events-none" />

      <motion.div
        className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-6 text-[10px] tracking-[0.4em] text-neutral-400"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }}
      >
        <span className="[writing-mode:vertical-rl] rotate-180">SCORRI</span>
        <span className="h-24 w-px bg-white/20 relative overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-1/2 bg-acid scroll-line" />
        </span>
      </motion.div>

      <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 max-w-7xl mx-auto px-6 pb-20 md:pb-28 pt-40 w-full">
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
        >
          <img src="/assets/img4.jpg" alt="Logo Mind & Body" className="h-14 w-14 object-cover rounded-sm border border-white/20" />
          <span className="text-acid text-xs sm:text-sm font-bold tracking-[0.3em] flex items-center gap-2">
            <Dumbbell size={16} /> METODO IDEATO DA DANIELE
          </span>
        </motion.div>

        <h1 data-testid="hero-title" className="font-display text-[19vw] sm:text-8xl lg:text-[11rem] leading-[0.86] tracking-tight">
          <Lines onLoad delay={0.35} stagger={0.14} lines={["MIND & BODY", <span key="m" className="text-acid">METHOD</span>]} />
        </h1>

        <div className="mt-10 grid lg:grid-cols-[1fr_auto] gap-10 items-end">
          <motion.p
            data-testid="hero-subtitle"
            className="max-w-xl text-base md:text-lg text-neutral-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.95, ease: EASE }}
          >
            L'unico percorso che allena corpo e mente insieme. Fitness, Mindset e Lifestyle in un metodo progressivo in 4 fasi, creato da un laureato e professionista del settore. Versioni dedicate Uomo e Donna.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
          >
            <a href="#pacchetti" data-testid="hero-cta-packages"
              className="group bg-acid text-black font-bold px-8 py-4 text-sm flex items-center gap-2 hover:bg-white transition-colors duration-200">
              SCOPRI I PACCHETTI
              <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform duration-200" />
            </a>
            <a href="#metodo" data-testid="hero-cta-method"
              className="border border-white/30 text-white font-bold px-8 py-4 text-sm hover:border-acid hover:text-[#E1FF00] transition-colors duration-200 backdrop-blur-sm">
              COME FUNZIONA
            </a>
          </motion.div>
        </div>

        <motion.div
          className="mt-14 pt-6 border-t border-white/15 grid grid-cols-3 max-w-xl gap-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.4 }}
        >
          {[["04", "FASI PROGRESSIVE"], ["02", "PERCORSI: UOMO & DONNA"], ["03", "PILASTRI: CORPO, MENTE, VITA"]].map(([n, l]) => (
            <div key={l}>
              <p className="font-display text-4xl text-acid leading-none">{n}</p>
              <p className="text-[10px] tracking-[0.25em] text-neutral-400 mt-2">{l}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
