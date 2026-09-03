import { useEffect, useState } from "react";
import { Tag, Check, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { applyPromoCode, getPromo, setPromo, PROMO_EVENT } from "@/components/site/checkout";

export function usePromo() {
  const [promo, setState] = useState(getPromo);
  useEffect(() => {
    const on = (e) => setState(e.detail);
    window.addEventListener(PROMO_EVENT, on);
    return () => window.removeEventListener(PROMO_EVENT, on);
  }, []);
  return promo;
}

export default function PromoField() {
  const promo = usePromo();
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);

  const apply = async (e) => {
    e.preventDefault();
    if (!code.trim() || busy) return;
    setBusy(true);
    try {
      const p = await applyPromoCode(code);
      toast.success(`Codice ${p.code} attivato: ${p.label} su tutti i pacchetti`);
      setCode("");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Codice non valido");
    } finally {
      setBusy(false);
    }
  };

  if (promo) {
    return (
      <div data-testid="promo-active" className="inline-flex items-center gap-3 border border-acid bg-acid/10 px-4 py-2 text-sm">
        <Tag size={14} className="text-acid" />
        <span className="font-bold tracking-wider">{promo.code}</span>
        <span className="text-acid font-bold">{promo.label}</span>
        <span className="text-neutral-400 hidden sm:inline">applicato al checkout</span>
        <button onClick={() => setPromo(null)} data-testid="promo-remove" aria-label="Rimuovi codice" className="text-neutral-400 hover:text-white transition-colors"><X size={14} /></button>
      </div>
    );
  }

  return (
    <form onSubmit={apply} data-testid="promo-form" className="flex items-stretch border border-white/10 max-w-sm">
      <span className="flex items-center pl-3 text-neutral-500"><Tag size={14} /></span>
      <input value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="Hai un codice sconto?" data-testid="promo-input"
        className="flex-1 bg-transparent px-3 py-2.5 text-sm tracking-wider focus:outline-none placeholder:text-neutral-600 placeholder:tracking-normal" />
      <button type="submit" disabled={busy || !code.trim()} data-testid="promo-apply"
        className="px-4 text-xs font-bold text-black bg-acid hover:bg-white transition-colors disabled:opacity-40 flex items-center gap-1">
        {busy ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />} APPLICA
      </button>
    </form>
  );
}
