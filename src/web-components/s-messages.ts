export interface SMessagesElement extends HTMLElement {
  showMessage(message: string, type: string, duration?: number): void;
}

export function defineSMessagesComponent(themeStyles: CSSStyleSheet) {
  const messagesTemplate = document.createElement("template");
  messagesTemplate.innerHTML = `
    <style>
      :host {
        position: fixed;
        top: 10px;
        right: 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        z-index: 1000;
      }

      .message {
        margin-bottom: 10px;
        padding: 10px;
        border-radius: 4px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        color: white;
        animation: fadein 0.5s, fadeout 0.5s 4.5s;
      }

      .success { background-color: var(--success-color); }
      .error { background-color: var(--error-color); }
      .warning { background-color: var(--warning-color); }

      @keyframes fadein {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes fadeout {
        from { opacity: 1; }
        to { opacity: 0; }
      }
    </style>
    <slot></slot>
  `;

  class SMessages extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      if (!this.shadowRoot) return;
      this.shadowRoot.adoptedStyleSheets = [themeStyles];
      this.shadowRoot.appendChild(messagesTemplate.content.cloneNode(true));
    }

    showMessage(message: string, type = "success", duration = 5000) {
      if (!this.shadowRoot) return;
      const messageEl = document.createElement("div");
      messageEl.className = `message ${type}`;
      messageEl.textContent = message;

      this.shadowRoot.appendChild(messageEl);

      setTimeout(() => {
        if (!this.shadowRoot) return;
        this.shadowRoot.removeChild(messageEl);
      }, duration);
    }
  }

  customElements.define("s-messages", SMessages);
}
