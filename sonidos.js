// Teclas, crujidos y papel generados localmente, sin archivos ni descargas.
(() => {
  const Audio = window.AudioContext || window.webkitAudioContext;
  const toggle = document.querySelector('#sonido-boton');
  if (!Audio || !toggle) return;
  const key = 'mar-abril-sonido';
  let enabled = true;
  try { enabled = localStorage.getItem(key) !== 'silenciado'; } catch { /* Preferencia solo en esta visita. */ }
  let context;
  let output;
  let mix;
  const buffers = new Map();

  function updateToggle() {
    toggle.hidden = false;
    toggle.setAttribute('aria-pressed', String(enabled));
    toggle.textContent = enabled ? 'Sonido: sí' : 'Sonido: no';
    toggle.title = enabled ? 'Silenciar los sonidos' : 'Activar los sonidos';
    if (output) output.gain.value = enabled ? 1 : 0;
  }
  async function prepare() {
    if (!enabled) return false;
    try {
      if (!context) {
        context = new Audio({ latencyHint: 'interactive' });
        mix = context.createDynamicsCompressor();
        mix.threshold.value = -7;
        mix.knee.value = 6;
        mix.ratio.value = 5;
        mix.attack.value = 0.001;
        mix.release.value = 0.08;
        const limiter = context.createWaveShaper();
        const curve = new Float32Array(2048);
        for (let i = 0; i < curve.length; i++) {
          curve[i] = 0.96 * Math.tanh(2 * (i * 2 / (curve.length - 1) - 1));
        }
        limiter.curve = curve;
        output = context.createGain();
        output.gain.value = enabled ? 1 : 0;
        mix.connect(limiter).connect(output);
        output.connect(context.destination);
      }
      if (context.state !== 'running') {
        // Inicia el desbloqueo dentro del gesto; ayuda en navegadores móviles.
        const resumed = context.resume();
        const unlock = context.createBufferSource();
        unlock.buffer = context.createBuffer(1, 1, context.sampleRate);
        unlock.connect(output);
        unlock.onended = () => unlock.disconnect();
        unlock.start();
        await resumed;
      }
      return enabled && context.state === 'running';
    } catch { return false; }
  }
  function bufferFor(kind, variant) {
    const cacheKey = `${kind}-${variant}`;
    if (buffers.has(cacheKey)) return buffers.get(cacheKey);
    const paper = kind === 'pagina';
    const duration = paper ? 0.68 : 0.28;
    const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * duration), context.sampleRate);
    const samples = buffer.getChannelData(0);
    const pops = paper ? [0.08, 0.19, 0.31, 0.39, 0.5, 0.57] : [0.025, 0.049, 0.075, 0.12, 0.158];
    const tone = 180 + variant * 13;
    let lowNoise = 0;
    let peak = 0;
    for (let i = 0; i < samples.length; i++) {
      const t = i / context.sampleRate;
      const noise = Math.random() * 2 - 1;
      lowNoise += 0.17 * (noise - lowNoise);
      let sample;
      if (paper) {
        const envelope = Math.pow(Math.sin(Math.PI * i / samples.length), 0.9);
        const folds = 0.65 + 0.2 * Math.sin(t * 72) + 0.15 * Math.sin(t * 139);
        sample = (0.45 * noise + 1.5 * lowNoise) * envelope * folds;
      } else {
        const attack = Math.min(1, t / 0.001);
        const body = 0.68 * Math.sin(2 * Math.PI * tone * t)
          + 0.24 * Math.sin(2 * Math.PI * tone * 2.1 * t)
          + 0.12 * Math.sin(2 * Math.PI * tone * 3.7 * t);
        sample = attack * (body * Math.exp(-t * 36) + 0.42 * noise * Math.exp(-t * 210));
        // Roce breve y pequeñas burbujas: textura de tecla adhesiva al soltarse.
        const peel = Math.max(0, Math.sin(Math.PI * Math.min(1, Math.max(0, (t - 0.018) / 0.16))));
        sample += peel * (0.38 * lowNoise + 0.13 * Math.sin(2 * Math.PI * (310 * t - 430 * t * t)));
        const release = t - 0.095;
        if (release >= 0) sample += Math.min(1, release / 0.001)
          * Math.exp(-release * 65) * (0.3 * Math.sin(2 * Math.PI * (tone + 85) * release) + 0.2 * noise);
      }
      for (const at of pops) {
        const elapsed = t - at - variant * 0.0015;
        if (elapsed >= 0 && elapsed < 0.015) {
          sample += (paper ? 0.22 : 0.18) * Math.min(1, elapsed / 0.0006)
            * Math.exp(-elapsed * 350) * (noise + Math.sin(2 * Math.PI * 950 * elapsed));
        }
      }
      const fadeOut = Math.min(1, (duration - t) / 0.012);
      samples[i] = sample * fadeOut;
      peak = Math.max(peak, Math.abs(samples[i]));
    }
    if (peak) for (let i = 0; i < samples.length; i++) samples[i] *= 0.92 / peak;
    buffers.set(cacheKey, buffer);
    return buffer;
  }
  async function play(kind) {
    if (!await prepare() || document.visibilityState !== 'visible') return;
    try {
      const source = context.createBufferSource();
      const highpass = context.createBiquadFilter();
      const filter = context.createBiquadFilter();
      const volume = context.createGain();
      source.buffer = bufferFor(kind, Math.floor(Math.random() * 4));
      source.playbackRate.value = 0.97 + Math.random() * 0.06;
      highpass.type = 'highpass';
      highpass.frequency.value = 65;
      filter.type = 'lowpass';
      filter.frequency.value = kind === 'pagina' ? 6800 : 5200;
      filter.Q.value = 0.5;
      volume.gain.value = kind === 'pagina' ? 1.25 : 1.8;
      source.connect(highpass).connect(filter).connect(volume).connect(mix);
      source.onended = () => { source.disconnect(); highpass.disconnect(); filter.disconnect(); volume.disconnect(); };
      source.start();
    } catch { /* La navegación funciona aunque el navegador no reproduzca audio. */ }
  }
  toggle.addEventListener('click', () => {
    enabled = !enabled;
    try { localStorage.setItem(key, enabled ? 'activado' : 'silenciado'); } catch { /* Sin almacenamiento local. */ }
    updateToggle();
    if (enabled) void play('clic');
  });
  // Preparar el audio en el contacto inicial permite usarlo tras tocar o navegar.
  // El sonido se reproduce en click, una sola vez, también con teclado.
  const unlockFromGesture = event => {
    if (!(event.target instanceof Element)) return;
    if (event.type === 'keydown' && !['Enter', ' '].includes(event.key)) return;
    if ('button' in event && event.button !== 0) return;
    const control = event.target.closest('button, a[href], label.abrir-pdf');
    if (control && !control.matches(':disabled, [aria-disabled="true"]')) void prepare();
  };
  if (typeof window.PointerEvent === 'function') document.addEventListener('pointerdown', unlockFromGesture, { capture: true, passive: true });
  else {
    document.addEventListener('touchstart', unlockFromGesture, { capture: true, passive: true });
    document.addEventListener('mousedown', unlockFromGesture, { capture: true, passive: true });
  }
  document.addEventListener('keydown', unlockFromGesture, true);
  // Captura antes de que los botones del lector cambien a deshabilitados.
  document.addEventListener('click', event => {
    if (!(event.target instanceof Element)) return;
    const control = event.target.closest('button, a[href], label.abrir-pdf');
    if (!control || control === toggle || control.matches(':disabled, [aria-disabled="true"]')) return;
    if (control.matches('label') && (event.target.matches('input') || control.control?.disabled)) return;
    if (control.id === 'pagina-anterior' || control.id === 'pagina-siguiente') return;
    void play('clic');
  }, true);
  document.addEventListener('preparar-sonido', () => { void prepare(); });
  document.addEventListener('pasar-hoja', () => { void play('pagina'); });
  window.addEventListener('storage', event => {
    if (event.key === key) { enabled = event.newValue !== 'silenciado'; updateToggle(); }
  });
  updateToggle();
})();
