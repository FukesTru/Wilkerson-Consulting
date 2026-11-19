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

  /* Letter pages: an accessible lightbox. Without JavaScript, or in a browser without <dialog>,
     each page link simply opens the full JPG. */
  var pageLinks = Array.prototype.slice.call(document.querySelectorAll('a.letter-page'));
  var hasDialog = typeof HTMLDialogElement === 'function' && 'showModal' in document.createElement('dialog');
  if (pageLinks.length && hasDialog) {
    var svg = function (d) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="' + d + '"/></svg>'; };
    var box = document.createElement('dialog');
    box.className = 'lightbox';
    box.setAttribute('aria-labelledby', 'lightbox-caption');
    box.innerHTML =
      '<div class="lightbox__bar"><p class="lightbox__caption" id="lightbox-caption"></p>' +
      '<button class="lightbox__btn lightbox__close" type="button" aria-label="Close">' + svg('M18 6 6 18M6 6l12 12') + '</button></div>' +
      '<div class="lightbox__stage"></div>' +
      '<div class="lightbox__nav"><button class="lightbox__btn lightbox__prev" type="button" aria-label="Previous page">' + svg('m15 18-6-6 6-6') + '</button>' +
      '<span class="lightbox__count" aria-live="polite"></span>' +
      '<button class="lightbox__btn lightbox__next" type="button" aria-label="Next page">' + svg('m9 18 6-6-6-6') + '</button></div>';
    document.body.appendChild(box);
    var lbStage = box.querySelector('.lightbox__stage'), lbCaption = box.querySelector('.lightbox__caption');
    var lbCount = box.querySelector('.lightbox__count'), lbNav = box.querySelector('.lightbox__nav');
    var lbPrev = box.querySelector('.lightbox__prev'), lbNext = box.querySelector('.lightbox__next'), lbClose = box.querySelector('.lightbox__close');
    var group = [], index = 0, opener = null;

    var preload = function (a) { if (a) { var im = new Image(); im.src = a.getAttribute('data-webp') || a.href; } };
    var show = function (i) {
      index = Math.max(0, Math.min(group.length - 1, i));
      var a = group[index], thumb = a.querySelector('img');
      /* The full-size page is built when shown and removed on close, so no empty image is left in the page */
      var pic = document.createElement('picture'), src = document.createElement('source'), im = document.createElement('img');
      if (a.getAttribute('data-webp')) { src.type = 'image/webp'; src.srcset = a.getAttribute('data-webp'); pic.appendChild(src); }
      im.src = a.getAttribute('href'); im.alt = thumb ? thumb.alt : ''; im.width = 1400; im.height = 1812;
      pic.appendChild(im);
      lbStage.replaceChildren(pic);
      lbCaption.textContent = a.getAttribute('data-caption') || '';
      lbNav.hidden = group.length < 2;
      lbCount.textContent = 'Page ' + (index + 1) + ' of ' + group.length;
      lbPrev.disabled = index === 0;
      lbNext.disabled = index === group.length - 1;
      preload(group[index + 1]); preload(group[index - 1]);
    };
    var open = function (a) {
      var name = a.getAttribute('data-gallery');
      group = pageLinks.filter(function (x) { return x.getAttribute('data-gallery') === name; });
      opener = a;
      show(group.indexOf(a));
      doc.classList.add('lightbox-open');
      box.showModal();
      lbClose.focus();
    };
    var close = function () { if (box.open) box.close(); };
    box.addEventListener('close', function () {
      doc.classList.remove('lightbox-open');
      lbStage.replaceChildren();
      if (opener) opener.focus();
    });

    pageLinks.forEach(function (a) {
      a.addEventListener('click', function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button > 0) return;
        e.preventDefault();
        open(a);
      });
    });
    lbClose.addEventListener('click', close);
    lbPrev.addEventListener('click', function () { show(index - 1); });
    lbNext.addEventListener('click', function () { show(index + 1); });
    /* A click or tap on the dark area around the page closes it */
    box.addEventListener('click', function (e) {
      var t = e.target;
      if (t === box || t.classList.contains('lightbox__stage') || t.classList.contains('lightbox__bar') || t.classList.contains('lightbox__nav')) close();
    });
    box.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' && group.length > 1) { e.preventDefault(); show(index + 1); }
      else if (e.key === 'ArrowLeft' && group.length > 1) { e.preventDefault(); show(index - 1); }
      else if (e.key === 'Tab') {
        /* Keep focus inside the viewer */
        var f = [lbClose, lbPrev, lbNext].filter(function (b) { return !b.disabled && b.offsetParent !== null; });
        if (!f.length) return;
        var at = f.indexOf(document.activeElement);
        e.preventDefault();
        var next = e.shiftKey ? (at <= 0 ? f.length - 1 : at - 1) : (at === -1 || at === f.length - 1 ? 0 : at + 1);
        f[next].focus();
      }
    });
    /* Swipe between pages with one finger; two fingers are left alone for pinch-zoom */
    var sx = null, sy = null;
    box.addEventListener('touchstart', function (e) {
      if (e.touches.length === 1) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; } else { sx = null; }
    }, { passive: true });
    box.addEventListener('touchend', function (e) {
      if (sx === null || group.length < 2 || e.changedTouches.length !== 1) return;
      var zoomed = window.visualViewport && window.visualViewport.scale > 1.01;
      var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      sx = null;
      if (zoomed || Math.abs(dx) < 50 || Math.abs(dy) > 60) return;
      show(index + (dx < 0 ? 1 : -1));
    }, { passive: true });
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
