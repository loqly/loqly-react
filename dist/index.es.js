import m, { createContext as E, useState as c, useEffect as p, useContext as y } from "react";
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
class u {
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
    var e, a, l, o;
    return ((a = (e = this._translations) == null ? void 0 : e[t]) == null ? void 0 : a[this._locale]) || ((o = (l = this._translations) == null ? void 0 : l[t]) == null ? void 0 : o[this._defaultLocale]) || t;
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
const d = E();
function w({
  apiKey: s = "",
  translations: t = {},
  defaultLocale: e = "en",
  children: a
}) {
  const [l, o] = c(e), [r, g] = c(t);
  p(() => {
    s && Object.keys(t).length === 0 && u.getTranslations(s).then((n) => {
      g(n);
    });
  }, [s]);
  const f = (n) => {
    var i;
    return ((i = r == null ? void 0 : r[n]) == null ? void 0 : i[l]) ?? n;
  }, _ = (n) => {
    o(n);
  };
  return /* @__PURE__ */ m.createElement(d.Provider, { value: { t: f, updateLanguage: _, locale: l } }, a);
}
const v = () => y(d), b = async (s) => await u.getTranslations(s);
export {
  w as default,
  b as getTranslations,
  v as useLoqly
};
