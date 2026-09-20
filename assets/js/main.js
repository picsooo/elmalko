/* EMLAKO — maquette Webminds */
document.addEventListener('DOMContentLoaded', function () {

  /* Header au scroll */
  var header = document.querySelector('.header');
  function onScroll(){
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 40);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Menu mobile */
  var burger = document.querySelector('.burger');
  var menu = document.querySelector('.menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      menu.classList.toggle('open');
      burger.textContent = menu.classList.contains('open') ? '✕' : '☰';
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        burger.textContent = '☰';
      });
    });
  }

  /* Apparition au scroll */
  var items = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e, i) {
        if (e.isIntersecting) {
          setTimeout(function(){ e.target.classList.add('in'); }, i * 70);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  /* Formulaire (maquette) */
  var form = document.querySelector('#contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = document.querySelector('#formMsg');
      if (msg) {
        msg.style.display = 'block';
        msg.textContent = 'Merci ! Votre demande a bien été enregistrée — un conseiller EMLAKO vous rappelle sous 24h. (Démonstration : le formulaire sera relié à votre boîte mail et à WhatsApp lors de la mise en ligne.)';
      }
      form.reset();
    });
  }

  /* Bascule version sombre / claire */
  var sw = document.getElementById('themeSwitch');
  if (sw) {
    var p = window.location.pathname;
    var isLight = /^\/light(\/|$)/.test(p);
    var txt = sw.querySelector('.switch__txt');
    if (isLight) {
      var back = p.replace(/^\/light/, '');
      if (!back || back === '/') back = '/';
      sw.setAttribute('href', back);
      if (txt) txt.textContent = 'Version sombre';
      sw.classList.add('switch--toLight');
    } else {
      sw.setAttribute('href', '/light' + (p === '/' || p === '' ? '/' : p));
      if (txt) txt.textContent = 'Version claire';
    }
  }

});
