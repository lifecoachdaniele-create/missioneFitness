import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, ArrowRight, RotateCcw, Send, Loader2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { startCheckout } from "@/components/site/checkout";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const fmt = (p) => `€ ${p.toFixed(2).replace(".", ",")}`;
const EASE = [0.22, 1, 0.36, 1];

const STEPS = [
  { key: "gender", q: "Per chi è il percorso?", opts: ["Uomo", "Donna"] },
  { key: "goal", q: "Qual è il tuo obiettivo principale?", opts: ["Perdere grasso e definirmi", "Costruire massa e forza", "Tonificare gambe e glutei", "Rimettermi in forma da zero"] },
  { key: "level", q: "Quanta esperienza hai in palestra?", opts: ["Principiante / riprendo da una pausa", "Intermedio (1-2 anni)", "Avanzato (3+ anni)"] },
  { key: "focus", q: "Vuoi lavorare anche su mindset e stile di vita?", opts: ["Sì, voglio il percorso completo", "No, solo allenamento"] },
  { key: "nutrition", q: "Ti interessa anche il piano alimentare della fase?", opts: ["Sì", "No, per ora no"] },
];

const newSession = () => `adv_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

function RecCard({ p }) {
  const [loading, setLoading] = useState(false);
  const buy = async () => {
    setLoading(true);
    try { await startCheckout(p.id); } catch (e) { toast.error(e.response?.data?.detail || "Errore durante il checkout."); } finally { setLoading(false); }
  };
  return (
    <div data-testid={`advisor-rec-${p.id}`} className="border border-white/10 bg-[#0A0A0A] p-4 flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-[10px] tracking-[0.2em] text-acid font-bold">{p.kind === "bundle" ? "FASI 01+02+03" : `FASE 0${p.fase}`}</p>
        <p className="font-display text-lg leading-tight truncate">{p.name.replace("Workbook ", "")}</p>
        <p className="font-display text-2xl">{fmt(p.price)}</p>
      </div>
      <button onClick={buy} disabled={loading} data-testid={`advisor-buy-${p.id}`}
        className="bg-acid text-black text-xs font-bold px-4 py-3 flex items-center gap-1 hover:bg-white transition-colors shrink-0 disabled:opacity-50">
        {loading ? <Loader2 size={14} className="animate-spin" /> : <ShoppingBag size={14} />} ACQUISTA
      </button>
    </div>
  );
}

export default function Advisor() {
  const [open, setOpen] = useState(false);
  const [sessionId, setSessionId] = useState(newSession);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [thread, setThread] = useState([]);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [thread, busy]);

  const reset = () => { setSessionId(newSession()); setStep(0); setAnswers({}); setThread([]); setInput(""); };

  const submitQuiz = async (finalAnswers) => {
    setBusy(true);
    try {
      const { data } = await axios.post(`${API}/advisor/quiz`, { session_id: sessionId, answers: finalAnswers });
      setThread([{ role: "assistant", text: data.message, recommended: data.recommended }]);
    } catch (e) {
      toast.error(e.response?.data?.detail || "Il consulente AI non risponde. Riprova.");
      setStep(STEPS.length - 1);
    } finally { setBusy(false); }
  };

  const pick = (opt) => {
    const next = { ...answers, [STEPS[step].key]: opt };
    setAnswers(next);
    if (step < STEPS.length - 1) setStep(step + 1);
    else { setStep(STEPS.length); submitQuiz(next); }
  };

  const ask = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    setThread((t) => [...t, { role: "user", text }]);
    setBusy(true);
    try {
      const { data } = await axios.post(`${API}/advisor/chat`, { session_id: sessionId, message: text });
      setThread((t) => [...t, { role: "assistant", text: data.message, recommended: data.recommended }]);
    } catch (err) {
      toast.error(err.response?.data?.detail || "Il consulente AI non risponde. Riprova.");
    } finally { setBusy(false); }
  };

  const done = step >= STEPS.length;

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)} data-testid="advisor-open-button"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2, duration: 0.8, ease: EASE }}
        className="fixed bottom-6 right-6 z-40 group bg-acid text-black font-bold text-sm pl-4 pr-5 py-3 flex items-center gap-2 shadow-[0_0_40px_rgba(225,255,0,0.25)] hover:bg-white transition-colors duration-200"
      >
        <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline">QUALE PACCHETTO FA PER ME?</span>
        <span className="sm:hidden">QUIZ AI</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div key="bg" data-testid="advisor-overlay" onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.aside key="panel" data-testid="advisor-panel"
              className="fixed z-50 inset-x-0 bottom-0 sm:inset-auto sm:right-6 sm:bottom-6 sm:w-[440px] max-h-[92vh] sm:max-h-[80vh] bg-[#141414] border border-white/10 flex flex-col"
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} transition={{ duration: 0.5, ease: EASE }}>
              <header className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <div>
                  <p className="text-acid text-[10px] font-bold tracking-[0.3em] flex items-center gap-2"><Sparkles size={12} /> CONSULENTE AI</p>
                  <h3 className="font-display text-2xl leading-none mt-1">QUIZ VELOCE</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={reset} data-testid="advisor-reset-button" title="Ricomincia" className="p-2 text-neutral-400 hover:text-[#E1FF00] transition-colors"><RotateCcw size={16} /></button>
                  <button onClick={() => setOpen(false)} data-testid="advisor-close-button" className="p-2 text-neutral-400 hover:text-white transition-colors"><X size={18} /></button>
                </div>
              </header>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {!done && (
                  <div data-testid={`advisor-step-${step}`}>
                    <div className="flex gap-1 mb-5">
                      {STEPS.map((_, i) => <span key={i} className={`h-1 flex-1 ${i <= step ? "bg-acid" : "bg-white/10"} transition-colors`} />)}
                    </div>
                    <p className="text-neutral-500 text-xs tracking-[0.2em] mb-2">DOMANDA {step + 1} DI {STEPS.length}</p>
                    <AnimatePresence mode="wait">
                      <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.35, ease: EASE }}>
                        <h4 className="font-display text-3xl leading-tight mb-5">{STEPS[step].q}</h4>
                        <div className="space-y-2">
                          {STEPS[step].opts.map((o) => (
                            <button key={o} onClick={() => pick(o)} data-testid={`advisor-option-${STEPS[step].key}-${o.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "")}`}
                              className="group w-full text-left border border-white/10 px-4 py-3 text-sm font-semibold flex items-center justify-between hover:border-acid hover:bg-[#0A0A0A] transition-colors duration-200">
                              {o} <ArrowRight size={14} className="text-acid opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                    {step > 0 && (
                      <button onClick={() => setStep(step - 1)} data-testid="advisor-back-button" className="mt-5 text-xs text-neutral-500 hover:text-white transition-colors">← Indietro</button>
                    )}
                  </div>
                )}

                {done && thread.map((m, i) => (
                  <div key={i} data-testid={`advisor-message-${i}`} className={m.role === "user" ? "flex justify-end" : ""}>
                    {m.role === "user" ? (
                      <p className="bg-white/10 text-sm px-4 py-3 max-w-[85%]">{m.text}</p>
                    ) : (
                      <div className="space-y-3">
                        <div className="border-l-2 border-acid pl-4">
                          <p className="text-[10px] text-acid font-bold tracking-[0.2em] mb-1">CONSIGLIO</p>
                          <p className="text-sm text-neutral-200 leading-relaxed whitespace-pre-line">{m.text.replace(/\*\*/g, "")}</p>
                        </div>
                        {m.recommended?.map((p) => <RecCard key={p.id} p={p} />)}
                      </div>
                    )}
                  </div>
                ))}
                {busy && (
                  <div data-testid="advisor-loading" className="flex items-center gap-2 text-neutral-400 text-sm">
                    <Loader2 size={16} className="animate-spin text-acid" /> Il consulente sta analizzando le tue risposte…
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {done && (
                <form onSubmit={ask} className="border-t border-white/10 p-3 flex gap-2">
                  <input value={input} onChange={(e) => setInput(e.target.value)} maxLength={600} data-testid="advisor-chat-input"
                    placeholder="Fai una domanda sui pacchetti…"
                    className="flex-1 bg-[#0A0A0A] border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-acid placeholder:text-neutral-600" />
                  <button type="submit" disabled={busy || !input.trim()} data-testid="advisor-chat-send"
                    className="bg-acid text-black px-4 flex items-center justify-center hover:bg-white transition-colors disabled:opacity-40"><Send size={16} /></button>
                </form>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
