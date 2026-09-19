(() => {
  'use strict';
  const config = window.INVITATION_CONFIG;
  const welcome = document.getElementById('welcome');
  const invitation = document.getElementById('invitation');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const layer = document.getElementById('sparkles');
  let clearTimer;

  function safeHttps(value, fallback) {
    try { const url = new URL(value); return url.protocol === 'https:' ? url.href : fallback; }
    catch { return fallback; }
  }

  if (config) {
    document.querySelectorAll('[data-field]').forEach(element => {
      const value = config[element.dataset.field];
      if (value !== undefined) element.textContent = String(value);
    });
    document.querySelector('.seal span').textContent = config.age;
    const title = `¡${config.name} cumple ${config.age} años!`;
    document.title = `${title} · Una fiesta llena de magia`;
    document.querySelector('[property="og:title"]').content = title;
    const date = new Date(`${config.date}T12:00:00Z`);
    if (!Number.isNaN(date.getTime())) {
      const dateOptions = { timeZone: 'UTC' };
      const formatted = date.toLocaleDateString('es-ES', { ...dateOptions, day: 'numeric', month: 'long', year: 'numeric' });
      const dateElement = document.getElementById('event-date');
      dateElement.textContent = formatted;
      dateElement.dateTime = config.date;
      const weekday = date.toLocaleDateString('es-ES', { ...dateOptions, weekday: 'long' });
      document.getElementById('weekday').textContent = weekday.charAt(0).toUpperCase() + weekday.slice(1);
      document.getElementById('short-date').textContent = date.toLocaleDateString('es-ES', { ...dateOptions, day: 'numeric', month: 'long' }).toUpperCase() + ' · ' + date.getUTCFullYear();
      document.querySelector('meta[name="description"]').content = `${title} Una tarde llena de música, alegría y magia. ${formatted}. ${config.address}.`;
    }
    if (/^([01]\d|2[0-3]):[0-5]\d$/.test(config.time)) {
      const [hour, minute] = config.time.split(':').map(Number);
      const time = document.getElementById('event-time');
      time.textContent = `${hour % 12 || 12}:${String(minute).padStart(2, '0')} ${hour >= 12 ? 'p. m.' : 'a. m.'}`;
      time.dateTime = config.time;
    }
    const maps = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(`${config.address}, ${config.country}`);
    document.getElementById('maps-link').href = safeHttps(config.mapsUrl, maps);
    const message = config.whatsappMessage.replaceAll('{name}', config.name);
    const whatsapp = `https://wa.me/${config.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    document.getElementById('rsvp-link').href = safeHttps(config.whatsappUrl, whatsapp);
  }

  function celebrate() {
    if (motion.matches) return;
    clearTimeout(clearTimer);
    layer.replaceChildren();
    const colors = ['#b59ad5', '#da91b5', '#d7b66f', '#90b8d5'];
    for (let i = 0; i < 25; i++) {
      const star = document.createElement('span');
      star.className = 'sparkle';
      star.textContent = i % 4 ? '✦' : '♡';
      star.style.setProperty('--x', `${Math.random() * 100}%`);
      star.style.setProperty('--size', `${12 + Math.random() * 15}px`);
      star.style.setProperty('--color', colors[i % colors.length]);
      star.style.setProperty('--delay', `${Math.random() * .5}s`);
      layer.append(star);
    }
    clearTimer = setTimeout(() => layer.replaceChildren(), 3100);
  }

  // The complete invitation remains accessible if JavaScript is unavailable.
  invitation.hidden = true;
  welcome.hidden = false;
  document.getElementById('open-invitation').addEventListener('click', () => {
    const reveal = () => {
    welcome.hidden = true;
    invitation.hidden = false;
    invitation.classList.add('entering');
    document.getElementById('party-title').focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
    celebrate();
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          celebrate();
          observer.disconnect();
        }
      }, { threshold: .7 });
      observer.observe(document.getElementById('closing'));
    }
    };
    if (motion.matches) reveal();
    else {
      welcome.classList.add('opening');
      document.getElementById('open-invitation').disabled = true;
      setTimeout(reveal, 450);
    }
  }, { once: true });
  motion.addEventListener('change', () => {
    if (motion.matches) { clearTimeout(clearTimer); layer.replaceChildren(); }
  });
})();
