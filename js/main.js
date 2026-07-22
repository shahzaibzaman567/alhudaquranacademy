import { initNav } from './nav.js';
import { initAnimations, scrollToSection } from './animations.js';
import { initForm } from './form.js';

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initAnimations();
  initForm();
});

window.scrollToSection = scrollToSection;
