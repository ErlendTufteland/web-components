function defineSButtonComponent(themeStyles: CSSStyleSheet) {
  const buttonTemplate = document.createElement("template");
  buttonTemplate.innerHTML = `
    <style>
      :host {
        display: inline-block;
      }

      .button {
        padding: var(--spacing);
        border: none;
        border-radius: var(--border-radius);
        cursor: pointer;
        transition: background-color 0.3s;
      }

      .button:hover {
        filter: brightness(85%);
      }

      .button.default {
        background-color: var(--primary-color);
        color: var(--primary-text-color);
      }

      .button.primary {
        background-color: var(--primary-color);
        color: var(--primary-text-color);
      }

      .button.secondary {
        background-color: var(--secondary-color);
        color: var(--secondary-text-color);
      }

       .button.success {
        background-color: var(--success-color);
        color: var(--success-text-color);
      }

      .button.warning {
        background-color: var(--warning-color);
        color: var(--warning-text-color);
      }

      .button.danger {
        background-color: var(--error-color);
        color: var(--error-text-color);
      }

    </style>

    <button class="button default">
      <slot></slot>
    </button>
  `;

  class SButton extends HTMLElement {
    button: HTMLButtonElement | null = null;

    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      if (!this.shadowRoot) return;
      this.shadowRoot.adoptedStyleSheets = [themeStyles];
      this.shadowRoot.appendChild(buttonTemplate.content.cloneNode(true));

      this.button = this.shadowRoot.querySelector(".button");
    }

    connectedCallback() {
      this.addEventListener("click", this._onClick);
    }

    disconnectedCallback() {
      this.removeEventListener("click", this._onClick);
    }

    _onClick(event: Event) {
      this.dispatchEvent(
        new CustomEvent("s-button-click", {
          bubbles: true,
          composed: true,
          detail: { originalEvent: event },
        })
      );
    }

    get severity() {
      return this.getAttribute("severity");
    }

    set severity(value) {
      if (!value) return;
      this.setAttribute("severity", value);
    }

    static get observedAttributes() {
      return ["text", "severity"];
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      if (!this.button) return;
      if (name === "text") {
        this.button.textContent = newValue;
      } else if (name === "severity") {
        this.updateButtonSeverity(newValue);
      }
    }

    updateButtonSeverity(severity: string | null) {
      if (!this.button) return;
      this.button.className = "button"; // Reset to default class
      if (severity) {
        this.button.classList.add(severity);
      }
    }
  }

  customElements.define("s-button", SButton);
}
