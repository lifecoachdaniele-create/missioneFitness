import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  { q: "Come ricevo il programma dopo l'acquisto?", a: "Subito dopo il pagamento ricevi un'email con il tuo link di download personale. Trovi il link anche nella pagina di conferma dell'ordine. Il file è in formato digitale, pronto da consultare su qualsiasi dispositivo." },
  { q: "Qual è la differenza tra Solo Fitness e Complete?", a: "Solo Fitness contiene il programma d'allenamento completo della fase. La versione Complete (Fitness + Mindset + Lifestyle) aggiunge il workbook mentale e la parte dedicata ad alimentazione, sonno e routine quotidiana: il percorso completo del Mind & Body Method." },
  { q: "Qual è la differenza tra la versione Uomo e Donna?", a: "Ogni versione è costruita specificamente sulle esigenze fisiologiche e gli obiettivi tipici: volumi, progressioni ed esercizi sono calibrati in modo diverso. Scegli la versione dedicata a te." },
  { q: "Come funzionano le 4 fasi? Da dove inizio?", a: "Il metodo è progressivo: la Fase 01 costruisce le fondamenta, la Fase 02 aumenta l'intensità, la Fase 03 completa la trasformazione e la Fase 04 porta alla maestria. Se parti da zero o riprendi dopo una pausa, inizia dalla Fase 01 — oppure scarica gratis la Fase 00 per scoprire il metodo senza spendere nulla." },
  { q: "I pagamenti sono sicuri?", a: "Sì. Tutti i pagamenti sono gestiti da Stripe, lo standard mondiale per i pagamenti online. Puoi pagare con qualsiasi carta. Nessun dato della carta passa per questo sito." },
  { q: "Posso chiedere un rimborso?", a: "Trattandosi di prodotti digitali scaricabili, una volta effettuato il download non è possibile il rimborso. Per qualsiasi problema con il file o il pagamento scrivi a lifecoach.daniele@gmail.com o su WhatsApp al +39 334 994 2646: troviamo sempre una soluzione." },
  { q: "Serve attrezzatura da palestra?", a: "I programmi sono pensati principalmente per la sala pesi. Nel workbook trovi indicazioni e alternative dove possibile. Per dubbi specifici scrivimi prima dell'acquisto." },
  { q: "Chi ha creato questo metodo?", a: "Il Mind & Body Method è ideato interamente da Daniele, laureato e coach. Non è un programma copiato: è un percorso originale nato da studio e anni di esperienza sul campo." },
];

export default function Faq() {
  return (
    <section id="faq" data-testid="faq-section" className="py-24 md:py-32 bg-[#0A0A0A] border-t border-white/10">
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-acid text-sm font-bold tracking-[0.3em] mb-4">DOMANDE FREQUENTI</p>
        <h2 className="font-display text-5xl sm:text-6xl leading-[0.95] mb-12">HAI DUBBI? <span className="text-acid">RISPONDO IO.</span></h2>
        <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-white/10" data-testid={`faq-item-${i}`}>
              <AccordionTrigger data-testid={`faq-trigger-${i}`} className="text-left font-bold text-base hover:text-[#E1FF00] hover:no-underline py-6">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-neutral-400 text-sm leading-relaxed pb-6">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
