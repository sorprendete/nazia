(() => {
  'use strict';
  const audio = document.getElementById('birthday-music');
  const control = document.getElementById('music-control');
  const button = document.getElementById('music-toggle');
  const label = document.getElementById('music-label');
  const icon = document.getElementById('music-icon');
  const status = document.getElementById('music-status');
  const openButton = document.getElementById('open-invitation');
  if (!audio || !button || !openButton) return;

  audio.volume = 0.35;
  let wantsMusic = false;
  let attempt = 0;

  function render(playing) {
    label.textContent = playing ? 'Pausar música' : 'Activar música';
    icon.textContent = playing ? 'Ⅱ' : '♫';
    button.setAttribute('aria-label', playing ? 'Pausar música de cumpleaños' : 'Reproducir música de cumpleaños');
  }

  async function play() {
    wantsMusic = true;
    const currentAttempt = ++attempt;
    status.textContent = '';
    label.textContent = 'Cargando música…';
    try {
      // Called directly during a user gesture, before the envelope animation.
      await audio.play();
      if (currentAttempt !== attempt || !wantsMusic) return;
      render(true);
    } catch (error) {
      if (currentAttempt !== attempt) return;
      wantsMusic = false;
      render(false);
      status.textContent = error.name === 'NotAllowedError'
        ? 'Toca Activar música para escuchar la canción.'
        : 'No se pudo cargar la música. Toca Activar música para intentarlo otra vez.';
    }
  }

  function pause() {
    wantsMusic = false;
    attempt++;
    audio.pause();
    render(false);
  }

  openButton.addEventListener('click', () => {
    control.hidden = false;
    void play();
  }, { once: true });

  button.addEventListener('click', () => {
    if (wantsMusic) pause();
    else {
      if (audio.error) audio.load();
      void play();
    }
  });
  audio.addEventListener('playing', () => render(true));
  audio.addEventListener('pause', () => render(false));
  audio.addEventListener('error', () => {
    wantsMusic = false;
    render(false);
    status.textContent = 'No se pudo cargar la canción. Puedes volver a intentarlo.';
  });
  window.addEventListener('pagehide', pause);
})();
