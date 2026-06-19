/* =========================================================
   Dr. Prabhakar C. Koregol — site interactions
   Vanilla JS, no dependencies. Progressive enhancement.
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Current year in footer ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = String(new Date().getFullYear()); }

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  var closeBtn = document.querySelector('.nav-close');

  var backdrop = document.createElement('div');
  backdrop.className = 'nav-backdrop';
  document.body.appendChild(backdrop);

  function openNav() {
    nav.classList.add('open');
    backdrop.classList.add('show');
    document.body.classList.add('nav-open');
    toggle.setAttribute('aria-expanded', 'true');
  }
  function closeNav() {
    nav.classList.remove('open');
    backdrop.classList.remove('show');
    document.body.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.contains('open') ? closeNav() : openNav();
    });
    if (closeBtn) { closeBtn.addEventListener('click', closeNav); }
    backdrop.addEventListener('click', closeNav);
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { closeNav(); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) { closeNav(); }
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Back to top ---------- */
  var backTop = document.querySelector('.back-to-top');
  if (backTop) {
    var onScroll = function () {
      if (window.scrollY > 600) { backTop.hidden = false; }
      else { backTop.hidden = true; }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Appointment form (AJAX submit) ---------- */
  var form = document.querySelector('.appointment-form');
  if (form) {
    var note = form.querySelector('.form-note');
    form.addEventListener('submit', function (e) {
      // Honeypot: if filled, silently drop (likely a bot)
      var hp = form.querySelector('input[name="_gotcha"]');
      if (hp && hp.value) { e.preventDefault(); return; }

      // Let native validation handle empties first
      if (!form.checkValidity()) { return; }

      var action = form.getAttribute('action') || '';
      // If the form backend hasn't been configured yet, fall back gracefully.
      if (action.indexOf('your-form-id') !== -1) {
        e.preventDefault();
        setNote('Form backend not configured yet. Please call 097434 63444 to book.', 'err');
        return;
      }

      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var original = btn.textContent;
      btn.disabled = true; btn.textContent = 'Sending…';
      setNote('', '');

      fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (res) {
        if (res.ok) {
          form.reset();
          setNote('Thank you! Your request has been received. We will contact you shortly.', 'ok');
        } else {
          setNote('Something went wrong. Please call 097434 63444 to book.', 'err');
        }
      }).catch(function () {
        setNote('Network error. Please call 097434 63444 to book.', 'err');
      }).finally(function () {
        btn.disabled = false; btn.textContent = original;
      });
    });

    function setNote(msg, kind) {
      if (!note) { return; }
      note.textContent = msg;
      note.className = 'form-note' + (kind ? ' ' + kind : '');
    }
  }
})();
