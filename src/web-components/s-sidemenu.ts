export function defineSSideMenuComponent(themeStyles: CSSStyleSheet) {
  const sideMenuTemplate = document.createElement("template");
  sideMenuTemplate.innerHTML = `
    <style>
      :host {
        display: block;
        width: 0; /* Initially hidden */
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        background-color: var(--primary-color);
        color: var(--primary-text-color);
        border-right: 1px solid var(--primary-border-color);
        
        transition: width 0.3s; /* Smooth transition for width */
        z-index: 1000; /* Ensure it's above other content */
            font-family: var(--font-family);
      }

      .s-sidemenu {
        width:100%;
        overflow: hidden; /* Disable horizontal scroll */
      }

      .toggle-button {
        position: absolute;
        top: 10px;
        left: 100%; /* Position right outside the menu */
        background-color: var(--primary-color);
        padding: var(--spacing);
        border: none;
        cursor: pointer;
        padding: 10px;
        border-radius: 0 5px 5px 0; /* Rounded corners on the right side */
        font-size: var(--button-font-size, 1rem);
        font-weight: var(--button-font-weight, 700);
      }

      .toggle-button:hover {
        background-color: var(--primary-hover-color);
      }

      .icon {
        color: var(--primary-text-color);
      }
      
    </style>
    <button class="toggle-button">
      <span class="icon">☰</span> <!-- Replace with your icon -->
    </button>
    <div class="s-sidemenu">
        <slot></slot> <!-- Slot for menu items -->
    </div>
  `;

  class SSideMenu extends HTMLElement {
    toggleButton: HTMLButtonElement | null = null;
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      if (!this.shadowRoot) return;
      this.shadowRoot.adoptedStyleSheets = [themeStyles];
      this.shadowRoot.appendChild(sideMenuTemplate.content.cloneNode(true));

      this.toggleButton = this.shadowRoot.querySelector(".toggle-button");
      if (!this.toggleButton) return;
      this.toggleButton.addEventListener("click", () => this.toggleMenu());
    }

    toggleMenu() {
      const currentWidth = this.style.width;
      this.style.width = currentWidth === "250px" ? "0" : "250px"; // Adjust width as needed
    }
  }

  customElements.define("s-sidemenu", SSideMenu);
}
