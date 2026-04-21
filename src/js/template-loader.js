document.addEventListener('DOMContentLoaded', function() {
  const loadTemplate = (id, url) => {
    return fetch(url)
      .then(response => response.ok ? response.text() : Promise.reject(`Erro ao carregar ${url}: ${response.statusText}`))
      .then(data => {
        const element = document.getElementById(id);
        if (element) element.innerHTML = data;
        else console.error(`Elemento com id '${id}' não encontrado.`);
      });
  };

  const base = document.body.dataset.base || '';
  const headerPromise = loadTemplate('header-placeholder', `${base}templates/header.html`);
  const footerPromise = loadTemplate('footer-placeholder', `${base}templates/footer.html`);

  Promise.all([headerPromise, footerPromise])
    .then(() => {
      setTimeout(() => {
        const event = new CustomEvent('templatesReady');
        document.dispatchEvent(event);
      }, 0);
    })
    .catch(error => console.error('Erro ao carregar templates:', error));
});