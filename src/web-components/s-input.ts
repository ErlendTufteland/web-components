export function defineSInputComponent(themeStyles: CSSStyleSheet) {
  const inputTemplate = document.createElement("template");
  inputTemplate.innerHTML = `
    <style>
      :host {
        display: block;
      }

      input {
        box-sizing: border-box;
        padding: 0.5rem;
        border: 1px solid var(--primary-border-color);
        border-radius: var(--border-radius, 4px);
        font-size: 1rem;
        background-color: var(--content-background-color);
        width: 100%;
      }

      input:focus {
        outline: none;
        border-color: var(--primary-active-color);
        box-shadow: 0 0 0 2px rgba(0, 113, 255, 0.2);
      }
    </style>
    <input type="text" />
  `;

  class SInput extends HTMLElement {
    inputElement: HTMLInputElement | null = null;
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      if (!this.shadowRoot) return;
      this.shadowRoot.adoptedStyleSheets = [themeStyles];
      this.shadowRoot.appendChild(inputTemplate.content.cloneNode(true));

      this.inputElement = this.shadowRoot.querySelector("input");
      this.updateType();
      this.updatePlaceholder();
      this.updateValue();
    }

    static get observedAttributes() {
      return ["type", "placeholder", "value"];
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      if (name === "type") {
        this.updateType();
      } else if (name === "placeholder") {
        this.updatePlaceholder();
      } else if (name === "value") {
        this.updateValue();
      }
    }

    updateType() {
      if (!this.inputElement) return;
      const type = this.getAttribute("type") || "text";
      this.inputElement.type = type;
    }

    updatePlaceholder() {
      if (!this.inputElement) return;
      const placeholder = this.getAttribute("placeholder") || "";
      this.inputElement.placeholder = placeholder;
    }

    updateValue() {
      if (!this.inputElement) return;
      const value = this.getAttribute("value") || "";
      this.inputElement.value = value;
    }
  }

  customElements.define("s-input", SInput);
}
