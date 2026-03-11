/* ══════════════════════════════════════
   MAIN · Matheus & Emmily
   ══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Nav scroll ── */
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);

    // Active link
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  });

  /* ── Petal animation ── */
  const petalsEl = document.getElementById('petals');
  if (petalsEl) {
    const symbols = ['🌸','✿','❀','♡','🌷','·'];
    for (let i = 0; i < 22; i++) {
      const p = document.createElement('div');
      p.className = 'petal';
      p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      p.style.left              = Math.random() * 100 + '%';
      p.style.animationDuration = (Math.random() * 8 + 6) + 's';
      p.style.animationDelay    = (Math.random() * 12) + 's';
      p.style.fontSize          = (Math.random() * 10 + 9) + 'px';
      petalsEl.appendChild(p);
    }
  }

  /* ── Timeline reveal ── */
  const timelineObs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 120);
        timelineObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.18 });

  document.querySelectorAll('.timeline-item').forEach(el => timelineObs.observe(el));

  /* ── Lightbox ── */
  const lightbox   = document.getElementById('lightbox');
  const lbImg      = document.getElementById('lightbox-img');

  window.openLightbox = (el) => {
    const src = el.querySelector('img').src;
    lbImg.src = src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.src = '';
  };

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-close'))
      window.closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') window.closeLightbox();
  });

  /* ── Toast ── */
  window.showToast = (msg) => {
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
  };

  /* ── RSVP ── */
  window.submitRSVP = () => {
    const nome = document.getElementById('rsvp-nome').value.trim();
    const tel  = document.getElementById('rsvp-tel').value.trim();
    const conf = document.getElementById('rsvp-conf').value;

    if (!nome || !conf) {
      window.showToast('Preencha seu nome e confirmação! 💌');
      return;
    }

    document.querySelector('.rsvp-form').style.display = 'none';
    const suc = document.getElementById('rsvp-success');
    suc.style.display = 'block';

    const msgs = {
      sim:    `${nome}, que alegria enorme! Mal podemos esperar para te abraçar! ♡`,
      talvez: `${nome}, esperamos você com todo carinho! ♡`,
      nao:    `${nome}, sua presença será sentida. Obrigado pelo carinho! ♡`
    };
    suc.textContent = msgs[conf] || msgs.talvez;
  };

});
