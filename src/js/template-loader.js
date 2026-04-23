document.addEventListener('DOMContentLoaded', function() {
  const loadTemplate = (id, url) => {
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro HTTP ${response.status} ao carregar ${url}`);
        }
        return response.text();
      })
      .then(data => {
        const element = document.getElementById(id);
        if (element) {
          element.innerHTML = data;
        }
      });
  };

  const headerPromise = loadTemplate('header-placeholder', '/templates/header.html');
  const footerPromise = loadTemplate('footer-placeholder', '/templates/footer.html');

  Promise.all([headerPromise, footerPromise])
    .then(() => {
      const event = new CustomEvent('templatesReady');
      document.dispatchEvent(event);
    })
    .catch(error => console.error('Falha catastrófica ao carregar templates:', error));
});