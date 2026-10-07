/* =========================================================
   Dra. Djane Bernardes · Endodontista
   Interações do mini site
   ========================================================= */
(function () {
  'use strict';

  const desktop = window.matchMedia('(min-width: 980px)');

  /* ---------- Faixa de tratamentos: duplica para loop infinito ---------- */
  document.querySelectorAll('[data-marquee]').forEach((track) => {
    track.innerHTML += track.innerHTML;
  });

  /* ---------- Nome gigante ocupa sempre a largura toda ---------- */
  const stage = document.querySelector('.hero__stage');
  const word = document.querySelector('.hero__word');

  function fitWord() {
    if (!stage || !word) return;
    const styles = getComputedStyle(stage);
    const available = stage.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight);

    word.style.fontSize = '100px';
    const spans = [...word.querySelectorAll('span')];
    const widths = spans.map((s) => s.getBoundingClientRect().width);
    const measured = desktop.matches
      ? widths.reduce((a, b) => a + b, 0)
      : Math.max(...widths);

    const size = Math.floor((100 * available) / measured) - 1;
    word.style.fontSize = size + 'px';
    stage.style.setProperty('--word-h', word.offsetHeight + 'px');
  }

  /* ---------- Header com sombra + botão flutuante ---------- */
  const header = document.getElementById('header');
  const fab = document.getElementById('fab');

  function onScroll() {
    const y = window.scrollY;
    header && header.classList.toggle('is-scrolled', y > 10);
    fab && fab.classList.toggle('is-visible', y > window.innerHeight * 0.6);
  }

  /* ---------- Entrada suave das seções ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- Ano no rodapé ---------- */
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Init ---------- */
  fitWord();
  onScroll();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitWord);
  window.addEventListener('resize', fitWord);
  window.addEventListener('scroll', onScroll, { passive: true });
})();
