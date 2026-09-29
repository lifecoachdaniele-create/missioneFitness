import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const TEST_KEY = "mb_test_code";
export const CHECKOUT_READY_EVENT = "mb:checkout-ready";

export const isFramed = () => {
  try { return window.self !== window.top; } catch { return true; }
};

export function initTestMode() {
  const code = new URLSearchParams(window.location.search).get("test");
  if (code) sessionStorage.setItem(TEST_KEY, code);
  return Boolean(sessionStorage.getItem(TEST_KEY));
}

export const isTestMode = () => Boolean(sessionStorage.getItem(TEST_KEY));

const PROMO_KEY = "mb_promo";
export const PROMO_EVENT = "mb:promo-changed";
export const getPromo = () => {
  try { return JSON.parse(sessionStorage.getItem(PROMO_KEY) || "null"); } catch { return null; }
};
export const setPromo = (promo) => {
  if (promo) sessionStorage.setItem(PROMO_KEY, JSON.stringify(promo)); else sessionStorage.removeItem(PROMO_KEY);
  window.dispatchEvent(new CustomEvent(PROMO_EVENT, { detail: promo }));
};
export async function applyPromoCode(code) {
  const { data } = await axios.post(`${API}/promo/validate`, { code, test_code: sessionStorage.getItem(TEST_KEY) || undefined });
  setPromo(data);
  return data;
}
export const discounted = (price, promo) => {
  if (!promo) return price;
  if (promo.percent_off) return Math.max(0, price * (1 - promo.percent_off / 100));
  if (promo.amount_off) return Math.max(0, price - promo.amount_off / 100);
  return price;
};

export async function startCheckout(packageId) {
  const origin = window.location.origin;
  const { data } = await axios.post(`${API}/create-checkout-session`, {
    package_id: packageId,
    success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/payment/cancel`,
  });
  const url = data.checkout_url || data.url || data.session_url;
  if (!url) throw new Error("Checkout URL mancante nella risposta del backend");
  if (isFramed()) {
    window.dispatchEvent(new CustomEvent(CHECKOUT_READY_EVENT, { detail: { url, mode: data.mode } }));
    return data;
  }
  window.location.assign(url);
  return data;
}
