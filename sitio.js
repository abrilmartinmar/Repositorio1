// Datos compartidos por la portada y la revista.
(() => {
  document.querySelectorAll('[data-correo]').forEach(link => {
    const email = window.portfolio.correo;
    link.textContent = email;
    link.href = `mailto:${email}`;
  });
  document.querySelectorAll('[data-instagram]').forEach(link => {
    const account = window.portfolio.instagram;
    link.textContent = `Instagram · @${account}`;
    link.href = `https://www.instagram.com/${account}/`;
  });
})();
