// ── NAV ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('solid', scrollY > 60), {passive:true});

// ── PROYECTOS DROPDOWN ──
const navProyectosDropdown = document.getElementById('navProyectosDropdown');
const navProyectosToggle   = document.getElementById('navProyectosToggle');

function closeNavProyectosDropdown() {
  navProyectosDropdown?.classList.remove('is-open');
  navProyectosToggle?.setAttribute('aria-expanded', 'false');
}

navProyectosToggle?.addEventListener('click', e => {
  e.stopPropagation();
  const open = navProyectosDropdown.classList.toggle('is-open');
  navProyectosToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});

navProyectosDropdown?.querySelectorAll('.nav-dropdown-menu a').forEach(link => {
  link.addEventListener('click', closeNavProyectosDropdown);
});

document.addEventListener('click', e => {
  if (!navProyectosDropdown?.contains(e.target)) closeNavProyectosDropdown();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeNavProyectosDropdown();
});

// ── MOBILE NAV ──
function openMobile()  { document.getElementById('mobileNav').classList.add('open');    document.body.style.overflow = 'hidden'; }
function closeMobile() { document.getElementById('mobileNav').classList.remove('open'); document.body.style.overflow = ''; }

// ── SCROLL REVEAL ──
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.rv').forEach(el => io.observe(el));

// ── HERO SLIDER ──
const heroSlides = document.querySelectorAll('#heroSlider .hero-card');
const heroBtns   = document.querySelectorAll('#heroSlider .hero-slider-btn');
let heroIndex = 0;

function setHeroSlide(index) {
  if (!heroSlides.length) return;
  heroSlides[heroIndex].classList.remove('active');
  heroIndex = ((index % heroSlides.length) + heroSlides.length) % heroSlides.length;
  heroSlides[heroIndex].classList.add('active');
}

if (heroSlides.length > 1) {
  heroBtns.forEach(btn => btn.addEventListener('click', () => setHeroSlide(heroIndex + 1)));
}

const heroSlideByHash = { nexevo: 0, farmacheck: 1, orbita: 2 };
document.querySelectorAll('a[href^="#"]').forEach(link => {
  const id = link.getAttribute('href').slice(1);
  if (id in heroSlideByHash) {
    link.addEventListener('click', () => setHeroSlide(heroSlideByHash[id]));
  }
});

// ── NEXEVO ARCH MODAL ──
const nexevoArchModal = document.getElementById('nexevoArchModal');
const nexevoArchOpen  = document.getElementById('nexevoArchOpen');

function syncNavHeight() {
  document.documentElement.style.setProperty('--nav-height', `${nav.offsetHeight}px`);
}

function openNexevoArch() {
  nav.classList.add('solid');
  syncNavHeight();
  nexevoArchModal.classList.add('is-open');
  nexevoArchModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  nexevoArchModal.querySelector('.arch-modal-close').focus();
}

function closeNexevoArch() {
  nexevoArchModal.classList.remove('is-open');
  nexevoArchModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  nav.classList.toggle('solid', scrollY > 60);
  nexevoArchOpen.focus();
}

nexevoArchOpen?.addEventListener('click', openNexevoArch);

nexevoArchModal?.querySelectorAll('[data-arch-close]').forEach(el => {
  el.addEventListener('click', closeNexevoArch);
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && nexevoArchModal?.classList.contains('is-open')) closeNexevoArch();
});

window.addEventListener('resize', syncNavHeight, { passive: true });

// ── ENCUESTA (Google Form en modal) ──
const gformModal = document.getElementById('gformModal');
const gformOpen  = document.getElementById('gformOpen');
const gformIframe = gformModal?.querySelector('.gform-modal-iframe');

function openGform() {
  if (gformIframe && !gformIframe.src) gformIframe.src = gformIframe.dataset.src;
  gformModal.classList.add('is-open');
  gformModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  gformModal.querySelector('.gform-modal-close').focus();
}

function closeGform() {
  gformModal.classList.remove('is-open');
  gformModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  gformOpen?.focus();
}

gformOpen?.addEventListener('click', openGform);
gformModal?.querySelectorAll('[data-gform-close]').forEach(el => el.addEventListener('click', closeGform));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && gformModal?.classList.contains('is-open')) closeGform();
});

// ── FLOW TOOLTIPS (tap en móvil) ──
const flowImgs = document.querySelectorAll('.flow-card-img');
flowImgs.forEach(img => {
  img.addEventListener('click', e => {
    const wasOpen = img.classList.contains('tip-open');
    flowImgs.forEach(other => other.classList.remove('tip-open'));
    if (!wasOpen) img.classList.add('tip-open');
    e.stopPropagation();
  });
});
document.addEventListener('click', () => {
  flowImgs.forEach(img => img.classList.remove('tip-open'));
});
