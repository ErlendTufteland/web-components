"use strict";
function defineSTabComponent(themeStyles) {
    class STab extends HTMLElement {
        constructor() {
            super();
        }
        get title() {
            var _a;
            return (_a = this.getAttribute("title")) !== null && _a !== void 0 ? _a : "";
        }
    }
    customElements.define("s-tab", STab);
}
