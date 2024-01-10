export function defineSSelectComponent(themeStyles: CSSStyleSheet) {
  const selectTemplate = document.createElement("template");
  selectTemplate.innerHTML = `
    <style>
      .custom-select {
        position: relative;
        width: 200px;
      }

      .select-selected {
        background-color: var(--primary-color);
        border-radius: var(--border-radius);
        color: white;
        padding: 8px 16px;
        border: 1px solid transparent;
        cursor: pointer;
        user-select: none;
      }

      .select-selected:after {
        position: absolute;
        content: "";
        top: 14px;
        right: 10px;
        width: 0;
        height: 0;
        border: 6px solid transparent;
        border-color: #fff transparent transparent transparent;
      }

      .select-selected.select-arrow-active:after {
        border-color: transparent transparent #fff transparent;
        top: 7px;
      }

      .select-items div, .select-selected {
        padding: 8px 16px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        cursor: pointer;
        user-select: none;
      }

      .select-items {
        position: absolute;
        background-color: var(--content-background-color);
        color: var(--content-text-color);
        top: 100%;
        left: 0;
        right: 0;
        z-index: 99;
      }

      .select-items div:hover, .same-as-selected {
        background-color: var(--content-hover-background-color);
      }

      .select-hide {
        display: none;
      }
    </style>
    <div class="custom-select">
      <div class="select-selected"></div>
      <div class="select-items select-hide"></div>
    </div>
  `;

  class SSelect extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      if (!this.shadowRoot) return;
      this.shadowRoot.adoptedStyleSheets = [themeStyles];
      this.shadowRoot.appendChild(selectTemplate.content.cloneNode(true));

      this.initCustomSelect();
    }

    initCustomSelect() {
      if (!this.shadowRoot) return;
      const options = this.getOptions();
      const selectedDiv = this.shadowRoot.querySelector(".select-selected");
      if (!selectedDiv) return;
      const optionsContainer = this.shadowRoot.querySelector(".select-items");
      if (!optionsContainer) return;

      // Set the first option as selected
      selectedDiv.innerHTML = options[0];

      options.forEach((option, index) => {
        const optionDiv = document.createElement("div");
        optionDiv.innerHTML = option;
        optionDiv.addEventListener("click", () => {
          selectedDiv.innerHTML = option;
          this.closeAllSelect();
        });
        optionsContainer.appendChild(optionDiv);
      });

      selectedDiv.addEventListener("click", (e) => {
        e.stopPropagation();
        this.closeAllSelect(selectedDiv);
        // optionsContainer.classList.toggle("select-hide");
        selectedDiv.classList.toggle("select-arrow-active");
      });
    }

    getOptions(): string[] {
      const options: string[] = [];
      // Assuming that options are passed as direct children of <s-select>
      Array.from(this.children).forEach((child) => {
        if (child.tagName === "OPTION") {
          options.push(child.innerHTML);
        }
      });
      return options;
    }

    closeAllSelect(exceptThisOne: null | Element = null) {
      if (!this.shadowRoot) return;
      const allSelectItems = this.shadowRoot.querySelectorAll(".select-items");
      const allSelected = this.shadowRoot.querySelectorAll(".select-selected");
      allSelectItems.forEach((item) => {
        if (item !== exceptThisOne) {
          item.classList.toggle("select-hide");
        }
      });
      allSelected.forEach((item) => {
        if (item !== exceptThisOne) {
          item.classList.remove("select-arrow-active");
        }
      });
    }
  }

  customElements.define("s-select", SSelect);
}
