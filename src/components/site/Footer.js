import { Link } from "react-router-dom";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

const PHONE_DISPLAY = "+39 334 994 2646";
const PHONE_TEL = "+393349942646";

export default function Footer() {
  return (
    <footer id="contatti" data-testid="footer-section" className="py-24 md:py-32 border-t border-white/10 relative overflow-hidden">
      <span className="absolute -bottom-16 -right-8 font-display text-[22vw] leading-none text-white/[0.03] pointer-events-none select-none">M&amp;B</span>
      <div className="max-w-7xl mx-auto px-6 relative">
        <Reveal><p className="text-acid text-sm font-bold tracking-[0.3em] mb-6">CONTATTI</p></Reveal>
        <Reveal delay={0.1}><h2 className="font-display text-5xl sm:text-6xl leading-[0.95] mb-10">PARLIAMONE.</h2></Reveal>
        <Reveal delay={0.2}>
          <a href="mailto:lifecoach.daniele@gmail.com" data-testid="footer-email-link"
            className="group inline-flex items-center gap-4 font-display text-3xl sm:text-5xl lg:text-7xl text-white hover:text-[#E1FF00] transition-colors duration-300 break-all">
            <Mail className="shrink-0 w-8 h-8 sm:w-12 sm:h-12 text-acid" />
            lifecoach.daniele@gmail.com
          </a>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href={`tel:${PHONE_TEL}`} data-testid="footer-phone-link"
              className="group inline-flex items-center gap-3 font-display text-3xl sm:text-4xl text-white hover:text-[#E1FF00] transition-colors duration-300">
              <Phone className="shrink-0 w-7 h-7 text-acid" />
              {PHONE_DISPLAY}
            </a>
            <a href={`https://wa.me/${PHONE_TEL.replace("+", "")}`} target="_blank" rel="noopener noreferrer" data-testid="footer-whatsapp-link"
              className="inline-flex items-center gap-2 border border-white/20 px-5 py-3 text-xs font-bold tracking-[0.2em] hover:border-acid hover:text-[#E1FF00] transition-colors duration-200">
              <MessageCircle size={16} className="text-acid" /> SCRIVIMI SU WHATSAPP
            </a>
          </div>
        </Reveal>
        <p className="text-neutral-500 text-sm mt-8 max-w-xl">
          Per informazioni sui pacchetti, dubbi prima dell'acquisto o supporto dopo l'ordine: scrivimi o chiamami, rispondo personalmente.
        </p>
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/assets/img4.jpg" alt="Mind & Body Method" className="h-10 w-10 object-cover rounded-sm" />
            <div>
              <p className="font-display text-lg tracking-wider">MIND &amp; BODY METHOD</p>
              <p className="text-xs text-neutral-500">Metodo ideato da Daniele — Fitness, Mindset, Lifestyle</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-xs text-neutral-600">
            <p>© {new Date().getFullYear()} Mind &amp; Body Method. Tutti i diritti riservati. Pagamenti sicuri tramite Stripe.</p>
            <div className="flex gap-5">
              <Link to="/privacy" data-testid="footer-privacy-link" className="hover:text-[#E1FF00] transition-colors underline underline-offset-2">Privacy Policy</Link>
              <Link to="/termini" data-testid="footer-termini-link" className="hover:text-[#E1FF00] transition-colors underline underline-offset-2">Termini di Vendita</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
