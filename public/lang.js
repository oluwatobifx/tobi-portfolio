/* =============================================================
   Language switcher
   Turns every ".lang" (EN) label into a dropdown. Choosing a
   language translates the whole site with Google's website
   translator (loaded only when a non-English language is used).
   The choice is remembered across pages via the "googtrans" cookie.
   ============================================================= */
(() => {
  const LANGS = [
    { code: 'en', short: 'EN', name: 'English' },
    { code: 'fr', short: 'FR', name: 'Français' },
    { code: 'es', short: 'ES', name: 'Español' },
    { code: 'pt', short: 'PT', name: 'Português' },
    { code: 'de', short: 'DE', name: 'Deutsch' },
    { code: 'ar', short: 'AR', name: 'العربية' },
    { code: 'zh-CN', short: 'ZH', name: '中文 (简体)' },
  ];
  const TARGETS = LANGS.filter((l) => l.code !== 'en').map((l) => l.code).join(',');

  // ---------- cookie helpers ----------
  const current = () => {
    const m = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
    const code = m ? decodeURIComponent(m[1]).split('/')[2] : 'en';
    return LANGS.some((l) => l.code === code) ? code : 'en';
  };
  const host = location.hostname;
  const setCookie = (val, expire) => {
    const tail = expire ? '; expires=Thu, 01 Jan 1970 00:00:00 GMT' : '; max-age=31536000';
    document.cookie = `googtrans=${val}; path=/${tail}`;
    if (expire) {
      document.cookie = `googtrans=; path=/; domain=${host}${tail}`;
      document.cookie = `googtrans=; path=/; domain=.${host}${tail}`;
    }
  };

  // ---------- styles (switcher + hide Google's own toolbar) ----------
  const css = `
  .lang-wrap { position: relative; display: inline-flex; }
  button.lang { appearance: none; background: none; border: 0; color: inherit; font: inherit; font-weight: inherit; letter-spacing: inherit; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; padding-left: 0; padding-right: 0; }
  button.lang svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; transition: transform .2s; }
  button.lang[aria-expanded="true"] svg { transform: rotate(180deg); }
  button.lang:focus-visible { outline: 2px solid currentColor; outline-offset: 4px; border-radius: 4px; }
  .lang-menu { position: fixed; z-index: 9999; min-width: 190px; margin: 0; padding: 6px; list-style: none; background: #fff; color: #111; border: 1px solid rgba(0,0,0,.08); border-radius: 14px; box-shadow: 0 18px 40px -12px rgba(0,0,0,.28); opacity: 0; transform: translateY(-6px); pointer-events: none; transition: opacity .16s, transform .16s; font-family: Inter, system-ui, sans-serif; }
  .lang-menu.open { opacity: 1; transform: none; pointer-events: auto; }
  .lang-menu button { all: unset; box-sizing: border-box; width: 100%; display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 9px; font-size: 14.5px; font-weight: 500; cursor: pointer; }
  .lang-menu button:hover, .lang-menu button:focus-visible { background: #f2f2f2; }
  .lang-menu .code { width: 28px; font-size: 12px; font-weight: 700; color: #777; letter-spacing: .04em; }
  .lang-menu [aria-selected="true"] { background: #111; color: #fff; }
  .lang-menu [aria-selected="true"] .code { color: #bbb; }
  .lang-menu .note { padding: 8px 12px 4px; font-size: 11.5px; color: #888; border-top: 1px solid #eee; margin-top: 4px; }
  #gt-el, iframe.skiptranslate, .goog-te-banner-frame, #goog-gt-tt, .goog-te-balloon-frame, .goog-te-spinner-pos,
  .VIpgJd-ZVi9od-ORHb-OEVmcd, .VIpgJd-ZVi9od-aZ2wEe-wOHMyf, .VIpgJd-yAWNEb-L7lbkb { display: none !important; }
  body { top: 0 !important; }
  .goog-text-highlight { background: none !important; box-shadow: none !important; }
  font { background: none !important; box-shadow: none !important; }`;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // Keep the name and email addresses untranslated
  document.querySelectorAll('.logo, a[href^="mailto:"]').forEach((el) => el.classList.add('notranslate'));

  // ---------- Google website translator ----------
  let gLoading = false;
  const applyCombo = (code, tries = 0) => {
    const combo = document.querySelector('.goog-te-combo');
    if (combo && combo.options.length > 1) {
      if (combo.value !== code) { combo.value = code; combo.dispatchEvent(new Event('change')); }
      return;
    }
    if (tries < 60) setTimeout(() => applyCombo(code, tries + 1), 150);
  };
  const loadGoogle = (code) => {
    if (gLoading) { applyCombo(code); return; }
    gLoading = true;
    const holder = document.createElement('div');
    holder.id = 'gt-el';
    document.body.appendChild(holder);
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({ pageLanguage: 'en', includedLanguages: TARGETS, autoDisplay: false }, 'gt-el');
      applyCombo(code);
    };
    const s = document.createElement('script');
    s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    s.async = true;
    document.body.appendChild(s);
  };

  // ---------- build the dropdowns ----------
  const chevron = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg>';
  const active = current();
  const activeLang = LANGS.find((l) => l.code === active);
  const menus = [];

  const closeAll = () => menus.forEach(({ btn, menu }) => { btn.setAttribute('aria-expanded', 'false'); menu.classList.remove('open'); });

  document.querySelectorAll('span.lang').forEach((span, i) => {
    const wrap = document.createElement('div');
    wrap.className = 'lang-wrap notranslate';
    wrap.setAttribute('translate', 'no');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'lang';
    btn.setAttribute('aria-haspopup', 'listbox');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', `Language: ${activeLang.name}. Change language`);
    btn.innerHTML = `${activeLang.short} ${chevron}`;

    const menu = document.createElement('ul');
    menu.className = 'lang-menu notranslate';
    menu.setAttribute('translate', 'no');
    menu.setAttribute('role', 'listbox');
    menu.id = `lang-menu-${i}`;
    btn.setAttribute('aria-controls', menu.id);
    menu.innerHTML = LANGS.map((l) =>
      `<li><button type="button" role="option" data-code="${l.code}" aria-selected="${l.code === active}" lang="${l.code}"><span class="code">${l.short}</span>${l.name}</button></li>`
    ).join('') + '<li class="note">Automatic translation</li>';
    document.body.appendChild(menu);

    span.replaceWith(wrap);
    wrap.appendChild(btn);
    menus.push({ btn, menu });

    const place = () => {
      const r = btn.getBoundingClientRect();
      const w = menu.offsetWidth || 190;
      let left = r.right - w;
      left = Math.max(8, Math.min(left, window.innerWidth - w - 8));
      menu.style.left = left + 'px';
      menu.style.top = (r.bottom + 10) + 'px';
    };

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = btn.getAttribute('aria-expanded') === 'true';
      closeAll();
      if (!open) {
        btn.setAttribute('aria-expanded', 'true');
        place();
        menu.classList.add('open');
        const sel = menu.querySelector('[aria-selected="true"]');
        if (sel) sel.focus({ preventScroll: true });
      }
    });

    menu.addEventListener('keydown', (e) => {
      const items = [...menu.querySelectorAll('button')];
      const idx = items.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); items[(idx + 1) % items.length].focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); items[(idx - 1 + items.length) % items.length].focus(); }
      if (e.key === 'Escape') { closeAll(); btn.focus(); }
    });

    menu.addEventListener('click', (e) => {
      const opt = e.target.closest('button[data-code]');
      if (!opt) return;
      choose(opt.dataset.code);
    });
  });

  function choose(code) {
    closeAll();
    if (code === current()) return;
    if (code === 'en') { setCookie('', true); location.reload(); return; }
    setCookie(`/en/${code}`);
    const l = LANGS.find((x) => x.code === code);
    menus.forEach(({ btn, menu }) => {
      btn.innerHTML = `${l.short} ${chevron}`;
      btn.setAttribute('aria-label', `Language: ${l.name}. Change language`);
      menu.querySelectorAll('[data-code]').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.code === code)));
    });
    loadGoogle(code);
  }

  document.addEventListener('click', (e) => { if (!e.target.closest('.lang-menu')) closeAll(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(); });
  window.addEventListener('resize', closeAll);
  window.addEventListener('scroll', closeAll, { passive: true });

  // Returning visitor who picked a language earlier: translate straight away
  if (active !== 'en') loadGoogle(active);
})();
