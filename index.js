// Fetch and apply the styles from theme.css
fetch("./theme.css")
  .then((response) => response.text())
  .then((css) => {
    const themeStyles = new CSSStyleSheet();
    themeStyles.replaceSync(css);

    // Define the Card component after the styles are loaded
    defineSCardComponent(themeStyles);
    defineSMenubarComponent(themeStyles);
    defineSMenuitemComponent(themeStyles);
    defineSButtonComponent(themeStyles);
    defineSTabsComponent(themeStyles);
    defineSTabComponent(themeStyles);
  });
