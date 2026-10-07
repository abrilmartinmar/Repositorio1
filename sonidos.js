// Sonidos suaves generados en el navegador; no requieren archivos ni descargas.
(() => {
  const Audio = window.AudioContext || window.webkitAudioContext;
  const toggle = document.querySelector('#sonido-boton');
  if (!Audio || !toggle) return;
  const key = 'mar-abril-sonido';
  let enabled = true;
  try { enabled = localStorage.getItem(key) !== 'silenciado'; } catch { /* Preferencia solo en esta visita. */ }
  let context;
  let output;
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
        context = new Audio();
        output = context.createGain();
        output.connect(context.destination);
      }
      if (context.state === 'suspended') await context.resume();
      return enabled && context.state === 'running';
    } catch { return false; }
  }
  function bufferFor(kind) {
    if (buffers.has(kind)) return buffers.get(kind);
    const paper = kind === 'pagina';
    const duration = paper ? 0.42 : 0.032;
    const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * duration), context.sampleRate);
    const samples = buffer.getChannelData(0);
    for (let i = 0; i < samples.length; i++) {
      const t = i / context.sampleRate;
      const envelope = paper
        ? Math.pow(Math.sin(Math.PI * i / samples.length), 1.2) * (0.65 + 0.25 * Math.sin(t * 95))
        : Math.min(1, t / 0.0008) * Math.exp(-t * 180);
      samples[i] = (Math.random() * 2 - 1) * envelope;
    }
    buffers.set(kind, buffer);
    return buffer;
  }
  async function play(kind) {
    if (!await prepare() || document.visibilityState !== 'visible') return;
    try {
      const source = context.createBufferSource();
      const filter = context.createBiquadFilter();
      const volume = context.createGain();
      source.buffer = bufferFor(kind);
      filter.type = 'bandpass';
      filter.frequency.value = kind === 'pagina' ? 1900 : 1400;
      filter.Q.value = 0.55;
      volume.gain.value = kind === 'pagina' ? 0.32 : 0.6;
      source.connect(filter).connect(volume).connect(output);
      source.onended = () => { source.disconnect(); filter.disconnect(); volume.disconnect(); };
      source.start();
    } catch { /* La navegación funciona aunque el navegador no reproduzca audio. */ }
  }
  toggle.addEventListener('click', () => {
    enabled = !enabled;
    try { localStorage.setItem(key, enabled ? 'activado' : 'silenciado'); } catch { /* Sin almacenamiento local. */ }
    updateToggle();
    if (enabled) void play('clic');
  });
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
