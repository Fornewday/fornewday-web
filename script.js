/* ════════════════════════════════════════════════════════════════
   BATLIVE — SCRIPT.JS

   ÍNDICE
   ────────────────────────────────────────────────────────────────
   1.  TRADUCCIONES (T)
   2.  CAMBIO DE IDIOMA (setLang)
   3.  DROPDOWN IDIOMA (toggleLangMenu)
   4.  TEMA (toggleTheme)
   5.  SCROLL REVEAL (initReveal)
   6.  STATUS BAR animada (animateStatusBar)
   7.  FAQ TOGGLE (toggleFaq)
   8.  MODAL SOPORTE (openModal / closeModal / submit)
   9.  INIT (auto-ejecución al cargar)
   ════════════════════════════════════════════════════════════════ */

/* ── 1. TRADUCCIONES ─────────────────────────────────────── */
const T = {
  es: {
    code: 'ES',
    h1: 'Cuida tu portátil<br><span class="accent">Protege su batería</span>',
    statusText: 'Monitorización · 67%',
    sub: 'Ralentiza el desgaste y preserva la capacidad original a largo plazo',
    btn: 'Comprar BatLive · 4,99 €',
    note: 'Pago único · Sin suscripción',

    whatEyebrow: 'BatLive',
    whatH2: 'Elementos clave',
    whatSub: 'Funciona en segundo plano — tú solo usas el portátil',

    p1Title: 'Monitorización activa',
    p1Text: 'Controla nivel de carga de forma continua en tiempo real',
    p2Title: 'Protección de la batería',
    p2Text: 'Evita cargas extremas y descargas profundas',
    p3Title: 'Ajustes personalizados',
    p3Text: 'Define los umbrales de carga del 0 al 100% sin límites del sistema',

    stat1: 'ciclos de carga',
    stat2: 'sin suscripciones',
    stat2Unit: ' €/mes',
    stat3: 'instalación y arranque',
    footnote: '*Manteniendo la carga entre 20–80% según Battery University BU-808',

    featEyebrow: 'Funciones',
    featH2: 'Todo lo que necesitas — nada más',

    f1Title: 'Parámetros de uso',
    f1Text: 'Mínimo y máximo — adaptados a cómo usas tu portátil',
    f2Title: 'Avisos instantáneos',
    f2Text: 'Notificación sonora y ventana emergente al alcanzar el umbral',
    f3Title: 'Diagnóstico de batería',
    f3Text: 'Control del desgaste real y los ciclos completados',
    f4Title: 'Modo silencioso',
    f4Text: 'Sin sonido, los avisos visuales se mantienen',
    f5Title: 'Control de modos',
    f5Text: 'Tema de interfaz | Arranque automático y trabajo en segundo plano',
    f6Title: '7 idiomas de interfaz',
    f6Text: 'EN · ES · DE · FR · IT · PT · RU',

    footerCopy: '© 2026 Fornewday',
    footerRight: 'Windows 10 / 11',
    footerPrivacy: 'Política de privacidad',
    footerTerms: 'Términos de uso',

    ssH2: 'Controla el rendimiento de la batería de tu portátil',
    ssSub: 'BatLive supervisa el nivel de carga en tiempo real y te avisa cuándo conectar o desconectar el cargador',
    ss1Cap: 'Batería baja · conectar',
    ss2Cap: 'Uso normal · 31%',
    ss3Cap: 'Carga alta · desconectar',
    ssDiagTitle: 'Estados de salud de la batería',
    ssDiagText: 'BatLive analiza los parámetros del sistema para mostrar de forma clara el estado actual de la batería:<br>Buena | Regular | Degradada | Estado crítico',

    priceEyebrow: 'Precio',
    priceH2: 'Pago único — para siempre',
    priceSub: 'Sin suscripciones | Sin renovaciones',
    perkSub: 'Sin suscripciones ni renovaciones',
    perk1: 'Licencia de por vida para 1 dispositivo',
    perkRefund: 'Garantía de devolución de 14 días',
    perk3: 'Soporte por correo electrónico',
    priceBtnText: 'Comprar BatLive',
    priceNum: '4,99',
    priceSecure: 'Pago seguro mediante Stripe',
    priceExtra: 'Recibe tu clave de licencia al instante por email tras el pago',

    faqEyebrow: 'FAQ',
    faqH2: 'Preguntas frecuentes',
    fq1: '¿BatLive funciona en Mac o Linux?',
    fa1: 'No, solo en Windows 10 y 11. De momento no hay versiones para Mac ni Linux.',
    fq2: '¿Funciona en un PC de sobremesa?',
    fa2: 'No. BatLive funciona exclusivamente en portátiles.',
    fq3: '¿Cómo reduce BatLive el desgaste de mi batería?',
    fa3: 'BatLive ayuda a reducir el desgaste recordándote cuándo conviene cargar o desconectar el cargador. El desgaste se acelera cuando la batería pasa demasiado tiempo al 100% (estrés por alto voltaje) o cae por debajo del 20% (descarga profunda). BatLive controla estos estados y te avisa para mantener la carga dentro de la zona óptima (20–80%), donde el desgaste de la batería es menor.',
    fq4: '¿BatLive ralentiza el portátil?',
    fa4: 'No. BatLive usa menos de 20 MB de RAM y realiza una comprobación de batería cada segundo. El impacto en el rendimiento es imperceptible.',
    fq5: '¿BatLive funciona sin conexión a internet?',
    fa5: 'Sí. Solo necesitas internet una vez para activar tu licencia. Después BatLive funciona de forma local y sigue protegiendo tu batería donde vayas. La licencia se revalida automáticamente cada 7 días en segundo plano.',
    fq6: '¿Qué datos recopila BatLive?',
    fa6: 'BatLive respeta tu privacidad. Solo utiliza el identificador de tu hardware (HWID) para validar la licencia y los datos técnicos de tu batería para mostrarte el historial. No recopilamos datos personales, no rastreamos tu actividad ni compartimos nada con terceros.',
    fq7: '¿Puedo usar una licencia en varios dispositivos?',
    fa7: 'No, cada licencia está vinculada a un único dispositivo (HWID). Para cada portátil se necesita una clave distinta.',
    fq8: '¿Qué pasa si formateo mi PC?',
    fa8: 'Al reinstalar Windows en el mismo portátil, tu licencia se reactiva automáticamente porque la licencia está vinculada al identificador de hardware (HWID) de tu portátil. Solo tendrás que volver a introducir tu clave.',
    fq9: '¿Qué recibo justo después del pago?',
    fa9: 'Recibirás por email tu clave de licencia y el enlace de descarga. Descarga, instala e introduce tu clave — ¡y listo!',
    fq10: '¿Existe política de reembolso?',
    fa10: 'BatLive es un producto digital de entrega inmediata, por lo que se renuncia al derecho de desistimiento de 14 días en el checkout. No obstante, si tienes un problema técnico, contáctanos dentro de los 14 días posteriores a la compra y estudiaremos tu caso de forma individual.',

    contactH2: '¿Necesitas ayuda?',
    contactSub: 'Dudas sobre tu licencia o el funcionamiento de BatLive — escríbenos',
    contactBtn: 'Contactar con soporte',

    modalTitle: 'Contactar con soporte',
    modalEmail: 'Correo electrónico',
    modalType: 'Tipo de consulta',
    modalMsg: 'Mensaje',
    modalSubmit: 'Enviar',
    modalOptLicense: 'Problema con licencia',
    modalOptInstall: 'Problema con instalación',
    modalOptRefund: 'Solicitud de reembolso',
    modalOptOther: 'Otro',
    modalPlaceholder: 'Describe tu problema...',
    modalSending: 'Enviando...',
    modalOk: '¡Mensaje enviado!',
    modalError: 'Error al enviar. Inténtalo de nuevo.',
  },

  en: {
    code: 'EN',
    h1: 'Keep your laptop safe<br><span class="accent">Protect your battery</span>',
    statusText: 'Monitoring · 67%',
    sub: 'Slows down wear and tear and preserves its original capacity over time',
    btn: 'Buy BatLive · €4.99',
    note: 'One-time payment · No subscription',

    whatEyebrow: 'BatLive',
    whatH2: 'Core principles',
    whatSub: 'Runs in the background — you just use your laptop',

    p1Title: 'Live monitoring',
    p1Text: 'Real-time audio and visual alerts',
    p2Title: 'Battery protection',
    p2Text: 'Prevents high charge stress and deep discharge',
    p3Title: 'Custom settings',
    p3Text: 'Set charge limits from 0% to 100% without system restrictions',

    stat1: 'battery cycles',
    stat2: 'no subscriptions',
    stat2Unit: ' €/month',
    stat3: 'setup and startup',
    footnote: '*Based on keeping charge between 20–80% per Battery University BU-808',

    featEyebrow: 'Features',
    featH2: 'Everything you need — nothing you don\'t',

    f1Title: 'Operating parameters',
    f1Text: 'Minimum and maximum levels — tailored to how you use your laptop',
    f2Title: 'Instant alerts',
    f2Text: 'Audio signal and popup window when a threshold is reached',
    f3Title: 'Battery diagnostics',
    f3Text: 'Real battery wear and cycle count monitoring',
    f4Title: 'Silent mode',
    f4Text: 'Sound off, popup alerts stay active',
    f5Title: 'Mode settings',
    f5Text: 'Interface theme | Auto-start | Background operation',
    f6Title: '7 interface languages',
    f6Text: 'EN · ES · DE · FR · IT · PT · RU',

    footerCopy: '© 2026 Fornewday',
    footerRight: 'Windows 10 / 11',
    footerPrivacy: 'Privacy Policy',
    footerTerms: 'Terms of Use',

    ssH2: 'Monitor your laptop battery performance',
    ssSub: 'BatLive monitors the charge level in real time and alerts you when to plug in or unplug the charger',
    ss1Cap: 'Low battery · connect',
    ss2Cap: 'Normal use · 31%',
    ss3Cap: 'High charge · disconnect',
    ssDiagTitle: 'Battery health states',
    ssDiagText: 'BatLive analyzes system parameters to clearly display current battery status:<br>Good | Normal | Degraded | Critical',

    priceEyebrow: 'Pricing',
    priceH2: 'Pay once — yours forever',
    priceSub: 'No subscription | No renewals',
    perkSub: 'No subscription or renewals',
    perk1: 'Lifetime license for 1 device',
    perkRefund: '14-day money-back guarantee',
    perk3: 'Email support',
    priceBtnText: 'Buy BatLive',
    priceNum: '4.99',
    priceSecure: 'Secure payment powered by Stripe',
    priceExtra: 'Instant license key by email after purchase',

    faqEyebrow: 'FAQ',
    faqH2: 'Common questions',
    fq1: 'Does BatLive work on Mac or Linux?',
    fa1: 'No. BatLive is only available for Windows 10 and Windows 11. There are currently no versions for Mac or Linux.',
    fq2: 'Does BatLive work on desktop PCs?',
    fa2: 'No. BatLive is designed exclusively for laptops.',
    fq3: 'How does BatLive reduce battery wear?',
    fa3: 'BatLive helps reduce battery wear by reminding you when to plug in or unplug your charger. Battery wear increases when the battery stays at 100% for extended periods (high-voltage stress) or drops below 20% (deep discharge). BatLive monitors these conditions and alerts you to keep your battery within the optimal 20–80% charge range, where battery wear is lower.',
    fq4: 'Does BatLive slow down my laptop?',
    fa4: 'No. BatLive uses less than 20 MB of RAM and checks your battery once every second. The impact on performance is negligible.',
    fq5: 'Does BatLive work without an internet connection?',
    fa5: 'Yes. You only need an internet connection once to activate your license. After that, BatLive runs locally and continues protecting your battery even when you\'re offline. Your license is automatically revalidated in the background every 7 days.',
    fq6: 'What data does BatLive collect?',
    fa6: 'BatLive respects your privacy. It only uses your hardware identifier (HWID) to validate your license and your battery\'s technical data to display your battery history. We do not collect personal data, track your activity, or share any information with third parties.',
    fq7: 'Can I use one license on multiple devices?',
    fa7: 'No. Each license is linked to a single device (HWID). A separate license key is required for each laptop.',
    fq8: 'What happens if I reinstall Windows?',
    fa8: 'If you reinstall Windows on the same laptop, your license will be automatically reactivated because it is linked to your laptop\'s hardware identifier (HWID). You only need to enter your license key again.',
    fq9: 'What do I receive after purchase?',
    fa9: 'You\'ll receive your license key and download link by email. Simply download BatLive, install it, enter your license key, and you\'re ready to go!',
    fq10: 'Do you offer refunds?',
    fa10: 'BatLive is a digital product delivered immediately after purchase, so the 14-day right of withdrawal is waived during checkout. However, if you experience a technical issue, contact us within 14 days of purchase, and we\'ll review your case individually.',

    contactH2: 'Need help?',
    contactSub: 'Questions about your license or how BatLive works — write to us',
    contactBtn: 'Contact support',

    modalTitle: 'Contact support',
    modalEmail: 'Email',
    modalType: 'Type',
    modalMsg: 'Message',
    modalSubmit: 'Send',
    modalOptLicense: 'License issue',
    modalOptInstall: 'Installation problem',
    modalOptRefund: 'Refund request',
    modalOptOther: 'Other',
    modalPlaceholder: 'Describe your issue...',
    modalSending: 'Sending...',
    modalOk: 'Message sent!',
    modalError: 'Failed to send. Please try again.',
  },

  ru: {
    code: 'RU',
    h1: 'Заботься о ноутбуке<br><span class="accent">и его аккумуляторе</span>',
    statusText: 'Мониторинг · 67%',
    sub: 'Замедли износ батареи и сохрани её первоначальную емкость надолго',
    btn: 'Купить BatLive · 4,99 €',
    note: 'Разовая оплата · Без подписки',

    whatEyebrow: 'BatLive',
    whatH2: 'Ключевые элементы',
    whatSub: 'Работает в фоновом режиме — вы просто пользуетесь ноутбуком',

    p1Title: 'Оперативный мониторинг',
    p1Text: 'Звуковые и визуальные уведомления в реальном времени',
    p2Title: 'Защита аккумулятора',
    p2Text: 'Предотвращение пиковых нагрузок и глубокого разряда',
    p3Title: 'Индивидуальные настройки',
    p3Text: 'Установка порогов заряда от 0 до 100% без системных ограничений',

    stat1: 'циклов заряда',
    stat2: 'никаких подписок',
    stat2Unit: ' €/мес',
    stat3: 'установка и запуск',
    footnote: '*При поддержании уровня заряда 20–80% по данным Battery University BU-808',

    featEyebrow: 'Возможности',
    featH2: 'Всё, что нужно — и ничего лишнего',

    f1Title: 'Рабочие параметры',
    f1Text: 'Минимум и максимум — под ваш режим использования',
    f2Title: 'Мгновенные оповещения',
    f2Text: 'Аудиосигнал и всплывающее окно при превышении порога',
    f3Title: 'Диагностика аккумулятора',
    f3Text: 'Контроль реального износа и пройденных циклов',
    f4Title: 'Режим тишины',
    f4Text: 'Отключение звука с сохранением всплывающих окон',
    f5Title: 'Управление режимами',
    f5Text: 'Тема интерфейса | Автозапуск и работа в фоне',
    f6Title: '7 языков интерфейса',
    f6Text: 'EN · ES · DE · FR · IT · PT · RU',

    footerCopy: '© 2026 Fornewday',
    footerRight: 'Windows 10 / 11',
    footerPrivacy: 'Политика конфиденциальности',
    footerTerms: 'Условия использования',

    ssH2: 'Контролируйте состояние батареи ноутбука',
    ssSub: 'BatLive отслеживает состояние аккумулятора и уведомляет, когда нужно подключить или отключить зарядное устройство',
    ss1Cap: 'Низкий заряд · подключить',
    ss2Cap: 'Обычная работа · 31%',
    ss3Cap: 'Высокий заряд · отключить',
    ssDiagTitle: 'Состояния здоровья аккумулятора',
    ssDiagText: 'BatLive анализирует системные параметры, чтобы наглядно отображать текущее состояние аккумулятора:<br>Хорошее | Среднее | Изношен | Критическое состояние',

    priceEyebrow: 'Цена',
    priceH2: 'Разовая покупка — навсегда',
    priceSub: 'Без подписки | Без продления',
    perkSub: 'Без подписки и продлений',
    perk1: 'Бессрочная лицензия на 1 устройство',
    perkRefund: '14 дней гарантии возврата денег',
    perk3: 'Поддержка по email',
    priceBtnText: 'Купить BatLive',
    priceNum: '4,99',
    priceSecure: 'Безопасная оплата через Stripe',
    priceExtra: 'Лицензионный ключ придёт на email сразу после оплаты',

    faqEyebrow: 'FAQ',
    faqH2: 'Частые вопросы',
    fq1: 'BatLive работает на Mac или Linux?',
    fa1: 'Нет, только на Windows 10 и 11. На данный момент версий для Mac и Linux нет.',
    fq2: 'Приложение работает на стационарном ПК?',
    fa2: 'Нет. BatLive работает исключительно на ноутбуках.',
    fq3: 'Как BatLive снижает износ батареи?',
    fa3: 'BatLive помогает снизить износ, напоминая о том, когда стоит подключить ноутбук к зарядке или отключить от неё. Износ ускоряется, когда батарея слишком долго находится на 100% (стресс от высокого напряжения) или опускается ниже 20% (глубокий разряд). BatLive контролирует эти состояния и уведомляет вас, чтобы поддерживать уровень заряда в оптимальном диапазоне (20–80%), где износ батареи минимален.',
    fq4: 'BatLive влияет на скорость работы ноутбука?',
    fa4: 'Нет. BatLive потребляет менее 20 МБ оперативной памяти и проверяет состояние батареи каждую секунду. Влияние на производительность незаметно.',
    fq5: 'BatLive работает без интернета?',
    fa5: 'Да. После активации лицензии интернет не нужен — BatLive работает локально. Интернет требуется только один раз для активации и периодически для проверки лицензии.',
    fq6: 'Какие данные собирает BatLive?',
    fa6: 'BatLive использует идентификатор устройства (HWID) для активации лицензии и технические данные батареи для отображения истории. Мы не собираем личные данные, не отслеживаем действия пользователей и не передаём данные третьим лицам — ни при каких условиях.',
    fq7: 'Можно установить лицензию на другой ноутбук?',
    fa7: 'Нет, каждая лицензия привязана к одному конкретному устройству (HWID). Для каждого ноутбука требуется отдельный ключ.',
    fq8: 'Что произойдет, если я переустановлю Windows?',
    fa8: 'При переустановке Windows на этом же ноутбуке ваша лицензия активируется автоматически, так как она привязана к аппаратному идентификатору (HWID) устройства. Вам нужно будет просто заново ввести свой ключ.',
    fq9: 'Что я получаю сразу после оплаты?',
    fa9: 'Вы получите на email лицензионный ключ и ссылку для скачивания. Скачайте, установите и введите ключ — готово!',
    fq10: 'Есть ли возможность вернуть деньги?',
    fa10: 'BatLive — это цифровой продукт моментальной доставки, поэтому при оформлении заказа вы соглашаетесь с отказом от 14-дневного права на возврат. Тем не менее, если у вас возникнут технические проблемы, свяжитесь с нами в течение 14 дней после покупки, и мы рассмотрим ваш случай индивидуально.',

    contactH2: 'Нужна помощь?',
    contactSub: 'Вопросы по лицензии или работе BatLive — напишите нам',
    contactBtn: 'Написать в поддержку',

    modalTitle: 'Написать в поддержку',
    modalEmail: 'Электронная почта',
    modalType: 'Тип обращения',
    modalMsg: 'Сообщение',
    modalSubmit: 'Отправить',
    modalOptLicense: 'Проблема с лицензией',
    modalOptInstall: 'Проблема с установкой',
    modalOptRefund: 'Запрос на возврат',
    modalOptOther: 'Другое',
    modalPlaceholder: 'Опишите вашу проблему...',
    modalSending: 'Отправка...',
    modalOk: 'Сообщение отправлено!',
    modalError: 'Ошибка отправки. Попробуйте ещё раз.',
  }
};

/* ── 2. CAMBIO DE IDIOMA ─────────────────────────────────── */
function setLang(lang) {
  const t = T[lang];
  if (!t) return;

  const set = (id, val, html = false) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (html) el.innerHTML = val;
    else el.textContent = val;
  };

  set('hero-h1',        t.h1, true);
  set('status-text',    t.statusText);
  set('hero-sub',       t.sub);
  set('hero-btn-text',  t.btn);
  set('hero-note',      t.note);

  set('what-eyebrow',   t.whatEyebrow);
  set('what-h2',        t.whatH2);
  set('what-sub',       t.whatSub);

  set('p1-title', t.p1Title); set('p1-text', t.p1Text);
  set('p2-title', t.p2Title); set('p2-text', t.p2Text);
  set('p3-title', t.p3Title); set('p3-text', t.p3Text);

  set('stat1-label', t.stat1);
  set('stat2-label', t.stat2);
  set('stat2-unit',  t.stat2Unit);
  set('stat3-label', t.stat3);
  set('stats-footnote', t.footnote);

  set('feat-eyebrow', t.featEyebrow);
  set('feat-h2',      t.featH2);

  set('f1-title', t.f1Title); set('f1-text', t.f1Text);
  set('f2-title', t.f2Title); set('f2-text', t.f2Text);
  set('f3-title', t.f3Title); set('f3-text', t.f3Text);
  set('f4-title', t.f4Title); set('f4-text', t.f4Text);
  set('f5-title', t.f5Title); set('f5-text', t.f5Text);
  set('f6-title', t.f6Title); set('f6-text', t.f6Text);

  set('footer-copy',    t.footerCopy, true);
  set('footer-right',   t.footerRight);
  set('footer-privacy', t.footerPrivacy);
  set('footer-terms',   t.footerTerms);

  set('ss-h2',  t.ssH2);
  set('ss-sub', t.ssSub);
  set('ss1-cap', t.ss1Cap);
  set('ss2-cap', t.ss2Cap);
  set('ss3-cap', t.ss3Cap);
  set('ss-diag-title', t.ssDiagTitle);
  set('ss-diag-text',  t.ssDiagText, true);

  set('price-eyebrow',  t.priceEyebrow);
  set('price-h2',       t.priceH2);
  set('price-sub',      t.priceSub);
  set('perk-sub', t.perkSub);
  set('perk1', t.perk1);
  set('perk-refund', t.perkRefund);
  set('perk3', t.perk3);
  set('price-btn-text', t.priceBtnText);
  set('price-num', t.priceNum);
  set('price-secure',   t.priceSecure);
  set('price-extra',    t.priceExtra);

  set('faq-eyebrow', t.faqEyebrow);
  set('faq-h2',      t.faqH2);
  set('fq1', t.fq1);   set('fa1', t.fa1);
  set('fq2', t.fq2);   set('fa2', t.fa2);
  set('fq3', t.fq3);   set('fa3', t.fa3);
  set('fq4', t.fq4);   set('fa4', t.fa4);
  set('fq5', t.fq5);   set('fa5', t.fa5);
  set('fq6', t.fq6);   set('fa6', t.fa6);
  set('fq7', t.fq7);   set('fa7', t.fa7);
  set('fq8', t.fq8);   set('fa8', t.fa8);
  set('fq9', t.fq9);   set('fa9', t.fa9);
  set('fq10', t.fq10); set('fa10', t.fa10);

  set('contact-h2',  t.contactH2);
  set('contact-sub', t.contactSub);
  set('contact-btn', t.contactBtn);

  set('modal-title',       t.modalTitle);
  set('modal-label-email', t.modalEmail);
  set('modal-label-type',  t.modalType);
  set('modal-label-msg',   t.modalMsg);
  set('modal-submit',      t.modalSubmit);
  set('modal-opt-license', t.modalOptLicense);
  set('modal-opt-install', t.modalOptInstall);
  set('modal-opt-refund',  t.modalOptRefund);
  set('modal-opt-other',   t.modalOptOther);
  const ta = document.getElementById('modal-textarea');
  if (ta) ta.placeholder = t.modalPlaceholder;
  const ei = document.getElementById('modal-input-email');
  if (ei) ei.placeholder = 'you@example.com';

  set('lang-current', t.code);
  document.documentElement.lang = lang;

  ['es','en','ru'].forEach(l => {
    const btn = document.getElementById('opt-' + l);
    if (btn) btn.classList.toggle('active', l === lang);
  });

  document.getElementById('lang-menu').classList.remove('open');
  localStorage.setItem('batlive-lang', lang);
}

/* ── 3. DROPDOWN IDIOMA ──────────────────────────────────── */
function toggleLangMenu(e) {
  e.stopPropagation();
  document.getElementById('lang-menu').classList.toggle('open');
}

document.addEventListener('click', () => {
  const m = document.getElementById('lang-menu');
  if (m) m.classList.remove('open');
});

/* ── 4. TEMA ──────────────────────────────────────────────── */
function toggleTheme() {
  const cur  = document.documentElement.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('batlive-theme', next);
}

/* ── 5. SCROLL REVEAL ─────────────────────────────────────── */
function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add('visible');

      // stagger children
      const children = el.querySelectorAll('.reveal-child');
      children.forEach((child, i) => {
        setTimeout(() => child.classList.add('visible'), i * 90);
      });

      io.unobserve(el);
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ── 6. STATUS BAR animada ────────────────────────────────── */
function animateStatusBar() {
  const states = [
    { pct: 67, charging: true  },
    { pct: 68, charging: true  },
    { pct: 69, charging: true  },
    { pct: 70, charging: true  },
    { pct: 71, charging: true  },
    { pct: 72, charging: true  },
    { pct: 73, charging: true  },
    { pct: 74, charging: true  },
    { pct: 75, charging: true  },
    { pct: 76, charging: true  },
    { pct: 77, charging: true  },
    { pct: 78, charging: true  },
    { pct: 79, charging: true  },
    { pct: 80, charging: false },
    { pct: 79, charging: false },
    { pct: 78, charging: false },
    { pct: 77, charging: false },
  ];

  const labels = {
    es: { on: 'Monitorización', off: 'Monitorización' },
    en: { on: 'Monitoring',     off: 'Monitoring'     },
    ru: { on: 'Мониторинг',    off: 'Мониторинг'   },
  };

  let idx = 0;
  setInterval(() => {
    const s    = states[idx % states.length];
    const el   = document.getElementById('status-text');
    const lang = localStorage.getItem('batlive-lang') || 'en';
    const lbl  = labels[lang] || labels.en;
    if (el) el.textContent = `${lbl.on} · ${s.pct}%`;
    idx++;
  }, 1800);
}

/* ── 7. FAQ TOGGLE ────────────────────────────────────────── */
function toggleFaq(btn) {
  const item   = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

/* ── 8. MODAL SOPORTE ─────────────────────────────────────── */
function openModal() {
  document.getElementById('modal-support').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-support').classList.remove('open');
  document.body.style.overflow = '';
  document.getElementById('modal-status').textContent = '';
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});

document.getElementById('modal-support').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

document.getElementById('support-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const form   = this;
  const btn    = document.getElementById('modal-submit');
  const status = document.getElementById('modal-status');
  const lang   = localStorage.getItem('batlive-lang') || 'en';
  const t      = T[lang] || T.en;

  btn.disabled    = true;
  btn.textContent = t.modalSending;
  status.textContent = '';
  status.className   = 'modal-status';

  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  })
  .then(function(r) {
    if (r.ok) {
      status.textContent = t.modalOk;
      status.classList.add('ok');
      form.reset();
    } else {
      status.textContent = t.modalError;
      status.classList.add('err');
    }
  })
  .catch(function() {
    status.textContent = t.modalError;
    status.classList.add('err');
  })
  .finally(function() {
    btn.disabled    = false;
    btn.textContent = t.modalSubmit;
  });
});

/* ── 9. INIT ──────────────────────────────────────────────── */
(function init() {
  // Restaurar preferencias guardadas
  const savedTheme = localStorage.getItem('batlive-theme');
  if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);

  const savedLang = localStorage.getItem('batlive-lang') || 'en';
  setLang(savedLang);

  initReveal();
  animateStatusBar();
})();