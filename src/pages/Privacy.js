import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const SECTIONS = [
  { title: "1. Titolare del trattamento", body: "Il titolare del trattamento dei dati è Daniele, ideatore del Mind & Body Method, contattabile all'indirizzo email lifecoach.daniele@gmail.com." },
  { title: "2. Dati raccolti", body: "Per completare un acquisto raccogliamo: indirizzo email (necessario per inviarti il programma acquistato) e i dati di pagamento, che vengono trattati direttamente da Stripe e non transitano né vengono memorizzati sui nostri sistemi. Navigando il sito possono essere raccolti dati tecnici anonimi di utilizzo." },
  { title: "3. Finalità e base giuridica", body: "I tuoi dati sono trattati esclusivamente per: evadere l'ordine e consegnarti il prodotto digitale via email (esecuzione del contratto), adempiere obblighi fiscali e contabili (obbligo legale) e rispondere a tue richieste di assistenza (interesse legittimo). Nessun uso marketing senza tuo consenso esplicito." },
  { title: "4. Conservazione", body: "I dati dell'ordine sono conservati per il tempo necessario all'evasione e secondo i termini di legge fiscali (10 anni). I link di download restano attivi per permetterti di scaricare nuovamente il tuo programma." },
  { title: "5. Terze parti", body: "I pagamenti sono gestiti da Stripe Payments Europe Ltd. Le email transazionali sono inviate tramite un fornitore di servizi email. Non vendiamo né cediamo i tuoi dati a terzi per scopi commerciali." },
  { title: "6. I tuoi diritti (GDPR)", body: "Ai sensi del Regolamento UE 2016/679 hai diritto di accesso, rettifica, cancellazione, limitazione e portabilità dei tuoi dati, oltre al diritto di reclamo al Garante per la protezione dei dati personali. Per esercitarli scrivi a lifecoach.daniele@gmail.com." },
  { title: "7. Cookie", body: "Questo sito non utilizza cookie di profilazione né strumenti di tracciamento pubblicitario. Vengono utilizzati solo strumenti tecnici necessari al funzionamento e al pagamento." },
];

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white" data-testid="privacy-page">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link to="/" data-testid="privacy-back-link" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-[#E1FF00] transition-colors mb-10">
          <ArrowLeft size={16} /> Torna alla home
        </Link>
        <p className="text-acid text-sm font-bold tracking-[0.3em] mb-4">MIND &amp; BODY METHOD</p>
        <h1 className="font-display text-5xl sm:text-6xl mb-4">PRIVACY POLICY</h1>
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
