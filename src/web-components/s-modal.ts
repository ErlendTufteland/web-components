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
        justify-content: center;
        align-items: center;
        display: none;
      }
      
      dialog.modal-content {
        background-color: var(--content-background-color);
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        max-width: 500px;
        width: 100%;
        color: var(--content-text-color);
        padding: 0;
        border: var(--border-width) solid var(--secondary-border-color);
      }

      #modal-header {
        display:flex;
        justify-content: space-between;
        border-top-left-radius: var(--border-radius);
        border-top-right-radius: var(--border-radius);
        background-color: var(--secondary-color);
        color: var(--secondary-text-color);
        padding: var(--spacing);
        border-bottom: var(--border-width) solid var(--secondary-border-color);
      }

      #modal-title {
        margin: 0;
      }

      .close-button {
        cursor: pointer;
        align-self: center;
        font-size: 1.5rem;
      }

      #modal-body, #modal-footer {   
        padding: var(--spacing);
        border-bottom: var(--border-width) solid var(--secondary-border-color);
      }
    </style>
    <dialog class="modal-content">
      <header id="modal-header">
        <h3 id="modal-title"></h3>
        <span class="close-button">&times;</span>
      </header>
      <div id="modal-body">
        <slot></slot>
      </div>
      <footer id="modal-footer"></footer>
    </dialog>
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
    }

    connectedCallback() {
      if (this.hasAttribute("visible")) {
        this._modalVisible = true;
      }
      this._updateRendering();
      this.updateContent("#modal-title", 'template[slot="title"]', "title");
      this.updateContent("#modal-footer", 'template[slot="footer"]', "footer");

      if (!this.shadowRoot) return;
      const closeButton = this.shadowRoot.querySelector(".close-button");
      if (!closeButton) return;
      closeButton.addEventListener("click", () => this.hide());
    }

    updateContent(
      contentSelector: string,
      slotSelector: string,
      attributeName: string
    ) {
      if (!this.shadowRoot) return;
      const contentEl = this.shadowRoot.querySelector(contentSelector);
      if (!contentEl) return;
      const slotContent = this.querySelector(slotSelector);

      if (contentEl) {
        contentEl.innerHTML = "";
        if (slotContent) {
          const templateContent = slotContent as HTMLTemplateElement;
          contentEl.appendChild(templateContent.content.cloneNode(true));
        } else {
          const attributeContent = this.getAttribute(attributeName);
          contentEl.textContent = attributeContent ?? "";
        }

        (contentEl as HTMLElement).style.display =
          slotContent || this.hasAttribute(attributeName) ? "block" : "none";
      }
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      if (name === "visible") {
        this._modalVisible = newValue !== null;
        this._updateRendering();
      } else if (name === "title") {
        this.updateContent("#modal-title", 'template[slot="title"]', "title");
      } else if (name === "footer") {
        this.updateContent(
          "#modal-footer",
          'template[slot="footer"]',
          "footer"
        );
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
      const dialog = this.shadowRoot.querySelector("dialog");
      if (!dialog) return;
      if (this._modalVisible) {
        dialog.showModal();
      } else {
        dialog.close();
      }
      this.style.display = this._modalVisible ? "flex" : "none";
    }
  }
}

  customElements.define("s-modal", SModal);
}
