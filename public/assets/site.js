/* Wilkerson Consulting site script. The site works without it: every link, phone number and the
   form are plain HTML. This only adds the menus, smooth scrolling to the form and gentle motion. */
(function () {
  'use strict';
  var doc = document.documentElement;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Opening animation: any click, tap or key skips it. CSS hides it on its own after 2.3s. */
  function skipIntro() {
    if (!doc.classList.contains('intro-on') || doc.classList.contains('intro-skip')) return;
    doc.classList.add('intro-skip');
    window.setTimeout(function () { doc.classList.remove('intro-on'); }, 300);
  }
  if (doc.classList.contains('intro-on')) {
    ['pointerdown', 'keydown', 'touchstart', 'wheel'].forEach(function (ev) {
      window.addEventListener(ev, skipIntro, { once: true, passive: true });
    });
    window.setTimeout(function () { doc.classList.remove('intro-on'); }, 2600);
  }

  var header = document.querySelector('.site-header');

  /* Header border once the page scrolls */
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Desktop dropdowns: the arrow button opens and closes them for keyboard and touch users */
  var subItems = Array.prototype.slice.call(document.querySelectorAll('.has-sub'));
  function closeSubs(except) {
    subItems.forEach(function (li) {
      if (li === except) return;
      li.classList.remove('is-open');
      var b = li.querySelector('.sub-toggle');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  }
  subItems.forEach(function (li) {
    var btn = li.querySelector('.sub-toggle');
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !li.classList.contains('is-open');
      closeSubs(li);
      li.classList.toggle('is-open', open);
      li.classList.toggle('is-closed', !open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    li.addEventListener('mouseleave', function () { li.classList.remove('is-closed'); });
  });
  document.addEventListener('click', function () { closeSubs(null); });

  /* Mobile menu */
  var toggle = document.querySelector('.menu-toggle');
  var menu = document.getElementById('mobile-menu');
  function setMenu(open) {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.querySelector('.sr-only').textContent = open ? 'Close menu' : 'Open menu';
    if (open) menu.removeAttribute('hidden'); else menu.setAttribute('hidden', '');
    document.body.classList.toggle('menu-open', open);
  }
  if (toggle && menu) {
    toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true'); });
    menu.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a');
      if (a) setMenu(false);
    });
    window.addEventListener('resize', function () { if (window.innerWidth >= 1200) setMenu(false); });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    closeSubs(null);
    if (toggle && toggle.getAttribute('aria-expanded') === 'true') { setMenu(false); toggle.focus(); }
  });

  /* Every Contact us button lands with the whole form in the middle of the screen, clear of the
     sticky header and the round buttons at the bottom of a phone screen. */
  function scrollToForm() {
    var wrap = document.querySelector('.form-wrap');
    if (!wrap) return false;
    var headerH = header ? header.offsetHeight : 0;
    /* Keep the form clear of the corner where the chat widget's welcome bubble opens */
    var chatZone = window.innerWidth < 768 ? 150 : 190;
    var avail = window.innerHeight - headerH - chatZone;
    var rect = wrap.getBoundingClientRect();
    var top = window.scrollY + rect.top - headerH;
    if (rect.height < avail) top -= (avail - rect.height) / 2;
    else top -= 8;
    window.scrollTo({ top: Math.max(0, top), behavior: reduced ? 'auto' : 'smooth' });
    if (history.replaceState) history.replaceState(null, '', '#contact');
    return true;
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href');
    var samePage = href === '#contact' || (href === '/contact/#contact' && location.pathname === '/contact/');
    if (samePage && scrollToForm()) e.preventDefault();
  });
  if (location.hash === '#contact') {
    window.addEventListener('load', function () { window.setTimeout(scrollToForm, 60); });
  }

  /* Phones: the round call and contact buttons step aside while the contact form, or a hero's own
     call and contact buttons, are on screen, so they never sit on top of them. */
  var dockTargets = Array.prototype.slice.call(document.querySelectorAll('.contact-section, .hero .btn-row'));
  if (document.querySelector('.dock') && dockTargets.length && 'IntersectionObserver' in window) {
    var onScreen = [];
    var dockIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var i = onScreen.indexOf(en.target);
        if (en.isIntersecting && i < 0) onScreen.push(en.target);
        if (!en.isIntersecting && i > -1) onScreen.splice(i, 1);
      });
      doc.classList.toggle('dock-off', onScreen.length > 0);
    }, { threshold: 0 });
    dockTargets.forEach(function (el) { dockIo.observe(el); });
  }

  /* Sections settle into place as they come into view */
  var items = Array.prototype.slice.call(document.querySelectorAll('.reveal, .reveal-group'));
  if (!reduced && 'IntersectionObserver' in window) {
    /* Anything already on screen shows at once; only what is further down waits to settle in. */
    items = items.filter(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) { el.classList.add('is-in'); return false; }
      return true;
    });
    doc.classList.add('reveal-ready');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }
})();
