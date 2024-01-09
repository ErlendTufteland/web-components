function defineCardComponent(themeStyles) {
  const cardTemplate = document.createElement("template");
  cardTemplate.innerHTML = `
     <style>
        .card {
            border: var(--border-width) solid var(--secondary-border-color);
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
        }

        #title {
          color: var(--primary-text-color);
          background-color: var(--secondary-color);
          margin: 0
        }

        #title, #header, #content, #footer {
            padding: var(--spacing);
            border-bottom: var(--border-width) solid var(--secondary-border-color);
        }

        #header, #content, #footer {
            color: var(--text-color);
            background-color: var(--background-color);
        }

    </style>

    <div class="card">
        <h1 id="title"></h1>
        <header id="header"></header>
        <div id="content">
            <slot></slot>
        </div>
        <footer id="footer"></footer>
    </div>
`;

  class Card extends HTMLElement {
    static get observedAttributes() {
      return ["title", "header", "footer"];
    }

    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.adoptedStyleSheets = [themeStyles];
      this.shadowRoot.appendChild(cardTemplate.content.cloneNode(true));
    }

    connectedCallback() {
      this.updateTitle();
      this.updateHeader();
      this.updateFooter();
    }

    attributeChangedCallback(name) {
      if (name === "title") {
        this.updateTitle();
      } else if (name === "header") {
        this.updateHeader();
      } else if (name === "footer") {
        this.updateFooter();
      }
    }

    updateTitle() {
      const title = this.getAttribute("title");
      const titleSlot = this.shadowRoot.querySelector("#title");

      const slotContent = this.querySelector('template[slot="title"]');
      if (slotContent) {
        const content = slotContent.content.cloneNode(true);
        titleSlot.innerHTML = "";
        titleSlot.appendChild(content);
      } else {
        titleSlot.innerHTML = title ? `${title}` : "";
      }
    }

    updateHeader() {
      const header = this.getAttribute("header");
      const headerSlot = this.shadowRoot.querySelector("#header");

      const slotContent = this.querySelector('template[slot="header"]');
      if (slotContent) {
        const content = slotContent.content.cloneNode(true);
        headerSlot.innerHTML = "";
        headerSlot.appendChild(content);
      } else {
        headerSlot.innerHTML = header ? `<header>${header}</header>` : "";
      }
    }

    updateFooter() {
      const footer = this.getAttribute("footer");
      const footerSlot = this.shadowRoot.querySelector("#footer");

      const slotContent = this.querySelector('template[slot="footer"]');
      if (slotContent) {
        const content = slotContent.content.cloneNode(true);
        footerSlot.innerHTML = "";
        footerSlot.appendChild(content);
      } else {
        footerSlot.innerHTML = footer ? `<footer>${footer}</footer>` : "";
      }
    }
  }

  customElements.define("s-card", Card);
}
