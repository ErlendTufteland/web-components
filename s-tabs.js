function defineSTabsComponent(themeStyles) {
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
        background-color: var(--background-color);
        border: none;
        border-bottom: 2px solid transparent;
        border-radius: var(--border-radius) var(--border-radius) 0 0;
        margin-right: var(--spacing);
      }

      .tab-button.active {
        border-bottom-color: var(--primary-color);
      }

      .tab-content {
        display: none;
        padding: var(--spacing);
      }

      .tab-content.active {
        display: block;
      }
    </style>

    <div class="tabs-header"></div>
    <div class="tabs-content"></div>
  `;

  class STabs extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.adoptedStyleSheets = [themeStyles];
      this.shadowRoot.appendChild(tabsTemplate.content.cloneNode(true));

      this.tabsHeader = this.shadowRoot.querySelector(".tabs-header");
      this.tabsContent = this.shadowRoot.querySelector(".tabs-content");
    }

    connectedCallback() {
      this.renderTabs();
    }

    renderTabs() {
      this.tabsHeader.innerHTML = "";
      this.tabsContent.innerHTML = "";

      Array.from(this.children).forEach((tab, index) => {
        if (tab.tagName.toLowerCase() === "s-tab") {
          // Create tab button
          const button = document.createElement("button");
          button.classList.add("tab-button");
          button.textContent = tab.title;
          button.addEventListener("click", () => this.selectTab(index));
          this.tabsHeader.appendChild(button);

          // Create tab content
          const content = document.createElement("div");
          content.classList.add("tab-content");
          while (tab.firstChild) {
            content.appendChild(tab.firstChild); // Move the content
          }
          this.tabsContent.appendChild(content);
        }
      });

      this.selectTab(0);
    }

    selectTab(index) {
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
