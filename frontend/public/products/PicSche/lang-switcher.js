(function () {
  var KEY = 'picsche_lang';
  function getLang() {
    var p = new URLSearchParams(window.location.search).get('lang');
    if (p === 'ja' || p === 'en') return p;
    return localStorage.getItem(KEY) === 'en' ? 'en' : 'ja';
  }
  function applyLang(lang) {
    localStorage.setItem(KEY, lang);
    document.documentElement.lang = lang;
    var ja = document.querySelectorAll('.lang-ja');
    var en = document.querySelectorAll('.lang-en');
    ja.forEach(function (el) { el.style.display = lang === 'ja' ? '' : 'none'; });
    en.forEach(function (el) { el.style.display = lang === 'en' ? '' : 'none'; });
    var titleJa = document.body.getAttribute('data-title-ja');
    var titleEn = document.body.getAttribute('data-title-en');
    if (titleJa && titleEn) document.title = lang === 'en' ? titleEn : titleJa;
    var links = document.querySelectorAll('.lang-switcher a[data-lang]');
    links.forEach(function (a) {
      a.style.fontWeight = a.getAttribute('data-lang') === lang ? 'bold' : '';
    });
  }
  window.picscheSetLang = function (lang) {
    if (lang !== 'ja' && lang !== 'en') return;
    var url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url);
    applyLang(lang);
  };
  document.addEventListener('DOMContentLoaded', function () {
    var lang = getLang();
    if (new URLSearchParams(window.location.search).get('lang')) applyLang(lang);
    else applyLang(lang);
    document.querySelectorAll('.lang-switcher a[data-lang]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        window.picscheSetLang(a.getAttribute('data-lang'));
      });
    });
  });
})();
