export function defineSModalComponent(themeStyles: CSSStyleSheet) {
  const modalTemplate = document.createElement("template");
  modalTemplate.innerHTML = `
      <style>
        :host {
          display: block;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: none;
          justify-content: center;
          align-items: center;
        }
        
        .modal-content {
          background-color: var(--background-color);
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow);
          max-width: 500px;
          width: 100%;
          color: var(--text-color);
        }

        #modal-header {
            display:flex;
            justify-content: space-between;
          border-top-left-radius: var(--border-radius);
          border-top-right-radius: var(--border-radius);
          background-color: var(--secondary-color);
          color: var(--secondary-text-color);
        }

        #modal-header, #modal-body, #modal-footer {   
            padding: var(--spacing);
            border-bottom: var(--border-width) solid var(--secondary-border-color);
        }

        #modal-title {
          margin: 0;
        }

        .close-button {
          float: right;
          cursor: pointer;
          align-self: center;
          font-size: 1.5rem;
        }
      </style>
         <div class="modal-content">
            <header id="modal-header">
                <h3 id="modal-title"></h3>
                <span class="close-button">&times;</span>
            </header>
            <div id="modal-body">
                <slot></slot>
            </div>
            <footer id="modal-footer"></footer>
        </div>
    `;

  class SModal extends HTMLElement {
    static get observedAttributes() {
      return ["visible", "title", "footer"];
    }

    private _modalVisible: boolean = false;

    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      if (!this.shadowRoot) return;
      this.shadowRoot.adoptedStyleSheets = [themeStyles];
      this.shadowRoot.appendChild(modalTemplate.content.cloneNode(true));

      const closeButton = this.shadowRoot.querySelector(".close-button");
      if (!closeButton) return;
      closeButton.addEventListener("click", () => this.hide());
    }

    connectedCallback() {
      if (this.hasAttribute("visible")) {
        this._modalVisible = true;
      }
      this._updateRendering();

      this.updateTitle();
      this.updateFooter();
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      if (name === "visible") {
        this._modalVisible = newValue !== null;
        this._updateRendering();
      } else if (name === "title") {
        this.updateTitle();
      } else if (name === "footer") {
        this.updateFooter();
      }
    }

    updateTitle() {
      if (!this.shadowRoot) return;
      const title = this.getAttribute("title");
      const titleSlot = this.shadowRoot.querySelector(
        "#modal-title"
      ) as HTMLElement;
      if (!titleSlot) return;

      const slotContent = this.querySelector('template[slot="title"]');
      if (slotContent) {
        const content = (slotContent as HTMLTemplateElement).content.cloneNode(
          true
        );
        titleSlot.innerHTML = "";
        titleSlot.appendChild(content);
        titleSlot.style.display = "block";
      } else {
        titleSlot.innerHTML = title ? `${title}` : "";
        titleSlot.style.display = title ? "block" : "none";
      }
    }

    updateFooter() {
      if (!this.shadowRoot) return;
      const footer = this.getAttribute("footer");
      const footerSlot = this.shadowRoot.querySelector(
        "#modal-footer"
      ) as HTMLElement;

      const slotContent = this.querySelector('template[slot="footer"]');
      if (slotContent) {
        const content = (slotContent as HTMLTemplateElement).content.cloneNode(
          true
        );
        footerSlot.innerHTML = "";
        footerSlot.appendChild(content);
        footerSlot.style.display = "block";
      } else {
        footerSlot.innerHTML = footer ? `<footer>${footer}</footer>` : "";
        footerSlot.style.display = footer ? "block" : "none";
      }
    }

    show() {
      this._modalVisible = true;
      this._updateRendering();
      this.setAttribute("visible", "");
    }

    hide() {
      this._modalVisible = false;
      this._updateRendering();
      this.removeAttribute("visible");
    }

    private _updateRendering() {
      if (this.shadowRoot) {
        this.style.display = this._modalVisible ? "flex" : "none";
      }
    }
  }

  customElements.define("s-modal", SModal);
}
