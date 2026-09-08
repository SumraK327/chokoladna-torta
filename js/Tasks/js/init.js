const loadIncludes = async () => {
  const headerElement = document.getElementById("header");
  const footerElement = document.getElementById("footer");

  if (headerElement) {
    const headerResponse = await fetch("./header.html");
    const headerHtml = await headerResponse.text();
    headerElement.innerHTML = headerHtml;
  }

  if (footerElement) {
    const footerResponse = await fetch("./footer.html");
    const footerHtml = await footerResponse.text();
    footerElement.innerHTML = footerHtml;
  }

  await import("./index.js");
};

loadIncludes();
