/* ════════════════════════════════════════════════════════════════
   BATLIVE — CHECKOUT.JS
   Lógica de la página checkout.html
   Depende de script.js (usa T[] traducciones y setLang)

   ÍNDICE
   ────────────────────────────────────────────────────────────────
   1.  TRADUCCIONES CHECKOUT (CO)
   2.  APLICAR TRADUCCIONES
   3.  CASILLA + BOTÓN PAGO
   4.  REDIRECCIÓN A STRIPE
   5.  INIT
   ════════════════════════════════════════════════════════════════ */

/* ── 1. TRADUCCIONES CHECKOUT ───────────────────────────── */
const CO = {
  en: {
    eyebrow: 'Order summary',
    h1: 'BatLive — Lifetime License',
    sub: 'One-time payment, no subscription, instant delivery by email.',
    inc1: 'Lifetime license for 1 device',
    inc2: 'Instant license key by email',
    inc3: 'Email support included',
    inc4: 'Windows 10 / 11',
    priceNote: 'One-time payment',
    consent: 'I agree that the digital product is delivered immediately upon payment and I expressly waive my 14-day right of withdrawal.',
    termsLink: 'Read full terms',
    payText: 'Pay €4.99',
    priceNum: '4.99',
    secure: 'Secure payment via Stripe',
  },
  es: {
    eyebrow: 'Resumen del pedido',
    h1: 'BatLive — Licencia de por vida',
    sub: 'Pago único, sin suscripción, entrega inmediata por email.',
    inc1: 'Licencia de por vida para 1 dispositivo',
    inc2: 'Clave de licencia al instante por email',
    inc3: 'Soporte por correo electrónico incluido',
    inc4: 'Windows 10 / 11',
    priceNote: 'Pago único',
    consent: 'Acepto que el producto digital se entrega inmediatamente tras el pago y renuncio expresamente a mi derecho de desistimiento de 14 días.',
    termsLink: 'Leer términos completos',
    payText: 'Pagar 4,99 €',
    priceNum: '4,99',
    secure: 'Pago seguro mediante Stripe',
  },
  ru: {
    eyebrow: 'Детали покупки',
    h1: 'BatLive — Бессрочная лицензия',
    sub: 'Разовая оплата, без подписки, мгновенная доставка по email.',
    inc1: 'Бессрочная лицензия на 1 устройство',
    inc2: 'Лицензионный ключ мгновенно по email',
    inc3: 'Поддержка по email включена',
    inc4: 'Windows 10 / 11',
    priceNote: 'Разовая оплата',
    consent: 'Я согласен, что цифровой продукт доставляется немедленно после оплаты, и я отказываюсь от своего 14-дневного права на возврат.',
    termsLink: 'Читать полные условия',
    payText: 'Оплатить 4,99 €',
    priceNum: '4,99',
    secure: 'Безопасная оплата через Stripe',
  }
};

/* ── 2. APLICAR TRADUCCIONES ────────────────────────────── */
function applyCheckoutLang() {
  const lang = localStorage.getItem('batlive-lang') || 'en';
  const c = CO[lang] || CO.en;

  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  set('co-eyebrow', c.eyebrow);
  set('co-h1', c.h1);
  set('co-sub', c.sub);
  set('co-inc1', c.inc1);
  set('co-inc2', c.inc2);
  set('co-inc3', c.inc3);
  set('co-inc4', c.inc4);
  set('co-price-note', c.priceNote);
  set('co-terms-link', c.termsLink);
  set('co-pay-text', c.payText);
  set('co-secure', c.secure);
  set('co-price-num', c.priceNum);

  // El texto del consent lleva el link dentro, hay que reconstruirlo
  const consentSpan = document.getElementById('co-consent-text');
  if (consentSpan) {
    consentSpan.innerHTML = c.consent + ' <a href="terms.html" target="_blank" id="co-terms-link">' + c.termsLink + '</a>';
  }
}

/* ── 3. CASILLA + BOTÓN PAGO ────────────────────────────── */
const consentCheck = document.getElementById('co-consent-check');
const payBtn = document.getElementById('co-pay-btn');

if (consentCheck && payBtn) {
  consentCheck.addEventListener('change', function() {
    payBtn.disabled = !this.checked;
  });
}

/* ── 4. REDIRECCIÓN A STRIPE ────────────────────────────── */
function goToStripe() {
  if (!consentCheck.checked) return;

  const lang = localStorage.getItem('batlive-lang') || 'en';

  // Guardar aceptación en localStorage (registro local)
  const log = {
    accepted: true,
    timestamp: new Date().toISOString(),
    lang: lang
  };
  localStorage.setItem('batlive-consent', JSON.stringify(log));

  // Payment Link de prueba (cambiar a sk_live_ cuando esté listo)
  // client_reference_id = idioma → lo usa el webhook para enviar email en ese idioma
  const STRIPE_LINK = 'https://buy.stripe.com/test_fZu8wR7Z6gPV5KBfaQ8og00';
  window.location.href = STRIPE_LINK + '?client_reference_id=' + lang;
}

/* ── 5. INIT ────────────────────────────────────────────── */
(function init() {
  // Sobrescribir setLang del script.js para que también actualice checkout
  const originalSetLang = window.setLang;
  window.setLang = function(lang) {
    if (typeof originalSetLang === 'function') {
      try { originalSetLang(lang); } catch(e) {}
    }
    localStorage.setItem('batlive-lang', lang);
    document.documentElement.lang = lang;
    const codes = { en: 'EN', es: 'ES', ru: 'RU' };
    const cur = document.getElementById('lang-current');
    if (cur) cur.textContent = codes[lang] || 'EN';
    const menu = document.getElementById('lang-menu');
    if (menu) menu.classList.remove('open');
    applyCheckoutLang();
  };

  applyCheckoutLang();
})();