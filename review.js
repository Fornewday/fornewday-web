const API_URL = "https://batlive-server.onrender.com";

const REV = {
  en: {
    loading: "Loading...",
    invalid: "This link is not valid",
    title: "How is BatLive working for you?",
    precargada: "You already left a review. You can update it below.",
    lowText: "Thanks. What made it fall short, or what could we improve?",
    highText: "Great! What do you like most about BatLive?",
    commentPlaceholder: "Your comment (optional)",
    namePlaceholder: "Name (optional)",
    emailPlaceholder: "Email (optional)",
    publishLabel: "I allow BatLive to publish this review on the website (name and country included if provided).",
    submit: "Send",
    thanksTitleLow: "Thank you",
    thanksTextLow: "We'll use this to improve BatLive.",
    thanksTitleHigh: "Thank you!",
    thanksTextHigh: "If you allowed it, your review will appear on the site soon.",
  },
  es: {
    loading: "Cargando...",
    invalid: "Este enlace no es válido",
    title: "¿Qué tal te está funcionando BatLive?",
    precargada: "Ya nos diste tu opinión. Puedes actualizarla abajo.",
    lowText: "Gracias. ¿Qué te ha hecho dudar o qué podríamos mejorar?",
    highText: "¡Genial! ¿Qué es lo que más te gusta de BatLive?",
    commentPlaceholder: "Tu comentario (opcional)",
    namePlaceholder: "Nombre (opcional)",
    emailPlaceholder: "Email (opcional)",
    publishLabel: "Autorizo a publicar esta opinión en la web de BatLive (con nombre y país si los indico).",
    submit: "Enviar",
    thanksTitleLow: "Gracias",
    thanksTextLow: "Lo tendremos en cuenta para mejorar BatLive.",
    thanksTitleHigh: "¡Gracias!",
    thanksTextHigh: "Si lo autorizaste, tu opinión aparecerá pronto en la web.",
  },
  ru: {
    loading: "Загрузка...",
    invalid: "Эта ссылка недействительна",
    title: "Как вам BatLive?",
    precargada: "Вы уже оставили отзыв. Вы можете обновить его ниже.",
    lowText: "Спасибо. Что вас не устроило или что нам стоит улучшить?",
    highText: "Отлично! Что вам больше всего нравится в BatLive?",
    commentPlaceholder: "Ваш комментарий (необязательно)",
    namePlaceholder: "Имя (необязательно)",
    emailPlaceholder: "Email (необязательно)",
    publishLabel: "Разрешаю BatLive опубликовать этот отзыв на сайте (с именем и страной, если указаны).",
    submit: "Отправить",
    thanksTitleLow: "Спасибо",
    thanksTextLow: "Учтём это, чтобы улучшить BatLive.",
    thanksTitleHigh: "Спасибо!",
    thanksTextHigh: "Если вы разрешили, отзыв скоро появится на сайте.",
  },
};

let currentRating = 0;
let reviewToken = null;

function applyReviewLang() {
  const lang = localStorage.getItem('batlive-lang') || 'en';
  const t = REV[lang] || REV.en;

  document.getElementById('rv-loading-text').textContent = t.loading;
  document.getElementById('rv-invalid-title').textContent = t.invalid;
  document.getElementById('rv-title').textContent = t.title;
  document.getElementById('rv-precargada').textContent = t.precargada;
  document.getElementById('rv-low-text').textContent = t.lowText;
  document.getElementById('rv-high-text').textContent = t.highText;
  document.getElementById('rv-comment').placeholder = t.commentPlaceholder;
  document.getElementById('rv-name').placeholder = t.namePlaceholder;
  document.getElementById('rv-email').placeholder = t.emailPlaceholder;
  document.getElementById('rv-publish-label').textContent = t.publishLabel;
  document.getElementById('rv-submit').textContent = t.submit;
}

// Igual que checkout.js: envolvemos setLang para refrescar también esta página
const _originalSetLang = window.setLang;
window.setLang = function(lang) {
  _originalSetLang(lang);
  applyReviewLang();
};

function selectRating(value) {
  currentRating = value;
  document.querySelectorAll('.star').forEach(function(el) {
    el.classList.toggle('active', parseInt(el.dataset.value, 10) <= value);
  });

  document.getElementById('rv-block-low').style.display = value <= 3 ? 'block' : 'none';
  document.getElementById('rv-block-high').style.display = value >= 4 ? 'block' : 'none';
  document.getElementById('rv-publish-wrap').style.display = value >= 4 ? 'block' : 'none';
  document.getElementById('rv-comment-wrap').style.display = 'block';
  document.getElementById('rv-extra-fields').style.display = 'block';
  document.getElementById('rv-submit').style.display = 'inline-block';
}

function showState(state) {
  ['review-loading', 'review-invalid', 'review-form', 'review-thanks'].forEach(function(id) {
    document.getElementById(id).style.display = (id === state) ? 'block' : 'none';
  });
}

function fillFormFromExisting(review) {
  if (!review) return;
  document.getElementById('rv-precargada').style.display = 'block';
  selectRating(review.rating);
  document.getElementById('rv-comment').value = review.comment || '';
  document.getElementById('rv-name').value = review.name || '';
  document.getElementById('rv-email').value = review.email || '';
  document.getElementById('rv-allow-publish').checked = !!review.allow_publish;
}

async function loadReview() {
  const params = new URLSearchParams(window.location.search);
  reviewToken = params.get('t');

  if (!reviewToken) {
    showState('review-invalid');
    applyReviewLang();
    return;
  }

  try {
    const res = await fetch(`${API_URL}/review/${reviewToken}`);
    const data = await res.json();

    if (!data.ok) {
      showState('review-invalid');
      applyReviewLang();
      return;
    }

    if (data.lang && ['en', 'es', 'ru'].includes(data.lang)) {
      setLang(data.lang);
    } else {
      applyReviewLang();
    }

    fillFormFromExisting(data.review);
    showState('review-form');
  } catch (e) {
    showState('review-invalid');
    applyReviewLang();
  }
}

async function submitReview() {
  if (!currentRating) return;

  const payload = {
    rating: currentRating,
    comment: document.getElementById('rv-comment').value.trim(),
    name: document.getElementById('rv-name').value.trim(),
    email: document.getElementById('rv-email').value.trim(),
    allow_publish: document.getElementById('rv-allow-publish').checked,
  };

  try {
    const res = await fetch(`${API_URL}/review/${reviewToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (!data.ok) return;

    const lang = localStorage.getItem('batlive-lang') || 'en';
    const t = REV[lang] || REV.en;
    const low = currentRating <= 3;
    document.getElementById('rv-thanks-title').textContent = low ? t.thanksTitleLow : t.thanksTitleHigh;
    document.getElementById('rv-thanks-text').textContent = low ? t.thanksTextLow : t.thanksTextHigh;
    showState('review-thanks');
  } catch (e) {
    // silencioso por ahora; se puede añadir mensaje de error de red más adelante
  }
}

document.addEventListener('DOMContentLoaded', loadReview);