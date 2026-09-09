import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Clock, BadgePercent, ExternalLink, FlaskConical } from "lucide-react";
import { toast } from "sonner";
import { Reveal, Lines } from "@/components/site/Reveal";
import { startCheckout, isFramed, isTestMode, discounted } from "@/components/site/checkout";
import PromoField, { usePromo } from "@/components/site/PromoField";

const API = "https://missionefitnessbackend.onrender.com/api";
const fmt = (p) => `€ ${p.toFixed(2).replace(".", ",")}`;

const KIND_LABELS = {
  solo: "SOLO FITNESS",
  complete: "FITNESS + MINDSET + LIFESTYLE",
  bundle: "PACCHETTO COMPLETO",
  alimentare: "PIANO ALIMENTARE",
};

const KIND_FILTERS = [
  ["tutti", "TUTTI"],
  ["solo", "SOLO FITNESS"],
  ["complete", "COMPLETE"],
  ["alimentare", "PIANI ALIMENTARI"],
  ["bundle", "PACCHETTI"],
];

function ProductCard({ p, promo }) {
  const [loading, setLoading] = useState(false);
  const isBundle = p.kind === "bundle";
  const isFood = p.kind === "alimentare";
  const finalPrice = discounted(p.price, promo);

  const buy = async () => {
    setLoading(true);
    try {
      await startCheckout(p.id);
    } catch (e) {
      toast.error(e.response?.data?.detail || "Errore durante il checkout. Riprova.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      data-testid={`product-card-${p.id}`}
      className={`group/card relative border bg-[#141414] p-8 flex flex-col hover:-translate-y-1 hover:border-acid transition-all duration-300 ${isBundle ? "border-acid" : "border-white/10"}`}
    >
      <span className="absolute inset-x-0 top-0 h-px bg-acid scale-x-0 group-hover/card:scale-x-100 origin-left transition-transform duration-500" />
      <div className="flex items-center justify-between mb-6">
        <span className="font-display text-lg text-acid border border-acid px-3 py-1">
          {isBundle ? "FASI 01+02+03" : `FASE 0${p.fase}`}
        </span>
        <span className="text-xs text-neutral-500 font-bold tracking-widest text-right">
          {KIND_LABELS[p.kind]}
        </span>
      </div>
      <h3 className="font-display text-2xl leading-tight mb-4">{p.name.replace("Workbook ", "")}</h3>
      <ul className="space-y-2 mb-8 flex-1">
        {p.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-neutral-400">
            <Check size={16} className="text-acid shrink-0 mt-0.5" /> {f}
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between border-t border-white/10 pt-6 gap-3">
        <div>
          {p.old_price && (
            <span data-testid={`old-price-${p.id}`} className="block text-sm text-neutral-500 line-through">{fmt(p.old_price)}</span>
          )}
          <span data-testid={`price-${p.id}`} className={`font-display text-4xl ${promo ? "line-through text-neutral-500 text-2xl" : ""}`}>{fmt(p.price)}</span>
          {promo && (
            <span data-testid={`promo-price-${p.id}`} className="block font-display text-4xl text-acid leading-none">{fmt(finalPrice)}</span>
          )}
          {promo && (
            <span className="flex items-center gap-1 text-xs text-acid font-bold mt-1">
              <BadgePercent size={12} /> {promo.code} {promo.label}
            </span>
          )}
          {p.old_price && !promo && (
            <span className="flex items-center gap-1 text-xs text-acid font-bold mt-1">
              <BadgePercent size={12} /> RISPARMI {fmt(p.old_price - p.price)}
            </span>
          )}
          {isFood && <span className="block text-[10px] tracking-[0.2em] text-neutral-500 mt-1">FORMATO PDF</span>}
        </div>
        {p.available ? (
          <button onClick={buy} disabled={loading} data-testid={`buy-button-${p.id}`}
            className="group bg-acid text-black font-bold text-sm px-6 py-3 flex items-center gap-2 hover:bg-white transition-colors duration-200 disabled:opacity-50 shrink-0">
            {loading ? "ATTENDI..." : "ACQUISTA"}
            {isFramed() ? <ExternalLink size={16} /> : <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />}
          </button>
        ) : (
          <span data-testid={`coming-soon-${p.id}`} className="flex items-center gap-2 text-sm text-neutral-500 border border-white/10 px-4 py-3 font-bold shrink-0">
            <Clock size={14} /> IN ARRIVO
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default function Catalogo() {
  const [products, setProducts] = useState([]);
  const [gender, setGender] = useState("uomo");
  const [kind, setKind] = useState("tutti");
  const promo = usePromo();

  useEffect(() => {
    axios.get(`${API}/packages`).then((r) => setProducts(r.data)).catch(() => toast.error("Errore nel caricamento dei pacchetti"));
  }, []);

  const filtered = useMemo(
    () => products.filter((p) => p.gender === gender && (kind === "tutti" || p.kind === kind)),
    [products, gender, kind]
  );

  return (
    <section id="pacchetti" data-testid="catalogo-section" className="py-24 md:py-36 bg-[#0A0A0A] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal><p className="text-acid text-sm font-bold tracking-[0.3em] mb-6">I PACCHETTI</p></Reveal>
        {isTestMode() && (
          <div data-testid="test-mode-badge" className="inline-flex items-center gap-2 border border-acid text-acid text-xs font-bold px-3 py-2 mb-6">
            <FlaskConical size={14} /> MODALITÀ TEST ATTIVA — carta 4242 4242 4242 4242, nessun addebito reale
          </div>
        )}
        <h2 className="font-display text-5xl sm:text-6xl lg:text-8xl leading-[0.92] mb-8">
          <Lines lines={["SCEGLI IL TUO", <span key="p" className="text-acid">PERCORSO</span>]} />
        </h2>
        <Reveal delay={0.2}>
          <p className="text-neutral-400 max-w-2xl mb-12 text-base md:text-lg">
            Pagamento sicuro con carta tramite Stripe. Subito dopo l'acquisto ricevi il tuo programma direttamente via email, con link di download personale. Con i pacchetti completi risparmi sul prezzo pieno delle singole fasi. Novità: i Piani Alimentari di ogni fase, in PDF.
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="mb-8" data-testid="promo-area"><PromoField /></div>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="flex flex-wrap gap-4 mb-12 sticky top-20 z-30 py-3 -mx-6 px-6 bg-[#0A0A0A]/85 backdrop-blur-xl">
            <div className="flex border border-white/10" role="tablist" data-testid="gender-filter">
              {["uomo", "donna"].map((g) => (
                <button key={g} onClick={() => setGender(g)} data-testid={`filter-${g}`}
                  className={`px-8 py-3 font-display text-xl tracking-wide transition-colors duration-200 ${gender === g ? "bg-acid text-black" : "text-neutral-400 hover:text-white"}`}>
                  {g.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap border border-white/10" data-testid="kind-filter">
              {KIND_FILTERS.map(([v, l]) => (
                <button key={v} onClick={() => setKind(v)} data-testid={`filter-kind-${v}`}
                  className={`px-5 py-3 text-xs sm:text-sm font-bold transition-colors duration-200 ${kind === v ? "bg-white text-black" : "text-neutral-400 hover:text-white"}`}>
                  {l}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => <ProductCard key={p.id} p={p} promo={promo} />)}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
