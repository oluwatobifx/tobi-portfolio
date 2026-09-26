// ================= Tobi portfolio — front-end logic =================
import { projects } from './projects.js';

const EMAIL = 'miracle@lfv.com.ng';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

const escapeHtml = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

$('#year').textContent = new Date().getFullYear();

// ---------- Mobile menu ----------
const nav = $('.nav');
const menuBtn = $('.menu-btn');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menuBtn.setAttribute('aria-expanded', String(open));
});
$$('.nav-links a').forEach((a) => a.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuBtn.setAttribute('aria-expanded', 'false');
}));

// ---------- Reveal animations ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
}, { threshold: 0.15 });
requestAnimationFrame(() => $$('.reveal').forEach((el) => io.observe(el)));

// ---------- Projects ----------
const grid = $('#projects');
let currentFilter = 'all';

const arrowSvg = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function cardHtml(p) {
  const tags = (p.tags || []).map((t) => `<span>${escapeHtml(t)}</span>`).join('');
  const main = p.live || p.repo;
  const media = p.image
    ? `<img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)} preview" loading="lazy" />`
    : `<div class="card-placeholder" aria-hidden="true">${escapeHtml(p.title)}</div>`;
  const links = [
    p.live ? `<a href="${escapeHtml(p.live)}" target="_blank" rel="noopener">Live site</a>` : '',
    p.repo ? `<a href="${escapeHtml(p.repo)}" target="_blank" rel="noopener">Source code</a>` : '',
  ].join('');
  return `
    <article class="card reveal" data-category="${escapeHtml(p.category)}">
      <div class="card-media">
        <span class="card-tag">${escapeHtml(p.category)}</span>
        ${media}
        ${main ? `<a class="card-cover-link" href="${escapeHtml(main)}" target="_blank" rel="noopener" aria-label="Open ${escapeHtml(p.title)}"></a><span class="card-arrow">${arrowSvg}</span>` : ''}
      </div>
      <h3>${escapeHtml(p.title)}</h3>
      ${p.description ? `<p>${escapeHtml(p.description)}</p>` : ''}
      ${tags ? `<div class="card-meta">${tags}</div>` : ''}
      ${links ? `<div class="card-links">${links}</div>` : ''}
    </article>`;
}

function applyFilter(filter) {
  currentFilter = filter;
  $$('.chip').forEach((c) => {
    const on = c.dataset.filter === filter;
    c.classList.toggle('is-active', on);
    c.setAttribute('aria-selected', String(on));
  });
  $$('.card', grid).forEach((card) => {
    card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.category !== filter);
  });
}

grid.innerHTML = projects.length ? projects.map(cardHtml).join('') : '<p class="empty">Projects coming soon.</p>';
$$('.reveal', grid).forEach((el) => io.observe(el));
applyFilter(currentFilter);

$$('.chip').forEach((c) => c.addEventListener('click', () => {
  applyFilter(c.dataset.filter);
}));
$$('[data-filter-link]').forEach((a) => a.addEventListener('click', () => applyFilter(a.dataset.filterLink)));

// ---------- Contact form (no server: opens the visitor's email app) ----------
const form = $('#contact-form');
const status = $('.form-status', form);
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  status.className = 'form-status';
  if (!d.name || !d.email || !d.message) {
    status.textContent = 'Please fill in your name, email and message.';
    status.classList.add('err');
    return;
  }
  const subject = `Portfolio enquiry from ${d.name}${d.company ? ` (${d.company})` : ''}`;
  const body = `${d.message}\n\n—\n${d.name}${d.company ? `, ${d.company}` : ''}\n${d.email}`;
  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  status.textContent = `Opening your email app… If nothing happens, email me at ${EMAIL}.`;
  status.classList.add('ok');
});
