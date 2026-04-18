document.addEventListener("DOMContentLoaded", function () {
  const base = document.body.dataset.base || "./";
  function loadTemplate(targetId, templatePath) {
    fetch(base + templatePath)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro ao carregar ${templatePath}`);
        }
        return response.text();
      })
      .then(html => {
        html = html.replace(/{{BASE}}/g, base);
        document.getElementById(targetId).innerHTML = html;
      })
      .catch(error => {
        console.error(error);
      });
  }
  loadTemplate("header-placeholder", "src/templates/header.html");
  loadTemplate("footer-placeholder", "src/templates/footer.html");
});