import { useEffect, useState } from "react";
import { ExternalLink, Copy, Check, MonitorSmartphone } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CHECKOUT_READY_EVENT, isFramed } from "@/components/site/checkout";

export function PreviewBanner() {
  if (!isFramed()) return null;
  return (
    <div data-testid="preview-banner" className="fixed top-16 inset-x-0 z-30 bg-acid text-black text-xs font-bold px-4 py-2 flex flex-wrap items-center justify-center gap-2 text-center">
      <MonitorSmartphone size={14} />
      Stai guardando l'ANTEPRIMA: il pagamento Stripe non può aprirsi qui dentro.
      <a href={window.location.href} target="_blank" rel="noopener noreferrer" data-testid="preview-open-site-link"
        className="underline underline-offset-2 inline-flex items-center gap-1 hover:opacity-70">
        Apri il sito in una nuova scheda <ExternalLink size={12} />
      </a>
    </div>
  );
}

export default function CheckoutDialog() {
  const [state, setState] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onReady = (e) => { setState(e.detail); setCopied(false); };
    window.addEventListener(CHECKOUT_READY_EVENT, onReady);
    return () => window.removeEventListener(CHECKOUT_READY_EVENT, onReady);
  }, []);

  const copy = async () => {
    try { await navigator.clipboard.writeText(state.url); setCopied(true); } catch { /* ignore */ }
  };

  return (
    <Dialog open={Boolean(state)} onOpenChange={(o) => !o && setState(null)}>
      <DialogContent data-testid="checkout-dialog" className="bg-[#141414] border-white/10 text-white sm:max-w-md">
        <DialogHeader>
          <p className="text-acid text-xs font-bold tracking-[0.3em]">PAGAMENTO PRONTO</p>
          <DialogTitle className="font-display text-4xl leading-none">APRI STRIPE IN UNA NUOVA SCHEDA</DialogTitle>
          <DialogDescription className="text-neutral-400 text-sm">
            Per sicurezza Stripe non si carica dentro l'anteprima. Clicca il pulsante: la pagina di pagamento si aprirà in una scheda separata.
            {state?.mode === "test" && <span className="block mt-2 text-acid font-bold">MODALITÀ TEST: usa la carta 4242 4242 4242 4242, nessun addebito reale.</span>}
          </DialogDescription>
        </DialogHeader>
        {state && (
          <div className="flex flex-col gap-3 mt-2">
            <a href={state.url} target="_blank" rel="noopener noreferrer" data-testid="checkout-dialog-open-link"
              onClick={() => setTimeout(() => setState(null), 800)}
              className="bg-acid text-black font-bold text-sm px-6 py-4 flex items-center justify-center gap-2 hover:bg-white transition-colors duration-200">
              <ExternalLink size={16} /> APRI IL PAGAMENTO SICURO STRIPE
            </a>
            <button onClick={copy} data-testid="checkout-dialog-copy-button"
              className="border border-white/20 text-neutral-300 text-xs font-bold px-6 py-3 flex items-center justify-center gap-2 hover:border-acid hover:text-[#E1FF00] transition-colors duration-200">
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "LINK COPIATO" : "COPIA IL LINK DI PAGAMENTO"}
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
