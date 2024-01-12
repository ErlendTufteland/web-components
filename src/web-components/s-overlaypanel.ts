export function defineSOverlayPanelComponent(themeStyles: CSSStyleSheet) {
  const dropdownTemplate = document.createElement("template");
  dropdownTemplate.innerHTML = `
    <style>
      :host {
        display: inline-block;
        position: relative;
      }

      .dropdown-button {
        background-color: var(--primary-color);
        color: var(--primary-text-color);
        padding: var(--spacing);
        border: none;
        cursor: pointer;
        border-radius: var(--border-radius);
        font-size: var(--button-font-size, 1rem);
        font-weight: var(--button-font-weight, 700);
        font-family: var(--font-family);
      }

      .dropdown-content {
        display: none;
        position: absolute;
        background-color: var(--content-background-color);
        color: var(--content-text-color);
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
        border-radius: var(--border-radius);
      }

      .show {
        display: block;
      }
    </style>
    <button class="dropdown-button">Overlaypanel</button>
    <div class="dropdown-content">
      <slot></slot>
    </div>
  `;

  class SOverlaypanel extends HTMLElement {
    dropdownContent: HTMLDivElement | null = null;
    dropdownButton: HTMLButtonElement | null = null;

    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      if (!this.shadowRoot) return;
      this.shadowRoot.adoptedStyleSheets = [themeStyles];
      this.shadowRoot.appendChild(dropdownTemplate.content.cloneNode(true));

      this.dropdownContent = this.shadowRoot.querySelector(".dropdown-content");
      this.dropdownButton = this.shadowRoot.querySelector(".dropdown-button");

      if (!this.dropdownButton) return;
      this.dropdownButton.addEventListener("click", () => {
        if (!this.dropdownContent) return;
        this.dropdownContent.classList.toggle("show");
      });
    }

    // Close the dropdown if clicked outside of it
    connectedCallback() {
      window.addEventListener("click", (event) => {
        if (!event.composedPath().includes(this)) {
            if (!this.dropdownContent) return;
          this.dropdownContent.classList.remove("show");
        }
      });
    }
  }

  customElements.define("s-overlaypanel", SOverlaypanel);
}
