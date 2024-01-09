export function defineSTabsComponent(themeStyles: CSSStyleSheet) {
  const tabsTemplate = document.createElement("template");
  tabsTemplate.innerHTML = `
    <style>
      :host {
        display: block;
      }

      .tabs-header {
        display: flex;
      }

      .tab-button {
        cursor: pointer;
        padding: var(--spacing);
        background-color: var(--secondary-color);
        color: var(--secondary-text-color);
        border: none;
        border-bottom: 4px solid transparent;
        border-radius: var(--border-radius) var(--border-radius) 0 0;
        margin-right: .25rem;
      }

      .tab-button.active {
        border-bottom-color: var(--secondary-active-color);
      }

      .tab-content {
        display: none;
        padding: var(--spacing);
        background-color: var(--content-background-color);
        color: var(--content-text-color);
        border: var(--border-width) solid var(--secondary-border-color);
        border-radius: 0 var(--border-radius) var(--border-radius) var(--border-radius);
      }

      .tab-content.active {
        display: block;
      }
    </style>

    <div class="tabs-header"></div>
    <div class="tabs-content"></div>
  `;

  class STabs extends HTMLElement {
    tabsHeader: HTMLElement | null = null;
    tabsContent: HTMLElement | null = null;

    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      if (!this.shadowRoot) return;
      this.shadowRoot.adoptedStyleSheets = [themeStyles];
      this.shadowRoot.appendChild(tabsTemplate.content.cloneNode(true));

      this.tabsHeader = this.shadowRoot.querySelector(".tabs-header");
      this.tabsContent = this.shadowRoot.querySelector(".tabs-content");
    }

    connectedCallback() {
      this.renderTabs();
    }

    renderTabs() {
      if (!this.tabsHeader || !this.tabsContent) return;
      this.tabsHeader.innerHTML = "";
      this.tabsContent.innerHTML = "";

      Array.from(this.children).forEach((tab, index) => {
        if (tab.tagName.toLowerCase() === "s-tab") {
          // Create tab button
          const tabElement = tab as HTMLElement;
          const button = document.createElement("button");
          button.classList.add("tab-button");
          button.textContent = tabElement.title;
          button.addEventListener("click", () => this.selectTab(index));
          if (!this.tabsHeader) return;
          this.tabsHeader.appendChild(button);

          // Create tab content
          const content = document.createElement("div");
          content.classList.add("tab-content");
          while (tab.firstChild) {
            content.appendChild(tab.firstChild); // Move the content
          }
          if (!this.tabsContent) return;
          this.tabsContent.appendChild(content);
        }
      });

      this.selectTab(0);
    }

    selectTab(index: number) {
      if (!this.tabsHeader || !this.tabsContent) return;
      const buttons = this.tabsHeader.querySelectorAll(".tab-button");
      const contents = this.tabsContent.querySelectorAll(".tab-content");

      buttons.forEach((button, i) => {
        button.classList.toggle("active", i === index);
      });

      contents.forEach((content, i) => {
        content.classList.toggle("active", i === index);
      });
    }
  }

  customElements.define("s-tabs", STabs);
}
