import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { CheckCircle2, Download, Printer, Loader2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [state, setState] = useState({ status: "loading", downloads: [] });

  useEffect(() => {
    if (!sessionId) {
      setState({ status: "error", downloads: [] });
      return;
    }
    let attempts = 0;
    const poll = async () => {
      try {
        const { data } = await axios.get(`${API}/payments/status/${sessionId}`);
        if (data.payment_status === "paid") {
          setState({ status: "paid", downloads: data.downloads || [] });
          return;
        }
      } catch (e) { /* keep polling */ }
      attempts += 1;
      if (attempts < 20) setTimeout(poll, 2000);
      else setState({ status: "timeout", downloads: [] });
    };
    poll();
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center px-6" data-testid="payment-success-page">
      <div className="max-w-lg w-full border border-white/10 bg-[#141414] p-10 text-center">
        {state.status === "loading" && (
          <>
            <Loader2 size={48} className="text-acid animate-spin mx-auto mb-6" />
            <h1 className="font-display text-4xl mb-3">VERIFICA DEL PAGAMENTO...</h1>
            <p className="text-neutral-400 text-sm">Stiamo confermando il tuo acquisto. Non chiudere la pagina.</p>
          </>
        )}
        {state.status === "paid" && (
          <>
            <CheckCircle2 size={48} className="text-acid mx-auto mb-6" />
            <h1 className="font-display text-4xl mb-3" data-testid="payment-confirmed-title">PAGAMENTO CONFERMATO</h1>
            <p className="text-neutral-400 text-sm mb-8">
              Grazie per il tuo acquisto! Ti abbiamo inviato un'email con {state.downloads.length > 1 ? "i link per scaricare i tuoi programmi" : "il link per scaricare il tuo programma"}. Controlla anche la cartella spam.
            </p>
            <div className="flex flex-col gap-3 mb-6">
              {state.downloads.map((d, i) => (
                <div key={d.url} className="flex flex-col gap-1">
                  <a href={d.url} data-testid={`download-program-button-${i}`}
                    className="group bg-acid text-black font-bold text-sm px-6 py-4 flex items-center justify-center gap-2 hover:bg-white transition-colors duration-200">
                    <Download size={16} /> SCARICA: {d.name}
                  </a>
                  {d.print_url && (
                    <a href={d.print_url} data-testid={`download-print-button-${i}`}
                      className="text-xs text-neutral-400 underline underline-offset-2 hover:text-[#E1FF00] transition-colors py-1 flex items-center justify-center gap-1">
                      <Printer size={12} /> Versione stampabile a sfondo bianco (risparmia inchiostro)
                    </a>
                  )}
                </div>
              ))}
            </div>
            <div>
              <Link to="/" data-testid="back-home-link" className="text-neutral-500 text-sm hover:text-[#E1FF00] transition-colors">
                Torna alla home
              </Link>
            </div>
          </>
        )}
        {(state.status === "error" || state.status === "timeout") && (
          <>
            <h1 className="font-display text-4xl mb-3">QUALCOSA NON TORNA</h1>
            <p className="text-neutral-400 text-sm mb-8">
              Non riusciamo a confermare il pagamento in questo momento. Se hai completato l'acquisto, riceverai comunque l'email con il programma. Per assistenza: lifecoach.daniele@gmail.com oppure WhatsApp +39 334 994 2646
            </p>
            <Link to="/" data-testid="back-home-link" className="text-acid text-sm font-bold">TORNA ALLA HOME</Link>
          </>
        )}
      </div>
    </div>
  );
}
