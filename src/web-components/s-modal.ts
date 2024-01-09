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
          background-color: #fff;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          max-width: 500px;
          width: 100%;
        }

        .modal-header, .modal-footer {
          padding: 10px 0;
        }

        .modal-body {
          padding: 20px 0;
        }

        .close-button {
          float: right;
          cursor: pointer;
        }
      </style>
      <div class="modal-content">
        <div class="modal-header">
          <slot name="header"></slot>
          <span class="close-button">&times;</span>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;

class SModal extends HTMLElement {
  private _modalVisible: boolean = false;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    if (!this.shadowRoot) return;
    this.shadowRoot.appendChild(modalTemplate.content.cloneNode(true));

    const closeButton = this.shadowRoot
      .querySelector(".close-button");
    if (!closeButton) return;
      closeButton.addEventListener("click", () => this.hide());
  }

  connectedCallback() {
    if (this.hasAttribute("visible")) {
      this._modalVisible = true;
    }
    this._updateRendering();
  }

  static get observedAttributes() {
    return ["visible"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "visible") {
      this._modalVisible = newValue !== null;
      this._updateRendering();
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