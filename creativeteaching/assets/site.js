// Header: transparent over the hero, solid after scrolling
const bar = document.querySelector('.topbar');
const hasHero = !!document.querySelector('.hero');
const onScroll = () => bar.classList.toggle('solid', !hasHero || window.scrollY > window.innerHeight * 0.6);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Drawer menu
const burger = document.querySelector('.burger');
const drawer = document.getElementById('drawer');
const setMenu = (open) => {
  burger.setAttribute('aria-expanded', open);
  document.body.classList.toggle('menu-open', open);
  if (open) { drawer.hidden = false; requestAnimationFrame(() => drawer.classList.add('open')); }
  else { drawer.classList.remove('open'); setTimeout(() => { if (!drawer.classList.contains('open')) drawer.hidden = true; }, 350); }
};
burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

// Lightbox: each card opens its own photo group
const lb = document.querySelector('.lightbox');
const lbImg = lb.querySelector('img');
const lbCap = lb.querySelector('.lb-cap');
let group = [], idx = 0, title = '', opener = null;
const show = (i) => {
  idx = (i + group.length) % group.length;
  lbImg.src = window.IMGS[group[idx]];
  lbImg.alt = title;
  lbCap.textContent = group.length > 1 ? `${title}　${idx + 1} / ${group.length}` : title;
};
document.querySelectorAll('button.zoom[data-group]').forEach((b) => b.addEventListener('click', () => {
  group = b.dataset.group.split(' ');
  title = b.closest('.card').querySelector('h3').textContent;
  opener = b;
  lb.querySelectorAll('.lb-prev,.lb-next').forEach((x) => (x.hidden = group.length < 2));
  show(0); lb.hidden = false; document.body.style.overflow = 'hidden'; lb.querySelector('.lb-close').focus();
}));
const close = () => { lb.hidden = true; document.body.style.overflow = ''; opener?.focus(); };
lb.querySelector('.lb-close').addEventListener('click', close);
lb.querySelector('.lb-prev').addEventListener('click', () => show(idx - 1));
lb.querySelector('.lb-next').addEventListener('click', () => show(idx + 1));
lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
document.addEventListener('keydown', (e) => {
  if (lb.hidden) return;
  if (e.key === 'Escape') close();
  if (e.key === 'ArrowLeft') show(idx - 1);
  if (e.key === 'ArrowRight') show(idx + 1);
});
