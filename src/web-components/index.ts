document.addEventListener("DOMContentLoaded", () => {
  fetch("./theme.css")
    .then((response) => response.text())
    .then((css) => {
      const themeStyles = new CSSStyleSheet();
      themeStyles.replaceSync(css);

      defineSCardComponent(themeStyles);
      defineSMenubarComponent(themeStyles);
      defineSMenuitemComponent(themeStyles);
      defineSButtonComponent(themeStyles);
      defineSTabsComponent(themeStyles);
      defineSTabComponent(themeStyles);
    });
});
