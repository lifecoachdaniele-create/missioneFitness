import { Phone } from "lucide-react";

const LINKS = [
  { href: "#metodo", label: "Il Metodo" },
  { href: "#pacchetti", label: "Pacchetti" },
  { href: "#chi-sono", label: "Chi Sono" },
  { href: "#faq", label: "FAQ" },
  { href: "#contatti", label: "Contatti" },
];

export default function Navbar() {
  return (
    <header data-testid="main-navbar" className="fixed top-0 inset-x-0 z-40 bg-black/60 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" data-testid="nav-logo-link" className="flex items-center gap-3">
          <img src="/assets/img4.jpg" alt="Mind & Body Method logo" className="h-9 w-9 object-cover rounded-sm" />
          <span className="font-display text-xl tracking-wider">MIND <span className="text-acid">&amp;</span> BODY</span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a key={l.href} data-testid={`nav-link-${l.label.toLowerCase().replace(" ", "-")}`} href={l.href}
              className="text-sm text-neutral-400 hover:text-[#E1FF00] transition-colors duration-200 font-medium">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <a href="tel:+393349942646" data-testid="nav-phone-link"
            className="hidden lg:flex items-center gap-2 text-sm text-neutral-300 hover:text-[#E1FF00] transition-colors duration-200 font-semibold">
            <Phone size={14} className="text-acid" /> +39 334 994 2646
          </a>
          <a href="#pacchetti" data-testid="nav-cta-button"
            className="hidden sm:inline-block bg-acid text-black text-sm font-bold px-5 py-2 hover:bg-white transition-colors duration-200">
            ACQUISTA ORA
          </a>
        </div>
      </div>
    </header>
  );
}
