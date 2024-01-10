import { defineSCardComponent } from "./s-card";
import { defineSMenubarComponent } from "./s-menubar";
import { defineSMenuitemComponent } from "./s-menuitem";
import { defineSButtonComponent } from "./s-button";
import { defineSTabsComponent } from "./s-tabs";
import { defineSTabComponent } from "./s-tab";
import { defineSTableComponent } from "./s-table";
import { defineSModalComponent } from "./s-modal";
import { defineSInputComponent } from "./s-input";
import { defineSMessagesComponent } from "./s-messages";
import { defineSCheckboxComponent } from "./s-checkbox";
import { defineSCodeComponent } from "./s-code";
import { defineSSideMenuComponent } from "./s-sidemenu";
import { defineSOverlayPanelComponent } from "./s-overlaypanel";
import { defineSSelectComponent } from "./s-select";

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
      defineSModalComponent(themeStyles);
      defineSInputComponent(themeStyles);
      defineSMessagesComponent(themeStyles);
      defineSCheckboxComponent(themeStyles);
      defineSCodeComponent(themeStyles);
      defineSSideMenuComponent(themeStyles);
      defineSOverlayPanelComponent(themeStyles);
      defineSSelectComponent(themeStyles);
    });
};
