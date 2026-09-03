import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Marquee from "@/components/site/Marquee";
import Fase00 from "@/components/site/Fase00";
import Metodo from "@/components/site/Metodo";
import Catalogo from "@/components/site/Catalogo";
import ChiSono from "@/components/site/ChiSono";
import Risultati from "@/components/site/Risultati";
import Faq from "@/components/site/Faq";
import Footer from "@/components/site/Footer";
import Advisor from "@/components/site/Advisor";
import CheckoutDialog, { PreviewBanner } from "@/components/site/CheckoutDialog";

export default function Home() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white">
      <Navbar />
      <PreviewBanner />
      <Hero />
      <Marquee />
      <Fase00 />
      <Metodo />
      <Catalogo />
      <ChiSono />
      <Risultati />
      <Faq />
      <Footer />
      <Advisor />
      <CheckoutDialog />
    </div>
  );
}
