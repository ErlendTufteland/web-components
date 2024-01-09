function defineSCardComponent(themeStyles) {
  const cardTemplate = document.createElement("template");
  cardTemplate.innerHTML = `
     <style>
        #card {
            border: var(--border-width) solid var(--secondary-border-color);
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
            margin-bottom: var(--spacing);
        }

        #title {
          color: var(--primary-text-color);
          background-color: var(--secondary-color);
          margin: 0
        }

        #title, #header, #body, #footer {
            padding: var(--spacing);
            border-bottom: var(--border-width) solid var(--secondary-border-color);
        }

        #title, #header, #footer {
            display: none;
        }

        #header, #body, #footer {
            color: var(--text-color);
            background-color: var(--background-color);
        }

    </style>

    <div id="card">
        <h3 id="title"></h3>
        <header id="header"></header>
        <div id="body">
            <slot></slot>
        </div>
        <footer id="footer"></footer>
    </div>
`;

  class SCard extends HTMLElement {
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
        titleSlot.style.display = "block";
      } else {
        titleSlot.innerHTML = title ? `${title}` : "";
        titleSlot.style.display = title ? "block" : "none";
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
        headerSlot.style.display = "block";
      } else {
        headerSlot.innerHTML = header ? `<header>${header}</header>` : "";
        headerSlot.style.display = header ? "block" : "none";
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
        footerSlot.style.display = "block";
      } else {
        footerSlot.innerHTML = footer ? `<footer>${footer}</footer>` : "";
        footerSlot.style.display = footer ? "block" : "none";
      }
    }
  }

  customElements.define("s-card", SCard);
}
