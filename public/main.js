// ================= Oluwatobi portfolio — front-end logic =================
import { projects } from './projects.js';
import { saveMessage } from './supabase.js';

const EMAIL = 'hellooluwatobix@gmail.com';
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

$('#year').textContent = new Date().getFullYear();

// ---------- Mobile menu ----------
const nav = $('.nav');
const menuBtn = $('.menu-btn');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
$$('.nav-links a').forEach((a) => a.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuBtn.setAttribute('aria-expanded', 'false');
}));

// ---------- Reveal on scroll ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
}, { threshold: 0.12 });

// ---------- Projects ----------
const arrow = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>';
const label = { design: 'Web design', data: 'Data analysis' };

function card(p) {
  const main = p.live || p.repo;
  const media = p.image
    ? `<img src="${esc(p.image)}" alt="${esc(p.title)} preview" loading="lazy" />`
    : `<div class="card-placeholder" aria-hidden="true">${esc(p.title)}</div>`;
  const tags = (p.tags || []).map((t) => `<span>${esc(t)}</span>`).join('');
  const links = [
    p.live ? `<a href="${esc(p.live)}" target="_blank" rel="noopener">View live</a>` : '',
    p.repo ? `<a href="${esc(p.repo)}" target="_blank" rel="noopener">Source</a>` : '',
  ].join('');
  return `
    <article class="card reveal">
      <div class="card-media">
        <span class="card-tag">${esc(label[p.category] || p.category)}</span>
        ${media}
        ${main ? `<a class="card-cover-link" href="${esc(main)}" target="_blank" rel="noopener" aria-label="Open ${esc(p.title)}"></a><span class="card-arrow">${arrow}</span>` : ''}
      </div>
      <h3>${esc(p.title)}</h3>
      ${p.description ? `<p>${esc(p.description)}</p>` : ''}
      ${tags ? `<div class="card-meta">${tags}</div>` : ''}
      ${links ? `<div class="card-links">${links}</div>` : ''}
    </article>`;
}

$$('[data-projects]').forEach((grid) => {
  const list = projects.filter((p) => p.category === grid.dataset.projects);
  grid.innerHTML = list.length ? list.map(card).join('') : '<p class="muted">Projects coming soon.</p>';
});
$$('.reveal').forEach((el) => io.observe(el));

// ---------- Contact form (saves to Supabase, falls back to email) ----------
const form = $('#contact-form');
const status = $('.form-status', form);
const sendBtn = $('button[type="submit"]', form);
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  status.className = 'form-status';
  if (!d.name || !d.email || !d.message) {
    status.textContent = 'Please fill in your name, email and message.';
    status.classList.add('err');
    return;
  }
  sendBtn.disabled = true;
  status.textContent = 'Sending…';
  try {
    await saveMessage({ name: d.name, email: d.email, company: d.company || null, need: d.need, message: d.message, page: location.pathname });
    form.reset();
    status.textContent = "Thanks! Your message has been sent. I'll reply within 24 hours.";
    status.classList.add('ok');
  } catch (err) {
    console.warn(err);
    const subject = `${d.need} — enquiry from ${d.name}${d.company ? ` (${d.company})` : ''}`;
    const body = `${d.message}\n\n—\n${d.name}${d.company ? `, ${d.company}` : ''}\n${d.email}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = `Opening your email app… If nothing happens, email me at ${EMAIL}.`;
    status.classList.add('ok');
  } finally {
    sendBtn.disabled = false;
  }
});
