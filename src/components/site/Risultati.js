import { Quote } from "lucide-react";
import { Reveal, Stagger, item } from "@/components/site/Reveal";
import { motion } from "framer-motion";

const SHOTS = [
  { src: "/assets/andrea2.jpg", label: "PRIMA", alt: "Andrea prima del percorso Mind & Body Method" },
  { src: "/assets/andrea1.jpg", label: "DOPO", alt: "Andrea dopo il percorso Mind & Body Method" },
];

// Testimonianze: sostituire i testi con quelli reali forniti dai clienti.
const TESTIMONIALS = [
  { name: "Andrea", tag: "Percorso Complete Uomo", text: "Non cercavo miracoli, cercavo un metodo. Daniele mi ha dato una struttura chiara e la costanza è arrivata da sola. Il resto lo vedi nelle foto." },
  { name: "Marco", tag: "Fase 01 + 02 Uomo", text: "La parte mindset mi ha sorpreso: pensavo fosse un contorno, invece è quella che mi ha tenuto in palestra quando avrei mollato." },
  { name: "Giulia", tag: "Fase 01 Donna + Piano alimentare", text: "Finalmente un piano gambe e glutei con un'alimentazione coerente, senza rinunce assurde. Semplice da seguire anche con il lavoro." },
];

export default function Risultati() {
  return (
    <section id="risultati" data-testid="risultati-section" className="py-20 md:py-28 border-t border-white/10 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">
        <Reveal>
          <p className="text-acid text-sm font-bold tracking-[0.3em] mb-6">UN ESEMPIO REALE</p>
          <h2 data-testid="risultati-title" className="font-display text-4xl sm:text-5xl leading-[0.95] mb-6">
            ANDREA, SEGUITO DA <span className="text-acid">DANIELE</span>.
          </h2>
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-md">
            Un ragazzo normale, con un lavoro e poco tempo. Nessuna scorciatoia: allenamento progressivo, alimentazione coerente con la fase e la costanza costruita modulo dopo modulo. Questo è il metodo applicato, non una promessa.
          </p>
          <p className="text-neutral-600 text-xs mt-6 max-w-md">
            I risultati variano da persona a persona e dipendono da costanza, alimentazione e punto di partenza. Foto pubblicate con il consenso dell'interessato.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="grid grid-cols-2 gap-4 max-w-xl lg:ml-auto" data-testid="risultati-gallery">
            {SHOTS.map((s) => (
              <figure key={s.label} data-testid={`risultati-photo-${s.label.toLowerCase()}`} className="group relative overflow-hidden border border-white/10 bg-[#141414] aspect-[3/4] max-h-[420px]">
                <img src={s.src} alt={s.alt} loading="lazy"
                  className="w-full h-full object-cover object-top grayscale-[0.25] group-hover:grayscale-0 transition-all duration-700" />
                <figcaption className="absolute left-3 top-3 bg-[#0A0A0A]/85 backdrop-blur px-3 py-1 font-display text-lg tracking-wider border-l-2 border-acid">
                  {s.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 md:mt-20">
      <Stagger className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10" gap={0.12} data-testid="testimonials-row">
        {TESTIMONIALS.map((t) => (
          <motion.blockquote key={t.name} variants={item} data-testid={`testimonial-${t.name.toLowerCase()}`}
            className="bg-[#0A0A0A] p-7 md:p-8 flex flex-col gap-4 hover:bg-[#141414] transition-colors duration-500">
            <Quote size={18} className="text-acid" />
            <p className="text-neutral-300 text-sm leading-relaxed flex-1">“{t.text}”</p>
            <footer className="text-xs">
              <span className="font-display text-lg tracking-wider text-white">{t.name.toUpperCase()}</span>
              <span className="block text-neutral-500 mt-0.5">{t.tag}</span>
            </footer>
          </motion.blockquote>
        ))}
      </Stagger>
      </div>
    </section>
  );
}
