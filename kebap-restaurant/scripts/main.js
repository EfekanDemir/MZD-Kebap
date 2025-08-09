// Mobile navigation toggle
const navToggleButton = document.querySelector('.nav-toggle');
const siteNav = document.getElementById('site-nav');
if (navToggleButton && siteNav) {
  navToggleButton.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggleButton.setAttribute('aria-expanded', String(isOpen));
  });
}

// Smooth anchor scrolling
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;
    e.preventDefault();
    const y = targetEl.getBoundingClientRect().top + window.scrollY - 68;
    window.scrollTo({ top: y, behavior: 'smooth' });
    if (siteNav && siteNav.classList.contains('open')) {
      siteNav.classList.remove('open');
      navToggleButton?.setAttribute('aria-expanded', 'false');
    }
  });
});

// Dynamic current year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Reservation form validation (frontend only demo)
const form = document.querySelector('.reservation-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fields = [
      { id: 'res-name', validator: (v) => v.trim().length > 2, message: 'Lütfen ad soyad girin' },
      { id: 'res-phone', validator: (v) => /^(\+?90|0)?5\d{9}$/.test(v.replace(/\D/g, '')), message: 'Geçerli bir telefon girin' },
      { id: 'res-date', validator: (v) => Boolean(v), message: 'Tarih seçin' },
      { id: 'res-time', validator: (v) => Boolean(v), message: 'Saat seçin' },
      { id: 'res-guests', validator: (v) => Boolean(v), message: 'Kişi sayısı seçin' },
    ];

    let hasError = false;
    fields.forEach((f) => {
      const input = document.getElementById(f.id);
      const errorEl = document.querySelector(`.error[data-for="${f.id}"]`);
      if (!input) return;
      const value = /** @type {HTMLInputElement} */ (input).value;
      const valid = f.validator(value);
      if (!valid) {
        hasError = true;
        if (errorEl) errorEl.textContent = f.message;
      } else if (errorEl) {
        errorEl.textContent = '';
      }
    });

    if (hasError) return;

    const toast = document.querySelector('.form-toast');
    if (toast) {
      toast.hidden = false;
      toast.textContent = 'Talebiniz alındı. Teşekkür ederiz!';
      setTimeout(() => { toast.hidden = true; }, 4000);
    }

    form.reset();
  });
}