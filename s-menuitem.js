function defineMenuitemComponent(themeStyles) {
  const menuItemTemplate = document.createElement("template");
  menuItemTemplate.innerHTML = `
    <style>
        .menuitem {
            display: block;
            color: white;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
            cursor: pointer;
        }

        .menuitem:hover {
            background-color: #ddd;
            color: black;
        }
    </style>
    <li class="menuitem">
        <slot></slot>
    </li>
`;

  class MenuItem extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.adoptedStyleSheets = [themeStyles];
      this.shadowRoot.appendChild(menuItemTemplate.content.cloneNode(true));
    }
  }

  customElements.define("s-menuitem", MenuItem);
}
