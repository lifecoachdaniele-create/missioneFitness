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

export async function startCheckout(lookupKey) {
  const { data } = await axios.post(`${API}/payments/checkout`, {
    lookup_key: lookupKey,
    origin_url: window.location.origin,
    test_code: sessionStorage.getItem(TEST_KEY) || undefined,
    promo_code: getPromo()?.code || undefined,
  });
  if (isFramed()) {
    window.dispatchEvent(new CustomEvent(CHECKOUT_READY_EVENT, { detail: { url: data.checkout_url, mode: data.mode } }));
    return data;
  }
  window.location.assign(data.checkout_url);
  return data;
}
