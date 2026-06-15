// =============================================
//   PORTFÓLIO — script.js
// =============================================

// 1. NAVBAR: scroll effect + mobile toggle
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  highlightNav();
});

navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// 2. LINK ATIVO NA NAVBAR
function highlightNav() {
  const sections = document.querySelectorAll('section[id], header[id]');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 110) current = s.id;
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}

// 3. SCROLL REVEAL
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.section-inner').forEach(el => observer.observe(el));

// 4. CURIOSIDADE SURPRESA
const surpresas = [
  "🌙 Faço trabalho voluntário.",
  "🍦  Gosto mais de doce do que salgado!",
  "💡 Dançava quando era criança.",
  "🎲 Sou ótima no Uno!",
  "🌈 Minha cor favorita é o roxo.",
  "🤫 Quero aprender a tocar violão.",
  "🎯 Gosto muito de Coca-Cola!",
];
let idx = 0, revelada = false;

function revelarSurpresa() {
  const texto = document.getElementById('surpriseText');
  const card  = document.getElementById('surpriseCard');
  const btn   = document.querySelector('.btn-surprise');

  if (!revelada) {
    texto.textContent = surpresas[idx];
    btn.textContent = 'Próxima';
    card.style.background = 'linear-gradient(135deg, #FFF9C4, #FFF176)';
    revelada = true;
  } else {
    idx = (idx + 1) % surpresas.length;
    texto.style.opacity = '0';
    setTimeout(() => {
      texto.textContent = surpresas[idx];
      texto.style.transition = 'opacity 0.3s';
      texto.style.opacity = '1';
    }, 150);
  }
}

// 5. TOAST ao clicar na Peppa
const peppaScene = document.querySelector('.peppa-scene');
if (peppaScene) {
  peppaScene.style.cursor = 'pointer';
  peppaScene.addEventListener('click', () => showToast('Wheee! 🐷'));
}

function showToast(msg) {
  document.querySelector('.toast')?.remove();
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  Object.assign(t.style, {
    position: 'fixed', bottom: '28px', left: '50%',
    transform: 'translateX(-50%) translateY(70px)',
    background: 'linear-gradient(135deg, #FF4B8C, #e0326e)',
    color: 'white', padding: '12px 26px', borderRadius: '50px',
    fontFamily: "'Nunito',sans-serif", fontWeight: '800', fontSize: '1rem',
    boxShadow: '0 8px 28px rgba(255,75,140,0.5)', zIndex: '9999',
    opacity: '0', transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s',
    maxWidth: '90vw', textAlign: 'center',
  });
  document.body.appendChild(t);
  requestAnimationFrame(() => { t.style.transform = 'translateX(-50%) translateY(0)'; t.style.opacity = '1'; });
  setTimeout(() => {
    t.style.transform = 'translateX(-50%) translateY(70px)'; t.style.opacity = '0';
    setTimeout(() => t.remove(), 400);
  }, 2800);
}