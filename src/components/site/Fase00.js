import { useState } from "react";
import axios from "axios";
import { Download, Loader2, CheckCircle2, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Reveal } from "@/components/site/Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Fase00() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      const { data } = await axios.post(`${API}/free/fase00/lead`, { email, origin_url: window.location.origin });
      setDone(data.download_url);
      window.location.assign(data.download_url);
    } catch (err) {
      toast.error(err.response?.data?.detail || "Qualcosa non ha funzionato. Riprova.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section id="fase00" data-testid="fase00-section" className="border-b-2 border-acid bg-[#141414] relative overflow-hidden">
      <span className="absolute -left-4 -bottom-10 font-display text-[12rem] leading-none text-acid/[0.06] pointer-events-none select-none">00</span>
      <Reveal className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-[1.2fr_1fr] items-center gap-10 relative">
        <div>
          <p className="text-acid text-sm font-bold tracking-[0.3em] mb-3">PROVA GRATIS</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[0.95]">
            SCARICA GRATIS LA <span className="text-acid">FASE 00</span>
          </h2>
          <p className="text-neutral-400 mt-4 max-w-xl text-sm md:text-base">
            Il workbook introduttivo del Mind &amp; Body Method: 8 pagine stampabili con scheda Starter a corpo libero, primi moduli Mindset e Lifestyle e check-in settimanale. Lascia la tua email: ricevi il PDF subito e, ogni tanto, consigli e codici sconto riservati.
          </p>
        </div>

        {done ? (
          <div data-testid="fase00-success" className="border border-acid/40 bg-[#0A0A0A] p-6 flex flex-col gap-3">
            <p className="flex items-center gap-2 font-display text-2xl"><CheckCircle2 className="text-acid" size={22} /> FATTO! IL DOWNLOAD È PARTITO</p>
            <p className="text-neutral-400 text-sm">Ti ho inviato anche una email con il link, così lo ritrovi quando vuoi. Controlla anche la cartella spam.</p>
            <a href={done} data-testid="fase00-download-again" className="text-acid text-sm font-bold underline underline-offset-2 inline-flex items-center gap-2">
              <Download size={14} /> Non è partito? Scarica di nuovo
            </a>
          </div>
        ) : (
          <form onSubmit={submit} data-testid="fase00-form" className="bg-[#0A0A0A] border border-white/10 p-6 flex flex-col gap-3">
            <label htmlFor="fase00-email" className="text-xs font-bold tracking-[0.2em] text-neutral-400 flex items-center gap-2">
              <Mail size={14} className="text-acid" /> LA TUA EMAIL
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input id="fase00-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="nome@esempio.it" data-testid="fase00-email-input"
                className="flex-1 bg-[#141414] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-acid placeholder:text-neutral-600" />
              <button type="submit" disabled={busy} data-testid="fase00-download-button"
                className="group bg-acid text-black font-bold px-6 py-3 text-sm flex items-center justify-center gap-2 hover:bg-white transition-colors duration-200 disabled:opacity-50 shrink-0">
                {busy ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} className="group-hover:translate-y-0.5 transition-transform duration-200" />}
                {busy ? "UN ATTIMO…" : "SCARICA IL PDF GRATUITO"}
              </button>
            </div>
            <p className="text-[11px] text-neutral-600 leading-relaxed">
              Inviando accetti di ricevere il PDF e occasionali comunicazioni da Mind &amp; Body Method. Niente spam, puoi cancellarti quando vuoi. <Link to="/privacy" className="underline hover:text-[#E1FF00]">Privacy Policy</Link>.
            </p>
          </form>
        )}
      </Reveal>
    </section>
  );
}
