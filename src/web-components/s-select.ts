export function defineSSelectComponent(themeStyles: CSSStyleSheet) {
  const selectTemplate = document.createElement("template");
  selectTemplate.innerHTML = `
    <style>
      .custom-select {
        position: relative;
        font-family: Arial;
      }

      .custom-select select {
        display: none;
      }

      .select-selected {
        background-color: DodgerBlue;
        color: white;
        padding: 8px 16px;
        border: 1px solid transparent;
        border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
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
        color: white;
        padding: 8px 16px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        cursor: pointer;
        user-select: none;
      }

      .select-items {
        position: absolute;
        background-color: DodgerBlue;
        top: 100%;
        left: 0;
        right: 0;
        z-index: 99;
      }

      .select-hide {
        display: none;
      }

      .select-items div:hover, .same-as-selected {
        background-color: rgba(0, 0, 0, 0.1);
      }
    </style>
    <div class="custom-select" style="width:200px;">
      <select>
        <slot></slot>
      </select>
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
      const selectElement = this.shadowRoot.querySelector("select");
      if (!selectElement) return;
      const selectedDiv = document.createElement("div");
      selectedDiv.setAttribute("class", "select-selected");
      selectedDiv.innerHTML =
        selectElement.options[selectElement.selectedIndex].innerHTML;
      this.shadowRoot.appendChild(selectedDiv);

      const optionsContainer = document.createElement("div");
      optionsContainer.setAttribute("class", "select-items select-hide");

      for (let i = 1; i < selectElement.length; i++) {
        const optionDiv = document.createElement("div");
        optionDiv.innerHTML = selectElement.options[i].innerHTML;
        optionDiv.addEventListener("click", (e: Event) => {
          const target = e.target as HTMLDivElement;
          selectedDiv.innerHTML = target.innerHTML;
          selectElement.selectedIndex = i;
          this.closeAllSelect();
        });
        optionsContainer.appendChild(optionDiv);
      }

      this.shadowRoot.appendChild(optionsContainer);

      selectedDiv.addEventListener("click", (e) => {
        e.stopPropagation();
        this.closeAllSelect(selectedDiv);
        optionsContainer.classList.toggle("select-hide");
        selectedDiv.classList.toggle("select-arrow-active");
      });
    }

    closeAllSelect(exceptThisOne: HTMLDivElement | null = null) {
      if (!this.shadowRoot) return;
      const allSelectItems = this.shadowRoot.querySelectorAll(".select-items");
      const allSelected = this.shadowRoot.querySelectorAll(".select-selected");
      allSelectItems.forEach((item) => {
        if (item !== exceptThisOne) {
          item.classList.add("select-hide");
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