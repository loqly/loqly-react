import _, { createContext as f, useState as c, useEffect as m, useContext as p } from "react";
const h = async (s) => {
  if (!s) throw new Error("API key is required");
  const t = window.location.href.includes("http://localhost") ? "http://localhost:3000" : "https://api.loqly.dev", e = await fetch(`${t}/v1/strings`, {
    method: "GET",
    headers: {
      Authorization: `Apikey ${s}`,
      "Content-Type": "application/json"
    }
  }), a = await e.json();
  if (!e.ok || a.error)
    throw new Error(a.error || "Something went wrong, please try again.");
  return a.strings ? a.strings : {};
};
class E {
  constructor({ apiKey: t, defaultLocale: e = "en" }) {
    this.apiKey = t, this._defaultLocale = e, this._locale = e, this._translations = null, this._translatableElements = [];
  }
  // Initialize translations from your API
  async init() {
    this._translations = await h(this.apiKey), this.cacheElements(), this.translateElements(this._translatableElements);
  }
  // Only fetch & return translations
  static async getTranslations(t) {
    return await h(t);
  }
  // Translation lookup with fallback
  t(t) {
    var e, a, l, n;
    return ((a = (e = this._translations) == null ? void 0 : e[t]) == null ? void 0 : a[this._locale]) || ((n = (l = this._translations) == null ? void 0 : l[t]) == null ? void 0 : n[this._defaultLocale]) || t;
  }
  // Cache all elements with data-t attribute
  cacheElements() {
    this._translatableElements = Array.from(
      document.querySelectorAll("[data-t]")
    );
  }
  // Translate a list of elements
  translateElements(t) {
    t.forEach((e) => {
      const a = e.getAttribute("data-t");
      a && (e.textContent = this.t(a));
    });
  }
  // Translate the whole page (re-queries if cache is empty)
  translatePage() {
    this._translatableElements.length || this.cacheElements(), this.translateElements(this._translatableElements);
  }
  // Update current language and re-translate
  updateLanguage(t) {
    this._locale = t, this.translatePage();
  }
  // Getters / setters
  get translations() {
    return this._translations;
  }
  set translations(t) {
    this._translations = t;
  }
  get locale() {
    return this._locale;
  }
  set locale(t) {
    this.updateLanguage(t);
  }
  get defaultLocale() {
    return this._defaultLocale;
  }
  set defaultLocale(t) {
    this._defaultLocale = t;
  }
}
const u = f();
function L({
  translations: s = {},
  defaultLocale: t = "en",
  children: e
}) {
  const [a, l] = c(t), [n, r] = c(s);
  m(() => {
    r(s);
  }, [s]);
  const d = (o) => {
    var i;
    return ((i = n == null ? void 0 : n[o]) == null ? void 0 : i[a]) ?? o;
  }, g = (o) => {
    l(o);
  };
  return /* @__PURE__ */ _.createElement(u.Provider, { value: { t: d, updateLanguage: g, locale: a } }, e);
}
const w = () => p(u), v = async (s) => await E.getTranslations(s);
export {
  L as default,
  v as getTranslations,
  w as useLoqly
};
