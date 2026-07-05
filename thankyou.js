/* ════════════════════════════════════════════════════════════════
   BATLIVE — THANKYOU.JS
   Lógica de la página thank-you.html
   Depende de script.js (usa setLang básico)

   ÍNDICE
   ────────────────────────────────────────────────────────────────
   1.  TRADUCCIONES (TY)
   2.  APLICAR TRADUCCIONES
   3.  INIT
   ════════════════════════════════════════════════════════════════ */

/* ── 1. TRADUCCIONES ────────────────────────────────────── */
const TY = {
  en: {
    h1: 'Thank you for your purchase!',
    sub: 'Your license will be sent automatically to the email address used during payment',
    l1: 'You\'ll receive the email in a few minutes',
    l2: 'Check your SPAM folder if you don\'t see it',
  },
  es: {
    h1: '¡Gracias por tu compra!',
    sub: 'Tu licencia se enviará automáticamente al correo electrónico utilizado durante el pago',
    l1: 'Recibirás el email en unos minutos',
    l2: 'Revisa la carpeta SPAM si no lo ves',
  },
  ru: {
    h1: 'Спасибо за покупку!',
    sub: 'Ваша лицензия будет автоматически отправлена на email, указанный при оплате',
    l1: 'Вы получите письмо в течение нескольких минут',
    l2: 'Проверьте папку СПАМ, если не видите его',
  }
};

/* ── 2. APLICAR TRADUCCIONES ────────────────────────────── */
function applyThankyouLang() {
  const lang = localStorage.getItem('batlive-lang') || 'en';
  const t = TY[lang] || TY.en;

  const codes = { en: 'EN', es: 'ES', ru: 'RU' };
  const cur = document.getElementById('lang-current');
  if (cur) cur.textContent = codes[lang] || 'EN';

  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  set('ty-h1', t.h1);
  set('ty-sub', t.sub);
  set('ty-l1', t.l1);
  set('ty-l2', t.l2);
  set('ty-btn-text', t.btn);
}

/* ── 3. INIT ────────────────────────────────────────────── */
(function init() {
  const originalSetLang = window.setLang;
  window.setLang = function(lang) {
    if (typeof originalSetLang === 'function') {
      try { originalSetLang(lang); } catch(e) {}
    }
    localStorage.setItem('batlive-lang', lang);
    document.documentElement.lang = lang;
    const menu = document.getElementById('lang-menu');
    if (menu) menu.classList.remove('open');
    applyThankyouLang();
  };

  applyThankyouLang();
  setTimeout(applyThankyouLang, 0);
  setTimeout(applyThankyouLang, 100);
})();