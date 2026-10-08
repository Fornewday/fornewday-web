(function () {
  const theme = localStorage.getItem('batlive-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', theme);

  const lang = localStorage.getItem('batlive-lang') || 'en';

  document.querySelectorAll('.lang-block').forEach(block => {
    block.style.display = block.dataset.lang === lang ? 'block' : 'none';
  });

  const labels = { en: 'Back', es: 'Volver', ru: 'Назад' };
  const btn = document.querySelector('.back-btn span');
  if (btn) btn.textContent = labels[lang] || 'Back';

  const isPrivacy = document.title.includes('Privacy');
  const titles = {
    en: isPrivacy ? 'Privacy Policy' : 'Terms of Use',
    es: isPrivacy ? 'Política de privacidad' : 'Términos de uso',
    ru: isPrivacy ? 'Конфиденциальность' : 'Условия',
  };
  const dates = {
    en: 'Last updated: October 2026',
    es: 'Última actualización: octubre 2026',
    ru: 'Последнее обновление: октябрь 2026',
  };
  const title = document.getElementById('page-title');
  const date  = document.getElementById('page-date');
  if (title) title.textContent = titles[lang] || titles.en;
  if (date)  date.textContent  = dates[lang]  || dates.en;
})();