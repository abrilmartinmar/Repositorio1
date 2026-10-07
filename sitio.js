// Datos compartidos por la portada y la revista.
(() => {
  const now = new Date();
  const options = { timeZone: 'Europe/Madrid', year: 'numeric', month: 'long', day: 'numeric' };
  const dateText = new Intl.DateTimeFormat('es-ES', options).format(now);
  const parts = new Intl.DateTimeFormat('es-ES', { ...options, month: '2-digit', day: '2-digit' }).formatToParts(now);
  const part = name => parts.find(item => item.type === name).value;
  document.querySelectorAll('[data-fecha]').forEach(element => {
    element.textContent = dateText;
    element.dateTime = `${part('year')}-${part('month')}-${part('day')}`;
  });
  document.querySelectorAll('[data-correo]').forEach(link => {
    const email = window.portfolio.correo;
    link.textContent = email;
    link.href = `mailto:${email}`;
  });
})();
