import { defineSCardComponent } from "./s-card";
import { defineSMenubarComponent } from "./s-menubar";
import { defineSMenuitemComponent } from "./s-menuitem";
import { defineSButtonComponent } from "./s-button";
import { defineSTabsComponent } from "./s-tabs";
import { defineSTabComponent } from "./s-tab";
import { defineSTableComponent } from "./s-table";

export function defineWebComponents() {
  return fetch("./theme.css")
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
    });
};
