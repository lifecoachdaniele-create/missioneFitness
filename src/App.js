import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import PaymentSuccess from "@/pages/PaymentSuccess";
import PaymentCancel from "@/pages/PaymentCancel";
import Privacy from "@/pages/Privacy";
import Termini from "@/pages/Termini";
import { Toaster } from "@/components/ui/sonner";
import SmoothScroll from "@/components/site/SmoothScroll";
import { initTestMode } from "@/components/site/checkout";

initTestMode();

function App() {
  return (
    <div className="App grain">
      <BrowserRouter>
        <SmoothScroll>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/cancel" element={<PaymentCancel />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/termini" element={<Termini />} />
          </Routes>
        </SmoothScroll>
      </BrowserRouter>
      <Toaster position="top-center" theme="dark" />
    </div>
  );
}

export default App;
