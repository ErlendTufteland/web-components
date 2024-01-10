var p=Object.defineProperty;var b=(o,t,n)=>t in o?p(o,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):o[t]=n;var c=(o,t,n)=>(b(o,typeof t!="symbol"?t+"":t,n),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))l(r);new MutationObserver(r=>{for(const e of r)if(e.type==="childList")for(const a of e.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const e={};return r.integrity&&(e.integrity=r.integrity),r.referrerPolicy&&(e.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?e.credentials="include":r.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function l(r){if(r.ep)return;r.ep=!0;const e=n(r);fetch(r.href,e)}})();function m(o){const t=document.createElement("template");t.innerHTML=`
     <style>
        #card {
            border: var(--border-width) solid var(--secondary-border-color);
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
            margin-bottom: var(--spacing);
        }

        #title {
          color: var(--primary-text-color);
          background-color: var(--secondary-color);
          margin: 0
        }

        #title, #header, #body, #footer {
            padding: var(--spacing);
            border-bottom: var(--border-width) solid var(--secondary-border-color);
        }

        #title, #header, #footer {
            display: none;
        }

        #header, #body, #footer {
            color: var(--content-text-color);
            background-color: var(--content-background-color);
        }

    </style>

    <div id="card">
        <h3 id="title"></h3>
        <header id="header"></header>
        <div id="body">
            <slot></slot>
        </div>
        <footer id="footer"></footer>
    </div>
`;class n extends HTMLElement{static get observedAttributes(){return["title","header","footer"]}constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[o],this.shadowRoot.appendChild(t.content.cloneNode(!0)))}connectedCallback(){this.updateTitle(),this.updateHeader(),this.updateFooter()}attributeChangedCallback(r){r==="title"?this.updateTitle():r==="header"?this.updateHeader():r==="footer"&&this.updateFooter()}updateTitle(){if(!this.shadowRoot)return;const r=this.getAttribute("title"),e=this.shadowRoot.querySelector("#title");if(!e)return;const a=this.querySelector('template[slot="title"]');if(a){const s=a.content.cloneNode(!0);e.innerHTML="",e.appendChild(s),e.style.display="block"}else e.innerHTML=r?`${r}`:"",e.style.display=r?"block":"none"}updateHeader(){if(!this.shadowRoot)return;const r=this.getAttribute("header"),e=this.shadowRoot.querySelector("#header"),a=this.querySelector('template[slot="header"]');if(a){const s=a.content.cloneNode(!0);e.innerHTML="",e.appendChild(s),e.style.display="block"}else e.innerHTML=r?`<header>${r}</header>`:"",e.style.display=r?"block":"none"}updateFooter(){if(!this.shadowRoot)return;const r=this.getAttribute("footer"),e=this.shadowRoot.querySelector("#footer"),a=this.querySelector('template[slot="footer"]');if(a){const s=a.content.cloneNode(!0);e.innerHTML="",e.appendChild(s),e.style.display="block"}else e.innerHTML=r?`<footer>${r}</footer>`:"",e.style.display=r?"block":"none"}}customElements.define("s-card",n)}function f(o){const t=document.createElement("template");t.innerHTML=`
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
            padding: 14px 16px;
            text-align: center;
            background-color: var(--primary-color);
            border: var(--border-width) solid var(--primary-border-color);
            border-radius: var(--border-radius);
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
`;class n extends HTMLElement{constructor(){super();c(this,"hamburger",null);c(this,"menubar",null);this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[o],this.shadowRoot.appendChild(t.content.cloneNode(!0)),this.hamburger=this.shadowRoot.querySelector(".hamburger"),this.menubar=this.shadowRoot.querySelector(".menubar"),this.hamburger&&this.hamburger.addEventListener("click",()=>this.toggleMenu()))}toggleMenu(){this.menubar&&this.menubar.classList.toggle("open")}}customElements.define("s-menubar",n)}function g(o){const t=document.createElement("template");t.innerHTML=`
    <style>
        .menuitem {
            display: block;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
            cursor: pointer;
            background-color: var(--primary-color);
            color: var(--primary-text-color);
        }

        .menuitem:hover {
            background-color: var(--primary-hover-color);
            color: var(--primary-text-color);
        }
    </style>
    <li class="menuitem">
        <slot></slot>
    </li>
`;class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[o],this.shadowRoot.appendChild(t.content.cloneNode(!0)))}}customElements.define("s-menuitem",n)}function y(o){const t=document.createElement("template");t.innerHTML=`
    <style>
      :host {
        display: inline-block;
      }

      .button {
        padding: var(--spacing);
        border: none;
        border-radius: var(--border-radius);
        cursor: pointer;
        transition: background-color 0.3s;
      }

      .button:hover {
        filter: brightness(85%);
      }

      .button.default {
        background-color: var(--primary-color);
        color: var(--primary-text-color);
      }

      .button.primary {
        background-color: var(--primary-color);
        color: var(--primary-text-color);
      }

      .button.secondary {
        background-color: var(--secondary-color);
        color: var(--secondary-text-color);
      }

       .button.success {
        background-color: var(--success-color);
        color: var(--success-text-color);
      }

      .button.warning {
        background-color: var(--warning-color);
        color: var(--warning-text-color);
      }

      .button.danger {
        background-color: var(--error-color);
        color: var(--error-text-color);
      }

    </style>

    <button class="button default">
      <slot></slot>
    </button>
  `;class n extends HTMLElement{constructor(){super();c(this,"button",null);this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[o],this.shadowRoot.appendChild(t.content.cloneNode(!0)),this.button=this.shadowRoot.querySelector(".button"))}connectedCallback(){this.addEventListener("click",this._onClick)}disconnectedCallback(){this.removeEventListener("click",this._onClick)}_onClick(e){this.dispatchEvent(new CustomEvent("s-button-click",{bubbles:!0,composed:!0,detail:{originalEvent:e}}))}get severity(){return this.getAttribute("severity")}set severity(e){e&&this.setAttribute("severity",e)}static get observedAttributes(){return["text","severity"]}attributeChangedCallback(e,a,s){this.button&&(e==="text"?this.button.textContent=s:e==="severity"&&this.updateButtonSeverity(s))}updateButtonSeverity(e){this.button&&(this.button.className="button",e&&this.button.classList.add(e))}}customElements.define("s-button",n)}function v(o){const t=document.createElement("template");t.innerHTML=`
    <style>
      :host {
        display: block;
      }

      .tabs-header {
        display: flex;
      }

      .tab-button {
        cursor: pointer;
        padding: var(--spacing);
        background-color: var(--primary-color);
        color: var(--secondary-text-color);
        border: none;
        border-bottom: 4px solid transparent;
        border-radius: var(--border-radius) var(--border-radius) 0 0;
        margin-right: .25rem;
      }

      .tab-button.active {
        border-bottom-color: var(--primary-active-color);
      }

      .tab-content {
        display: none;
        padding: var(--spacing);
        background-color: var(--content-background-color);
        color: var(--content-text-color);
        border: var(--border-width) solid var(--primary-border-color);
        border-radius: 0 var(--border-radius) var(--border-radius) var(--border-radius);
      }

      .tab-content.active {
        display: block;
      }
    </style>

    <div class="tabs-header"></div>
    <div class="tabs-content"></div>
  `;class n extends HTMLElement{constructor(){super();c(this,"tabsHeader",null);c(this,"tabsContent",null);this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[o],this.shadowRoot.appendChild(t.content.cloneNode(!0)),this.tabsHeader=this.shadowRoot.querySelector(".tabs-header"),this.tabsContent=this.shadowRoot.querySelector(".tabs-content"))}connectedCallback(){this.renderTabs()}renderTabs(){!this.tabsHeader||!this.tabsContent||(this.tabsHeader.innerHTML="",this.tabsContent.innerHTML="",Array.from(this.children).forEach((e,a)=>{if(e.tagName.toLowerCase()==="s-tab"){const s=e,i=document.createElement("button");if(i.classList.add("tab-button"),i.textContent=s.title,i.addEventListener("click",()=>this.selectTab(a)),!this.tabsHeader)return;this.tabsHeader.appendChild(i);const d=document.createElement("div");for(d.classList.add("tab-content");e.firstChild;)d.appendChild(e.firstChild);if(!this.tabsContent)return;this.tabsContent.appendChild(d)}}),this.selectTab(0))}selectTab(e){if(!this.tabsHeader||!this.tabsContent)return;const a=this.tabsHeader.querySelectorAll(".tab-button"),s=this.tabsContent.querySelectorAll(".tab-content");a.forEach((i,d)=>{i.classList.toggle("active",d===e)}),s.forEach((i,d)=>{i.classList.toggle("active",d===e)})}}customElements.define("s-tabs",n)}function w(o){class t extends HTMLElement{constructor(){super()}get title(){return this.getAttribute("title")??""}}customElements.define("s-tab",t)}function x(o){const t=document.createElement("template");t.innerHTML=`
        <style>
            :host {
                display: block;
                overflow-x: auto;
            }
            table {
                width: 100%;
                border-collapse: separate;
                border-spacing: 0;
                border-radius: var(--border-radius);
            }
            th, td {
                padding: var(--spacing);
                text-align: left;
            }
            th {
                background-color: var(--secondary-color);
                color: var(--secondary-text-color);
                border: var(--border-width) solid var(--secondary-border-color);
            }

            th:first-child {
                border-top-left-radius: var(--border-radius);
            }

            th:last-child {
                border-top-right-radius: var(--border-radius);
            }
            
            td {
                border-bottom: var(--border-width) solid var(--secondary-border-color);
                border-left: var(--border-width) solid var(--secondary-border-color);
                background-color: var(--content-background-color);
                color: var(--content-text-color);
            }

            td:last-child {
                border-right: var(--border-width) solid var(--secondary-border-color);
            }
        </style>
        <table>
            <thead>
                <tr id="table-header"></tr>
            </thead>
            <tbody id="table-body"></tbody>
        </table>
    `;class n extends HTMLElement{constructor(){super();c(this,"tableHeader",null);c(this,"tableBody",null);this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[o],this.shadowRoot.appendChild(t.content.cloneNode(!0)),this.tableHeader=this.shadowRoot.querySelector("#table-header"),this.tableBody=this.shadowRoot.querySelector("#table-body"),console.log("STable constructor"))}set data(e){e&&e.headers&&e.rows&&this.renderTable(e)}renderTable(e){this.renderTableHeader(e.headers),this.renderTableBody(e.rows)}renderTableHeader(e){this.tableHeader&&(this.tableHeader.innerHTML="",e.forEach(a=>{const s=document.createElement("th");s.textContent=a,this.tableHeader&&this.tableHeader.appendChild(s)}))}renderTableBody(e){this.tableBody&&(this.tableBody.innerHTML="",e.forEach(a=>{const s=document.createElement("tr");a.forEach(i=>{const d=document.createElement("td");d.textContent=i.toString(),s.appendChild(d)}),this.tableBody&&this.tableBody.appendChild(s)}))}}customElements.define("s-table",n)}function S(o){const t=document.createElement("template");t.innerHTML=`
    <style>
      :host {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        justify-content: center;
        align-items: center;
        display: none;
      }
      
      dialog.modal-content {
        background-color: var(--content-background-color);
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        max-width: 500px;
        width: 100%;
        color: var(--content-text-color);
        padding: 0;
        border: var(--border-width) solid var(--secondary-border-color);
      }

      #modal-header {
        display:flex;
        justify-content: space-between;
        border-top-left-radius: var(--border-radius);
        border-top-right-radius: var(--border-radius);
        background-color: var(--secondary-color);
        color: var(--secondary-text-color);
        padding: var(--spacing);
        border-bottom: var(--border-width) solid var(--secondary-border-color);
      }

      #modal-title {
        margin: 0;
      }

      .close-button {
        cursor: pointer;
        align-self: center;
        font-size: 1.5rem;
      }

      #modal-body, #modal-footer {   
        padding: var(--spacing);
        border-bottom: var(--border-width) solid var(--secondary-border-color);
      }
    </style>
    <dialog class="modal-content">
      <header id="modal-header">
        <h3 id="modal-title"></h3>
        <span class="close-button">&times;</span>
      </header>
      <div id="modal-body">
        <slot></slot>
      </div>
      <footer id="modal-footer"></footer>
    </dialog>
  `;class n extends HTMLElement{constructor(){super();c(this,"_modalVisible",!1);this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[o],this.shadowRoot.appendChild(t.content.cloneNode(!0)))}static get observedAttributes(){return["visible","title","footer"]}connectedCallback(){if(this.hasAttribute("visible")&&(this._modalVisible=!0),this._updateRendering(),this.updateContent("#modal-title",'template[slot="title"]',"title"),this.updateContent("#modal-footer",'template[slot="footer"]',"footer"),!this.shadowRoot)return;const e=this.shadowRoot.querySelector(".close-button");e&&e.addEventListener("click",()=>this.hide())}updateContent(e,a,s){if(!this.shadowRoot)return;const i=this.shadowRoot.querySelector(e);if(!i)return;const d=this.querySelector(a);if(i){if(i.innerHTML="",d){const h=d;i.appendChild(h.content.cloneNode(!0))}else{const h=this.getAttribute(s);i.textContent=h??""}i.style.display=d||this.hasAttribute(s)?"block":"none"}}attributeChangedCallback(e,a,s){e==="visible"?(this._modalVisible=s!==null,this._updateRendering()):e==="title"?this.updateContent("#modal-title",'template[slot="title"]',"title"):e==="footer"&&this.updateContent("#modal-footer",'template[slot="footer"]',"footer")}show(){this._modalVisible=!0,this._updateRendering(),this.setAttribute("visible","")}hide(){this._modalVisible=!1,this._updateRendering(),this.removeAttribute("visible")}_updateRendering(){if(this.shadowRoot){const e=this.shadowRoot.querySelector("dialog");if(!e)return;this._modalVisible?e.showModal():e.close(),this.style.display=this._modalVisible?"flex":"none"}}}customElements.define("s-modal",n)}function k(o){const t=document.createElement("template");t.innerHTML=`
    <style>
      :host {
        display: block;
      }

      input {
        box-sizing: border-box;
        padding: 0.5rem;
        border: 1px solid var(--primary-border-color);
        border-radius: var(--border-radius, 4px);
        font-size: 1rem;
        background-color: var(--content-background-color);
        width: 100%;
      }

      input:focus {
        outline: none;
        border-color: var(--primary-active-color);
        box-shadow: 0 0 0 2px rgba(0, 113, 255, 0.2);
      }
    </style>
    <input type="text" />
  `;class n extends HTMLElement{constructor(){super();c(this,"inputElement",null);this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[o],this.shadowRoot.appendChild(t.content.cloneNode(!0)),this.inputElement=this.shadowRoot.querySelector("input"),this.updateType(),this.updatePlaceholder(),this.updateValue())}static get observedAttributes(){return["type","placeholder","value"]}attributeChangedCallback(e,a,s){e==="type"?this.updateType():e==="placeholder"?this.updatePlaceholder():e==="value"&&this.updateValue()}updateType(){if(!this.inputElement)return;const e=this.getAttribute("type")||"text";this.inputElement.type=e}updatePlaceholder(){if(!this.inputElement)return;const e=this.getAttribute("placeholder")||"";this.inputElement.placeholder=e}updateValue(){if(!this.inputElement)return;const e=this.getAttribute("value")||"";this.inputElement.value=e}}customElements.define("s-input",n)}function C(o){const t=document.createElement("template");t.innerHTML=`
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
  `;class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[o],this.shadowRoot.appendChild(t.content.cloneNode(!0)))}showMessage(r,e="success",a=5e3){if(!this.shadowRoot)return;const s=document.createElement("div");s.className=`message ${e}`,s.textContent=r,this.shadowRoot.appendChild(s),setTimeout(()=>{this.shadowRoot&&this.shadowRoot.removeChild(s)},a)}}customElements.define("s-messages",n)}function E(o){const t=document.createElement("template");t.innerHTML=`
    <style>
      :host {
        display: inline-block;
        font-family: sans-serif;
      }

      .checkbox-container {
        display: flex;
        align-items: center;
      }

      .checkbox-label {
        margin-left: 0.5rem;
      }

      /* Customize the native checkbox */
      .checkbox-input {
        accent-color: var(--primary-color, blue);
      }
    </style>
    <label class="checkbox-container">
      <input type="checkbox" class="checkbox-input">
      <span class="checkbox-label"><slot></slot></span>
    </label>
  `;class n extends HTMLElement{constructor(){super();c(this,"checkboxInput",null);this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[o],this.shadowRoot.appendChild(t.content.cloneNode(!0)),this.checkboxInput=this.shadowRoot.querySelector(".checkbox-input"),this.checkboxInput&&this.checkboxInput.addEventListener("change",this.handleChange.bind(this)))}handleChange(e){const a=e.target;this.dispatchEvent(new CustomEvent("change",{detail:a.checked}))}get checked(){return this.hasAttribute("checked")}set checked(e){!!e?(this.setAttribute("checked",""),this.checkboxInput&&(this.checkboxInput.checked=!0)):(this.removeAttribute("checked"),this.checkboxInput&&(this.checkboxInput.checked=!1))}static get observedAttributes(){return["checked"]}attributeChangedCallback(e,a,s){e==="checked"&&this.checkboxInput&&(this.checkboxInput.checked=this.hasAttribute("checked"))}}customElements.define("s-checkbox",n)}function R(o){const t=document.createElement("template");t.innerHTML=`
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
    <pre>
      <code>
        <slot></slot>
      </code>
    </pre>
  `;class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[o],this.shadowRoot.appendChild(t.content.cloneNode(!0)))}}customElements.define("s-code",n)}function L(o){const t=document.createElement("template");t.innerHTML=`
    <style>
      :host {
        display: block;
        width: 0; /* Initially hidden */
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        background-color: var(--primary-color);
        color: var(--primary-text-color);
        border-right: 1px solid var(--primary-border-color);
        
        transition: width 0.3s; /* Smooth transition for width */
        z-index: 1000; /* Ensure it's above other content */
      }

      .s-sidemenu {
        width:100%;
        overflow: hidden; /* Disable horizontal scroll */
      }

      .toggle-button {
        position: absolute;
        top: 10px;
        left: 100%; /* Position right outside the menu */
        background-color: var(--primary-color);
        border: none;
        cursor: pointer;
        padding: 10px;
        border-radius: 0 5px 5px 0; /* Rounded corners on the right side */
      }

      .toggle-button:hover {
        background-color: var(--primary-hover-color);
      }

      .icon {
        /* Style for your icon (e.g., arrow or hamburger icon) */
      }
    </style>
    <button class="toggle-button">
      <span class="icon">☰</span> <!-- Replace with your icon -->
    </button>
    <div class="s-sidemenu">
        <slot></slot> <!-- Slot for menu items -->
    </div>
  `;class n extends HTMLElement{constructor(){super();c(this,"toggleButton",null);this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[o],this.shadowRoot.appendChild(t.content.cloneNode(!0)),this.toggleButton=this.shadowRoot.querySelector(".toggle-button"),this.toggleButton&&this.toggleButton.addEventListener("click",()=>this.toggleMenu()))}toggleMenu(){const e=this.style.width;this.style.width=e==="250px"?"0":"250px"}}customElements.define("s-sidemenu",n)}function T(o){const t=document.createElement("template");t.innerHTML=`
    <style>
      :host {
        display: inline-block;
        position: relative;
      }

      .dropdown-button {
        background-color: var(--primary-color);
        color: var(--primary-text-color);
        padding: 10px;
        border: none;
        cursor: pointer;
        border-radius: var(--border-radius);
      }

      .dropdown-content {
        display: none;
        position: absolute;
        background-color: var(--content-background-color);
        color: var(--content-text-color);
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
        border-radius: var(--border-radius);
      }

      .show {
        display: block;
      }
    </style>
    <button class="dropdown-button">Overlaypanel</button>
    <div class="dropdown-content">
      <slot></slot>
    </div>
  `;class n extends HTMLElement{constructor(){super();c(this,"dropdownContent",null);c(this,"dropdownButton",null);this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[o],this.shadowRoot.appendChild(t.content.cloneNode(!0)),this.dropdownContent=this.shadowRoot.querySelector(".dropdown-content"),this.dropdownButton=this.shadowRoot.querySelector(".dropdown-button"),this.dropdownButton&&this.dropdownButton.addEventListener("click",()=>{this.dropdownContent&&this.dropdownContent.classList.toggle("show")}))}connectedCallback(){window.addEventListener("click",e=>{if(!e.composedPath().includes(this)){if(!this.dropdownContent)return;this.dropdownContent.classList.remove("show")}})}}customElements.define("s-overlaypanel",n)}function M(o){const t=document.createElement("template");t.innerHTML=`
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
  `;class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[o],this.shadowRoot.appendChild(t.content.cloneNode(!0)),this.initCustomSelect())}initCustomSelect(){if(!this.shadowRoot)return;const r=this.getOptions(),e=this.shadowRoot.querySelector(".select-selected");if(!e)return;const a=this.shadowRoot.querySelector(".select-items");a&&(e.innerHTML=r[0],r.forEach((s,i)=>{const d=document.createElement("div");d.innerHTML=s,d.addEventListener("click",()=>{e.innerHTML=s,this.closeAllSelect()}),a.appendChild(d)}),e.addEventListener("click",s=>{s.stopPropagation(),this.closeAllSelect(e),e.classList.toggle("select-arrow-active")}))}getOptions(){const r=[];return Array.from(this.children).forEach(e=>{e.tagName==="OPTION"&&r.push(e.innerHTML)}),r}closeAllSelect(r=null){if(!this.shadowRoot)return;const e=this.shadowRoot.querySelectorAll(".select-items"),a=this.shadowRoot.querySelectorAll(".select-selected");e.forEach(s=>{s!==r&&s.classList.toggle("select-hide")}),a.forEach(s=>{s!==r&&s.classList.remove("select-arrow-active")})}}customElements.define("s-select",n)}function H(){return fetch("./theme.css").then(o=>o.text()).then(o=>{const t=new CSSStyleSheet;t.replaceSync(o),m(t),f(t),g(t),y(t),v(t),w(),x(t),S(t),k(t),C(t),E(t),R(t),L(t),T(t),M(t)})}document.addEventListener("DOMContentLoaded",()=>{H().then(()=>{const o=document.querySelector("s-table");if(o){const n={headers:["Name","Age","City"],rows:[["Alice",30,"New York"],["Bob",25,"San Francisco"],["Charlie",35,"London"]]};o.data=n}const t=document.getElementById("messageBox");t&&(t.showMessage("Submission successful!","success"),t.showMessage("An error occurred!","error"),t.showMessage("Please check your input.","warning"))})});function u(o){console.log("triggerMessage");const t=document.getElementById("messageBox");t&&(o==="success"&&t.showMessage("Submission successful!",o),o==="error"&&t.showMessage("An error occurred!",o),o==="warning"&&t.showMessage("Please check your input.",o))}document.addEventListener("DOMContentLoaded",()=>{var o,t,n;(o=document.getElementById("successButton"))==null||o.addEventListener("click",()=>u("success")),(t=document.getElementById("warningButton"))==null||t.addEventListener("click",()=>u("warning")),(n=document.getElementById("dangerButton"))==null||n.addEventListener("click",()=>u("error"))});document.addEventListener("DOMContentLoaded",()=>{var o;(o=document.getElementById("myCheckbox"))==null||o.addEventListener("change",t=>{console.log("Checkbox state:",t.detail)})});
