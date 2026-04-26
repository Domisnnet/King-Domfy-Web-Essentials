function loadTemplate(id, url) {
  const el = document.getElementById(id);
  if (!el) return Promise.resolve();
  return fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(`Erro ao carregar ${url}`);
      return res.text();
    })
    .then(html => {
      el.innerHTML = html;
    })
    .catch(err => {
      console.error(err);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  Promise.all([
    loadTemplate('header-placeholder', '/templates/header.html'),
    loadTemplate('footer-placeholder', '/templates/footer.html')
  ]).then(() => {
    document.dispatchEvent(new Event('templatesReady'));
  });
});