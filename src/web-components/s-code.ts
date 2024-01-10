export function defineSCodeComponent(themeStyles: CSSStyleSheet) {
  const codeTemplate = document.createElement("template");
  codeTemplate.innerHTML = `
      <style>
      :host {
        display: block;
        font-family: 'Courier New', monospace;
      }

      pre {
        margin: 0; /* Reset default margin */
        padding: 1rem;
        color: var(--content-text-color);
        background-color: var(--content-background-color);
        border: 1px solid var(--primary-border-color);
        border-radius: 4px;
        overflow-x: auto;
        white-space: pre-wrap; /* Handle whitespace */
      }

      code {
        display: block; /* Ensure block-level display */
      }
    </style>
    <pre><code><slot></slot></code></pre>
  `;

  class SCode extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      if (!this.shadowRoot) return;
      this.shadowRoot.adoptedStyleSheets = [themeStyles];
      this.shadowRoot.appendChild(codeTemplate.content.cloneNode(true));
    }
  }

  customElements.define("s-code", SCode);
}
