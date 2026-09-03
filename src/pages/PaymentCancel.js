import { Link } from "react-router-dom";
import { XCircle } from "lucide-react";

export default function PaymentCancel() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center px-6" data-testid="payment-cancel-page">
      <div className="max-w-lg w-full border border-white/10 bg-[#141414] p-10 text-center">
        <XCircle size={48} className="text-neutral-500 mx-auto mb-6" />
        <h1 className="font-display text-4xl mb-3">PAGAMENTO ANNULLATO</h1>
        <p className="text-neutral-400 text-sm mb-8">
          Nessun addebito è stato effettuato. Quando sei pronto, il tuo percorso ti aspetta. Hai avuto problemi col pagamento? Scrivimi su WhatsApp al <a href="https://wa.me/393349942646" className="text-acid" data-testid="cancel-whatsapp-link">+39 334 994 2646</a>.
        </p>
        <Link to="/#pacchetti" data-testid="cancel-back-link"
          className="bg-acid text-black font-bold text-sm px-8 py-4 inline-block hover:bg-white transition-colors duration-200">
          TORNA AI PACCHETTI
        </Link>
      </div>
    </div>
  );
}
