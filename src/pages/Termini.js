import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const SECTIONS = [
  { title: "1. Oggetto", body: "I presenti termini regolano l'acquisto dei programmi digitali Mind & Body Method (workbook in formato digitale) venduti su questo sito da Daniele, ideatore del metodo, contattabile a lifecoach.daniele@gmail.com." },
  { title: "2. Prezzi e pagamento", body: "Tutti i prezzi sono espressi in euro. Il pagamento avviene in anticipo tramite carta, elaborato in sicurezza da Stripe. L'ordine si considera confermato al buon fine del pagamento." },
  { title: "3. Consegna", body: "Il prodotto digitale è consegnato via email all'indirizzo indicato in fase di pagamento, con un link di download personale, entro pochi minuti dalla conferma del pagamento. Se non ricevi l'email controlla la cartella spam o scrivi a lifecoach.daniele@gmail.com." },
  { title: "4. Diritto di recesso", body: "Ai sensi dell'art. 59, comma 1, lett. o) del Codice del Consumo, il diritto di recesso è escluso per i contenuti digitali forniti mediante supporto non materiale una volta iniziato il download. Effettuando l'acquisto e scaricando il file accetti espressamente questa condizione. Resta ferma la garanzia per file difettosi o non consegnati: in tal caso contattaci per ricevere nuovamente il file o il rimborso." },
  { title: "5. Proprietà intellettuale", body: "Tutti i contenuti dei workbook sono di proprietà esclusiva dell'ideatore del Mind & Body Method. L'acquisto concede una licenza d'uso personale e non trasferibile: è vietata la diffusione, condivisione, rivendita o pubblicazione dei file, in tutto o in parte." },
  { title: "6. Disclaimer", body: "I programmi hanno scopo informativo e non sostituiscono il parere medico. Prima di iniziare qualsiasi programma di allenamento consulta il tuo medico, specialmente in caso di patologie o condizioni preesistenti." },
  { title: "7. Legge applicabile", body: "I presenti termini sono regolati dalla legge italiana. Per qualsiasi controversia resta ferma la facoltà di rivolgersi al giudice competente secondo la normativa vigente." },
];

export default function Termini() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white" data-testid="termini-page">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link to="/" data-testid="termini-back-link" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-[#E1FF00] transition-colors mb-10">
          <ArrowLeft size={16} /> Torna alla home
        </Link>
        <p className="text-acid text-sm font-bold tracking-[0.3em] mb-4">MIND &amp; BODY METHOD</p>
        <h1 className="font-display text-5xl sm:text-6xl mb-4">TERMINI DI VENDITA</h1>
        <p className="text-neutral-500 text-sm mb-12">Ultimo aggiornamento: settembre 2026</p>
        <div className="space-y-8">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="font-bold text-lg mb-2">{s.title}</h2>
              <p className="text-neutral-400 text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
