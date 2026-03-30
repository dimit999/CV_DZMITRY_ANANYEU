(function () {
  'use strict';

  var MQ = '(max-width: 768px)';

  function getEls() {
    return {
      header: document.getElementById('site-header'),
      btn: document.getElementById('nav-menu-btn'),
      backdrop: document.getElementById('nav-backdrop'),
      drawer: document.getElementById('nav-drawer'),
      links: document.querySelectorAll('#nav-drawer a[href^="#"]')
    };
  }

  function isMobile() {
    return window.matchMedia(MQ).matches;
  }

  function setOpen(open) {
    var els = getEls();
    if (!els.header || !els.btn) return;

    els.header.classList.toggle('nav--open', open);
    document.body.classList.toggle('nav-menu-open', open);
    els.btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    els.btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');

    if (els.backdrop) {
      els.backdrop.setAttribute('aria-hidden', open ? 'false' : 'true');
    }
    if (els.drawer) {
      if (isMobile()) {
        els.drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
      } else {
        els.drawer.removeAttribute('aria-hidden');
      }
    }
  }

  function close() {
    setOpen(false);
  }

  function toggle() {
    var els = getEls();
    var open = !els.header.classList.contains('nav--open');
    setOpen(open);
  }

  function onResize() {
    var els = getEls();
    if (!isMobile()) {
      close();
      return;
    }
    if (els.drawer && !els.header.classList.contains('nav--open')) {
      els.drawer.setAttribute('aria-hidden', 'true');
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var els = getEls();
    if (!els.header || !els.btn) return;

    els.btn.addEventListener('click', function () {
      if (!isMobile()) return;
      toggle();
    });

    if (els.backdrop) {
      els.backdrop.addEventListener('click', close);
    }

    els.links.forEach(function (a) {
      a.addEventListener('click', function () {
        if (isMobile()) close();
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && els.header.classList.contains('nav--open')) {
        close();
        els.btn.focus();
      }
    });

    window.addEventListener('resize', onResize);

    if (els.drawer && isMobile()) {
      els.drawer.setAttribute('aria-hidden', 'true');
    }
  });
})();
