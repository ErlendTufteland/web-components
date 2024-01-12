export function defineSMenuitemComponent(themeStyles: CSSStyleSheet) {
  const menuItemTemplate = document.createElement("template");
  menuItemTemplate.innerHTML = `
    <style>
        .menuitem {
            display: block;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
            cursor: pointer;
            background-color: var(--primary-color);
            color: var(--primary-text-color);
            font-size: var(--button-font-size, 1rem);
            font-weight: var(--button-font-weight, 700);
            font-family: var(--font-family);
        }

        .menuitem:hover {
            background-color: var(--primary-hover-color);
            color: var(--primary-text-color);
        }
    </style>
    <li class="menuitem">
        <slot></slot>
    </li>
`;

  class SMenuItem extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      if (!this.shadowRoot) return;
      this.shadowRoot.adoptedStyleSheets = [themeStyles];
      this.shadowRoot.appendChild(menuItemTemplate.content.cloneNode(true));
    }
  }

  customElements.define("s-menuitem", SMenuItem);
}
