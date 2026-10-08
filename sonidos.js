// Bienvenida, gotas y papel generados localmente, sin archivos ni descargas.
(() => {
  const Audio = window.AudioContext || window.webkitAudioContext;
  const toggle = document.querySelector('#sonido-boton');
  if (!Audio || !toggle) return;
  const key = 'mar-abril-sonido';
  const welcomeKey = 'mar-abril-bienvenida';
  let enabled = true;
  try { enabled = localStorage.getItem(key) !== 'silenciado'; } catch { /* Preferencia solo en esta visita. */ }
  let welcomed = false;
  let welcoming = false;
  try { welcomed = sessionStorage.getItem(welcomeKey) === 'reproducida'; } catch { /* Una vez durante esta página. */ }
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
    if (kind === 'bienvenida') {
      // Campanas cálidas: una melodía original inspirada en los sonidos de inicio.
      const buffer = context.createBuffer(2, Math.ceil(context.sampleRate * 3.2), context.sampleRate);
      const notes = [[0, 587.33], [0.22, 739.99], [0.48, 880], [0.82, 1318.51]];
      for (let channel = 0; channel < 2; channel++) {
        const samples = buffer.getChannelData(channel);
        for (let i = 0; i < samples.length; i++) {
          const t = i / context.sampleRate;
          let sample = 0;
          for (const [at, frequency] of notes) {
            const age = t - at - channel * 0.006;
            if (age < 0) continue;
            const envelope = (1 - Math.exp(-age * 48)) * Math.exp(-age * 1.85);
            const bell = Math.sin(2 * Math.PI * frequency * age)
              + 0.23 * Math.sin(2 * Math.PI * frequency * 2 * age)
              + 0.08 * Math.sin(2 * Math.PI * frequency * 3 * age);
            sample += 0.25 * envelope * bell;
            const echo = age - 0.18;
            if (echo > 0) sample += 0.035 * (1 - Math.exp(-echo * 35))
              * Math.exp(-echo * 1.7) * Math.sin(2 * Math.PI * frequency * echo);
          }
          samples[i] = sample * Math.min(1, (3.2 - t) / 0.3);
        }
      }
      buffers.set(cacheKey, buffer);
      return buffer;
    }
    const paper = kind === 'pagina';
    const duration = paper ? 0.68 : 0.24;
    const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * duration), context.sampleRate);
    const samples = buffer.getChannelData(0);
    const pops = paper ? [0.08, 0.19, 0.31, 0.39, 0.5, 0.57] : [];
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
        // Descenso de tono resonante: una gota redonda con un pequeño estallido.
        const attack = Math.min(1, t / 0.0015);
        const base = 230 + variant * 12;
        const phase = 2 * Math.PI * (base * t + 670 * (1 - Math.exp(-24 * t)) / 24);
        sample = attack * (0.8 * Math.sin(phase) * Math.exp(-t * 23)
          + 0.12 * Math.sin(phase * 2) * Math.exp(-t * 45)
          + 0.14 * noise * Math.exp(-t * 280));
        const ripple = t - 0.055;
        if (ripple >= 0) sample += 0.16 * Math.min(1, ripple / 0.003)
          * Math.exp(-ripple * 38) * Math.sin(2 * Math.PI * (460 * ripple - 700 * ripple * ripple));
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
    if (!await prepare() || document.visibilityState !== 'visible') return false;
    try {
      const source = context.createBufferSource();
      const highpass = context.createBiquadFilter();
      const filter = context.createBiquadFilter();
      const volume = context.createGain();
      const welcome = kind === 'bienvenida';
      source.buffer = bufferFor(kind, welcome ? 0 : Math.floor(Math.random() * 4));
      source.playbackRate.value = welcome ? 1 : 0.97 + Math.random() * 0.06;
      highpass.type = 'highpass';
      highpass.frequency.value = 65;
      filter.type = 'lowpass';
      filter.frequency.value = kind === 'pagina' || welcome ? 6800 : 5200;
      filter.Q.value = 0.5;
      volume.gain.value = welcome ? 0.85 : kind === 'pagina' ? 1.25 : 1.8;
      source.connect(highpass).connect(filter).connect(volume).connect(mix);
      source.onended = () => { source.disconnect(); highpass.disconnect(); filter.disconnect(); volume.disconnect(); };
      source.start();
      return true;
    } catch { return false; /* La navegación funciona aunque no haya audio. */ }
  }
  async function welcome() {
    if (welcomed || welcoming || !enabled) return;
    welcoming = true;
    try {
      if (await play('bienvenida')) {
        welcomed = true;
        try { sessionStorage.setItem(welcomeKey, 'reproducida'); } catch { /* Sin almacenamiento de sesión. */ }
      }
    } finally { welcoming = false; }
  }
  toggle.addEventListener('click', () => {
    enabled = !enabled;
    try { localStorage.setItem(key, enabled ? 'activado' : 'silenciado'); } catch { /* Sin almacenamiento local. */ }
    updateToggle();
    if (enabled) { void welcome(); void play('clic'); }
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
  // Click se produce después de tocar, sin disparar la melodía al deslizar.
  // Una bienvenida por pestaña evita repetirla al entrar en cada proyecto.
  document.addEventListener('click', event => {
    if (!event.isTrusted || event.button !== 0 || !(event.target instanceof Element)) return;
    if (event.target.closest('#sonido-boton, :disabled, [aria-disabled="true"]')) return;
    void welcome();
  }, true);
  document.addEventListener('keydown', event => {
    if (!event.isTrusted || event.repeat || !['Enter', ' '].includes(event.key)) return;
    if (!(event.target instanceof Element) || event.target.closest('#sonido-boton, input, textarea, select, [contenteditable], :disabled')) return;
    void welcome();
  }, true);
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
