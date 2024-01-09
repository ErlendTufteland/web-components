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
      defineSTableComponent(themeStyles);

      // Set data to s-table
      const tableElement = document.querySelector("s-table");
      if (tableElement) {
        const tableData = {
          headers: ["Name", "Age", "City"],
          rows: [
            ["Alice", 30, "New York"],
            ["Bob", 25, "San Francisco"],
            ["Charlie", 35, "London"],
          ],
        };
        tableElement.data = tableData;
      }
    });
});
