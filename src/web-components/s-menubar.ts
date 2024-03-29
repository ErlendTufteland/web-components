export function defineSMenubarComponent(themeStyles: CSSStyleSheet) {
  const menubarTemplate = document.createElement("template");
  menubarTemplate.innerHTML = `
    <style>
        .menubar {
            display: flex;
            list-style-type: none;
            padding: 0;
            margin: 0;
            background-color: var(--primary-color);
            border: var(--border-width) solid var(--primary-border-color);
            border-radius: var(--border-radius);
        }


        .hamburger {
            display: none;
            cursor: pointer;
            color: var(--primary-text-color);
            text-align: center;
            background-color: var(--primary-color);
            border: var(--border-width) solid var(--primary-border-color);
            border-radius: var(--border-radius);
            font-size: var(--button-font-size, 1rem);
            padding: var(--spacing);
            font-family: var(--font-family);
            font-weight: var(--button-font-weight, 700);
        }

        @media screen and (max-width: 600px) {
            .menubar {
                display: none;
                flex-direction: column;
            }

            .hamburger {
                display: block;
            }

            .menubar.open {
                display: flex;
            }
        }
    </style>
    <div class="hamburger">☰</div>
    <ul class="menubar">
        <slot></slot>
    </ul>
`;

  class SMenubar extends HTMLElement {
    hamburger: HTMLElement | null = null;
    menubar: HTMLElement | null = null;

    constructor() {
      super();
      this.attachShadow({ mode: "open" });

      if (!this.shadowRoot) return;
      this.shadowRoot.adoptedStyleSheets = [themeStyles];
      this.shadowRoot.appendChild(menubarTemplate.content.cloneNode(true));

      this.hamburger = this.shadowRoot.querySelector(".hamburger");
      this.menubar = this.shadowRoot.querySelector(".menubar");

      if (!this.hamburger) return;
      this.hamburger.addEventListener("click", () => this.toggleMenu());
    }

    toggleMenu() {
      if (!this.menubar) return;
      this.menubar.classList.toggle("open");
    }
  }

  customElements.define("s-menubar", SMenubar);
}
