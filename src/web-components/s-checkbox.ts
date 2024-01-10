export function defineSCheckboxComponent(themeStyles: CSSStyleSheet) {
  const checkboxTemplate = document.createElement("template");
  checkboxTemplate.innerHTML = `
    <style>
      :host {
        display: inline-block;
        font-family: sans-serif;
      }

      .checkbox-container {
        display: flex;
        align-items: center;
      }

      .checkbox-label {
        margin-left: 0.5rem;
      }

      /* Customize the native checkbox */
      .checkbox-input {
        accent-color: var(--primary-color, blue);
      }
    </style>
    <label class="checkbox-container">
      <input type="checkbox" class="checkbox-input">
      <span class="checkbox-label"><slot></slot></span>
    </label>
  `;

  class SCheckbox extends HTMLElement {
    checkboxInput: HTMLInputElement | null = null;
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      if (!this.shadowRoot) return;
      this.shadowRoot.adoptedStyleSheets = [themeStyles];
      this.shadowRoot.appendChild(checkboxTemplate.content.cloneNode(true));

      this.checkboxInput = this.shadowRoot.querySelector(".checkbox-input");
      if (!this.checkboxInput) return;
      this.checkboxInput.addEventListener(
        "change",
        this.handleChange.bind(this)
      );
    }

    handleChange(event: Event) {
        const target = event.target as HTMLInputElement;
        this.dispatchEvent(
            new CustomEvent("change", { detail: target.checked })
        );
    }

    get checked() {
        return this.hasAttribute("checked");
    }

    set checked(val) {
        const isChecked = Boolean(val);
        if (isChecked) {
            this.setAttribute("checked", "");
            if (this.checkboxInput) {
                this.checkboxInput.checked = true;
            }
        } else {
            this.removeAttribute("checked");
            if (this.checkboxInput) {
                this.checkboxInput.checked = false;
            }
        }
    }

    static get observedAttributes() {
            return ["checked"];
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (name === "checked" && this.checkboxInput) {
            this.checkboxInput.checked = this.hasAttribute("checked");
        }
    }
  }

  customElements.define("s-checkbox", SCheckbox);
}
