const nav = document.getElementById('nav');
window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', window.scrollY > 40); }, { passive: true });
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => { navLinks.classList.toggle('open'); });
navLinks.querySelectorAll('a').forEach(a => { a.addEventListener('click', () => navLinks.classList.remove('open')); });
function observeReveal() {
  const revealEls = document.querySelectorAll('.reveal:not(.visible)');
  if (!revealEls.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.closest('.eventi-grid') ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 80 : 0;
        setTimeout(() => { entry.target.classList.add('visible'); }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));
}
document.querySelectorAll('.chi-text, .chi-images, .spazio-text, .spazio-images, .contatti-info, .contatti-form, .musica-content').forEach(el => { el.classList.add('reveal'); });
observeReveal();
const form = document.getElementById('contattiForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Invio in corso...';
    btn.disabled = true;
    await new Promise(r => setTimeout(r, 1000));
    btn.textContent = '✦ Messaggio inviato!';
    btn.style.background = 'var(--teal)';
    setTimeout(() => { btn.textContent = orig; btn.disabled = false; btn.style.background = ''; form.reset(); }, 3000);
  });
}