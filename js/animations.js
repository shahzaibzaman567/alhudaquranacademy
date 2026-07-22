export function initAnimations() {
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => {
    el.classList.add('hidden-init');
    observer.observe(el);
  });
}

export function scrollToSection(id) {
  const el = document.querySelector('#' + id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}
