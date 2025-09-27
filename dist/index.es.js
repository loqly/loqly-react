import y, { useState as m, useEffect as L, createContext as j, useContext as v } from "react";
const d = async (s, t = null, a = {}) => {
  if (!s) throw new Error("API key is required");
  let e = "";
  t && Object.keys(t).length > 0 && (t.projectIds && (e += `projectIds=${t.projectIds.join(",")}&`), t.namespaces && (e += `namespaces=${t.namespaces.join(",")}&`), t.languages && (e += `languages=${t.languages.join(",")}`));
  let l = a;
  try {
    const n = window.location.href.includes("http://localhost") ? "http://localhost:3000" : "https://api.loqly.dev", o = await fetch(`${n}/v1/strings?${e}`, {
      method: "GET",
      headers: {
        Authorization: `Apikey ${s}`,
        "Content-Type": "application/json"
      }
    }), r = await o.json();
    if (!o.ok || r.error)
      throw new Error(r.error || "Something went wrong, please try again.");
    r.strings && (l = r.strings);
  } catch (n) {
    throw new Error(n);
  } finally {
    return l;
  }
};
function _(s, t) {
  if (!t) return s;
  const a = /\{([^\s{}]+)\}/g;
  return [...s.matchAll(a)].map((e) => e[1]).reduce((e, l) => l in t ? e.replace(new RegExp(`\\{${l}\\}`, "g"), t[l]) : e, s);
}
class c {
  constructor({ apiKey: t, defaultLocale: a = "en" }) {
    this.apiKey = t, this.this._defaultLocale = a, this._locale = a, this._translations = null, this._translatableElements = [];
  }
  // Initialize translations from your API
  async init() {
    this._translations = await d(this.apiKey), this.cacheElements(), this.translateElements(this._translatableElements);
  }
  // Only fetch & return translations
  static async getTranslations(t, a = null, e = {}) {
    return await d(t, a, e);
  }
  static interpolateTranslation(t, a = null) {
    return _(t, a);
  }
  // Translation lookup with fallback
  t(t, a = null) {
    var e, l, n, o;
    const r = ((l = (e = this._translations) == null ? void 0 : e[t]) == null ? void 0 : l[this._locale]) || ((o = (n = this._translations) == null ? void 0 : n[t]) == null ? void 0 : o[this._defaultLocale]);
    return _(r || t, a);
  }
  // Cache all elements with data-t attribute
  cacheElements() {
    this._translatableElements = Array.from(
      document.querySelectorAll("[data-t]")
    );
  }
  // Translate a list of elements
  translateElements(t) {
    t.forEach((a) => {
      const e = a.getAttribute("data-t");
      e && (a.textContent = this.t(e));
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
    this._locale = t;
  }
  get defaultLocale() {
    return this._defaultLocale;
  }
  set defaultLocale(t) {
    this._defaultLocale = t;
  }
}
const E = j();
function T({
  translations: s = {},
  defaultLocale: t = "en",
  children: a
}) {
  const [e, l] = m(t), [n, o] = m(s);
  L(() => {
    o(s);
  }, [s]);
  const r = (i, u = null) => {
    var p, f;
    const h = (p = n == null ? void 0 : n[i]) == null ? void 0 : p[e];
    if (h) return c.interpolateTranslation(h, u);
    const g = (f = n == null ? void 0 : n[i]) == null ? void 0 : f[t];
    return g ? c.interpolateTranslation(g, u) : c.interpolateTranslation(i, u);
  }, w = (i) => {
    l(i);
  };
  return /* @__PURE__ */ y.createElement(E.Provider, { value: { t: r, updateLanguage: w, locale: e } }, a);
}
const A = () => v(E), $ = c.getTranslations;
export {
  T as default,
  $ as getTranslations,
  A as useLoqly
};
