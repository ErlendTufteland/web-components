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

      this.updateContent("#modal-title", 'template[slot="title"]', "title");
      this.updateContent("#modal-footer", 'template[slot="footer"]', "footer");
    }

    updateContent(contentSelector: string, slotSelector: string, attributeName: string) {
      if (!this.shadowRoot) return;
      const slotContent = this.querySelector(slotSelector);
      const contentEl = this.shadowRoot.querySelector(contentSelector) as HTMLElement;
    
      if (slotContent) {
        contentEl.innerHTML = "";
        contentEl.appendChild((slotContent as HTMLTemplateElement)?.content.cloneNode(true));
      } else {
        const attributeContent = this.getAttribute(attributeName);
        (contentEl as HTMLElement).textContent = attributeContent ?? "";
      }

      contentEl.style.display =
        slotContent || this.hasAttribute(attributeName) ? "block" : "none";
    }


    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      if (name === "visible") {
        this._modalVisible = newValue !== null;
        this._updateRendering();
      } else if (name === "title") {
        this.updateTextContent("#modal-title", "title");
      } else if (name === "footer") {
        this.updateTextContent("#modal-footer", "footer");
      }
    }

    updateTextContent(selector: string, attributeName: string) {
      if (!this.shadowRoot) return;
      const element = this.shadowRoot.querySelector(selector) as HTMLElement;
      if (element) {
        const content = this.getAttribute(attributeName);
        element.textContent = content ?? "";
        element.style.display = content ? "block" : "none";
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
