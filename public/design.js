// ================= Design & Data Analyst pages (shared) =================
import { projects, GITHUB_PROFILE } from './projects.js';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const icon = (id) => `<svg><use href="#${id}"/></svg>`;

// ---------- Mobile menu ----------
const nav = $('.dnav');
const menuBtn = $('.menu-btn');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
$$('.dnav-links a').forEach((a) => a.addEventListener('click', () => nav.classList.remove('is-open')));

const grid = $('#project-grid');
if (grid) initProjects(grid);

function initProjects(grid) {
// ---------- Project cards ----------
const category = grid.dataset.category || 'design';
const liveLabel = category === 'data' ? 'View Live' : 'Live Site';
const list = projects.filter((p) => p.category === category);

function linkHtml(href, label, ico) {
  return href
    ? `<a href="${esc(href)}" target="_blank" rel="noopener">${icon(ico)}${label}${icon('i-arrow')}</a>`
    : `<a class="off" aria-disabled="true">${icon(ico)}${label}${icon('i-arrow')}</a>`;
}

grid.innerHTML = list.map((p, i) => `
  <article class="pcard reveal">
    <div class="pcard-media">
      ${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.title)} preview" loading="lazy" />` : ''}
      <span class="open">View project ${icon('i-arrow')}</span>
    </div>
    <div class="pcard-body">
      <h3><button type="button" data-open="${i}">${esc(p.title)}</button></h3>
      <p>${esc(p.description)}</p>
      <div class="tags">${(p.tags || []).map((t) => `<span>${esc(t)}</span>`).join('')}</div>
      <div class="pcard-links">
        ${linkHtml(p.live, liveLabel, 'i-globe')}
        ${linkHtml(p.repo || GITHUB_PROFILE, 'GitHub', 'i-git')}
      </div>
    </div>
  </article>`).join('') || '<p>Projects coming soon.</p>';

// ---------- Project viewer ----------
const viewer = $('#viewer');
function openProject(p) {
  $('#viewer-img').src = p.image || '';
  $('#viewer-img').alt = `${p.title} preview`;
  $('#viewer-title').textContent = p.title;
  $('#viewer-desc').textContent = p.description;
  $('#viewer-tags').innerHTML = (p.tags || []).map((t) => `<span>${esc(t)}</span>`).join('');
  $('#viewer-links').innerHTML = [
    p.live ? `<a class="btn btn-dark" href="${esc(p.live)}" target="_blank" rel="noopener">Visit Live Site ${icon('i-arrow')}</a>` : '',
    `<a class="btn btn-light" href="${esc(p.repo || GITHUB_PROFILE)}" target="_blank" rel="noopener">View on GitHub ${icon('i-arrow')}</a>`,
  ].join('');
  viewer.showModal();
}
grid.addEventListener('click', (e) => {
  if (e.target.closest('.pcard-links a')) return; // direct links work as normal
  const card = e.target.closest('.pcard');
  if (card) openProject(list[$$('.pcard', grid).indexOf(card)]);
});
$('.viewer-close').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', (e) => { if (e.target === viewer) viewer.close(); });

}

// ---------- Reveal on scroll ----------
const io = new IntersectionObserver((entries) => entries.forEach((en) => {
  if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
}), { threshold: 0.1 });
$$('.reveal').forEach((el) => io.observe(el));
