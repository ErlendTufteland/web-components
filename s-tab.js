function defineSTabComponent(themeStyles) {
  class STab extends HTMLElement {
    constructor() {
      super();
    }

    get title() {
      return this.getAttribute("title");
    }
  }

  customElements.define("s-tab", STab);
}
