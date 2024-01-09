function defineMenubarComponent(themeStyles) {
  const menubarTemplate = document.createElement("template");
  menubarTemplate.innerHTML = `
    <style>
        .menubar {
            display: flex; /* Set default display to flex */
            list-style-type: none;
            padding: 0;
            margin: 0;
            background-color: #333;
        }

        .menuitem {
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

        .hamburger {
            display: none;
            cursor: pointer;
            color: white;
            padding: 14px 16px;
            text-align: center;
            background-color: #333;
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

  class Menubar extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.adoptedStyleSheets = [themeStyles];
      this.shadowRoot.appendChild(menubarTemplate.content.cloneNode(true));

      this.hamburger = this.shadowRoot.querySelector(".hamburger");
      this.menubar = this.shadowRoot.querySelector(".menubar");
      this.hamburger.addEventListener("click", () => this.toggleMenu());
    }

    toggleMenu() {
      this.menubar.classList.toggle("open");
    }
  }

  customElements.define("s-menubar", Menubar);
}
