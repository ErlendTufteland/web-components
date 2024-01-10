var h=Object.defineProperty;var b=(r,e,a)=>e in r?h(r,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):r[e]=a;var c=(r,e,a)=>(b(r,typeof e!="symbol"?e+"":e,a),a);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const t of o)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function a(o){const t={};return o.integrity&&(t.integrity=o.integrity),o.referrerPolicy&&(t.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?t.credentials="include":o.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(o){if(o.ep)return;o.ep=!0;const t=a(o);fetch(o.href,t)}})();function p(r){const e=document.createElement("template");e.innerHTML=`
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
`;class a extends HTMLElement{static get observedAttributes(){return["title","header","footer"]}constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[r],this.shadowRoot.appendChild(e.content.cloneNode(!0)))}connectedCallback(){this.updateTitle(),this.updateHeader(),this.updateFooter()}attributeChangedCallback(o){o==="title"?this.updateTitle():o==="header"?this.updateHeader():o==="footer"&&this.updateFooter()}updateTitle(){if(!this.shadowRoot)return;const o=this.getAttribute("title"),t=this.shadowRoot.querySelector("#title");if(!t)return;const n=this.querySelector('template[slot="title"]');if(n){const s=n.content.cloneNode(!0);t.innerHTML="",t.appendChild(s),t.style.display="block"}else t.innerHTML=o?`${o}`:"",t.style.display=o?"block":"none"}updateHeader(){if(!this.shadowRoot)return;const o=this.getAttribute("header"),t=this.shadowRoot.querySelector("#header"),n=this.querySelector('template[slot="header"]');if(n){const s=n.content.cloneNode(!0);t.innerHTML="",t.appendChild(s),t.style.display="block"}else t.innerHTML=o?`<header>${o}</header>`:"",t.style.display=o?"block":"none"}updateFooter(){if(!this.shadowRoot)return;const o=this.getAttribute("footer"),t=this.shadowRoot.querySelector("#footer"),n=this.querySelector('template[slot="footer"]');if(n){const s=n.content.cloneNode(!0);t.innerHTML="",t.appendChild(s),t.style.display="block"}else t.innerHTML=o?`<footer>${o}</footer>`:"",t.style.display=o?"block":"none"}}customElements.define("s-card",a)}function m(r){const e=document.createElement("template");e.innerHTML=`
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
`;class a extends HTMLElement{constructor(){super();c(this,"hamburger",null);c(this,"menubar",null);this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[r],this.shadowRoot.appendChild(e.content.cloneNode(!0)),this.hamburger=this.shadowRoot.querySelector(".hamburger"),this.menubar=this.shadowRoot.querySelector(".menubar"),this.hamburger&&this.hamburger.addEventListener("click",()=>this.toggleMenu()))}toggleMenu(){this.menubar&&this.menubar.classList.toggle("open")}}customElements.define("s-menubar",a)}function f(r){const e=document.createElement("template");e.innerHTML=`
    <style>
        .menuitem {
            display: block;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
            cursor: pointer;
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
`;class a extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[r],this.shadowRoot.appendChild(e.content.cloneNode(!0)))}}customElements.define("s-menuitem",a)}function y(r){const e=document.createElement("template");e.innerHTML=`
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
  `;class a extends HTMLElement{constructor(){super();c(this,"button",null);this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[r],this.shadowRoot.appendChild(e.content.cloneNode(!0)),this.button=this.shadowRoot.querySelector(".button"))}connectedCallback(){this.addEventListener("click",this._onClick)}disconnectedCallback(){this.removeEventListener("click",this._onClick)}_onClick(t){this.dispatchEvent(new CustomEvent("s-button-click",{bubbles:!0,composed:!0,detail:{originalEvent:t}}))}get severity(){return this.getAttribute("severity")}set severity(t){t&&this.setAttribute("severity",t)}static get observedAttributes(){return["text","severity"]}attributeChangedCallback(t,n,s){this.button&&(t==="text"?this.button.textContent=s:t==="severity"&&this.updateButtonSeverity(s))}updateButtonSeverity(t){this.button&&(this.button.className="button",t&&this.button.classList.add(t))}}customElements.define("s-button",a)}function v(r){const e=document.createElement("template");e.innerHTML=`
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
  `;class a extends HTMLElement{constructor(){super();c(this,"tabsHeader",null);c(this,"tabsContent",null);this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[r],this.shadowRoot.appendChild(e.content.cloneNode(!0)),this.tabsHeader=this.shadowRoot.querySelector(".tabs-header"),this.tabsContent=this.shadowRoot.querySelector(".tabs-content"))}connectedCallback(){this.renderTabs()}renderTabs(){!this.tabsHeader||!this.tabsContent||(this.tabsHeader.innerHTML="",this.tabsContent.innerHTML="",Array.from(this.children).forEach((t,n)=>{if(t.tagName.toLowerCase()==="s-tab"){const s=t,i=document.createElement("button");if(i.classList.add("tab-button"),i.textContent=s.title,i.addEventListener("click",()=>this.selectTab(n)),!this.tabsHeader)return;this.tabsHeader.appendChild(i);const d=document.createElement("div");for(d.classList.add("tab-content");t.firstChild;)d.appendChild(t.firstChild);if(!this.tabsContent)return;this.tabsContent.appendChild(d)}}),this.selectTab(0))}selectTab(t){if(!this.tabsHeader||!this.tabsContent)return;const n=this.tabsHeader.querySelectorAll(".tab-button"),s=this.tabsContent.querySelectorAll(".tab-content");n.forEach((i,d)=>{i.classList.toggle("active",d===t)}),s.forEach((i,d)=>{i.classList.toggle("active",d===t)})}}customElements.define("s-tabs",a)}function g(r){class e extends HTMLElement{constructor(){super()}get title(){return this.getAttribute("title")??""}}customElements.define("s-tab",e)}function w(r){const e=document.createElement("template");e.innerHTML=`
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
    `;class a extends HTMLElement{constructor(){super();c(this,"tableHeader",null);c(this,"tableBody",null);this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[r],this.shadowRoot.appendChild(e.content.cloneNode(!0)),this.tableHeader=this.shadowRoot.querySelector("#table-header"),this.tableBody=this.shadowRoot.querySelector("#table-body"),console.log("STable constructor"))}set data(t){t&&t.headers&&t.rows&&this.renderTable(t)}renderTable(t){this.renderTableHeader(t.headers),this.renderTableBody(t.rows)}renderTableHeader(t){this.tableHeader&&(this.tableHeader.innerHTML="",t.forEach(n=>{const s=document.createElement("th");s.textContent=n,this.tableHeader&&this.tableHeader.appendChild(s)}))}renderTableBody(t){this.tableBody&&(this.tableBody.innerHTML="",t.forEach(n=>{const s=document.createElement("tr");n.forEach(i=>{const d=document.createElement("td");d.textContent=i.toString(),s.appendChild(d)}),this.tableBody&&this.tableBody.appendChild(s)}))}}customElements.define("s-table",a)}function S(r){const e=document.createElement("template");e.innerHTML=`
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
  `;class a extends HTMLElement{constructor(){super();c(this,"_modalVisible",!1);this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[r],this.shadowRoot.appendChild(e.content.cloneNode(!0)))}static get observedAttributes(){return["visible","title","footer"]}connectedCallback(){if(this.hasAttribute("visible")&&(this._modalVisible=!0),this._updateRendering(),this.updateContent("#modal-title",'template[slot="title"]',"title"),this.updateContent("#modal-footer",'template[slot="footer"]',"footer"),!this.shadowRoot)return;const t=this.shadowRoot.querySelector(".close-button");t&&t.addEventListener("click",()=>this.hide())}updateContent(t,n,s){if(!this.shadowRoot)return;const i=this.shadowRoot.querySelector(t);if(!i)return;const d=this.querySelector(n);if(i){if(i.innerHTML="",d){const u=d;i.appendChild(u.content.cloneNode(!0))}else{const u=this.getAttribute(s);i.textContent=u??""}i.style.display=d||this.hasAttribute(s)?"block":"none"}}attributeChangedCallback(t,n,s){t==="visible"?(this._modalVisible=s!==null,this._updateRendering()):t==="title"?this.updateContent("#modal-title",'template[slot="title"]',"title"):t==="footer"&&this.updateContent("#modal-footer",'template[slot="footer"]',"footer")}show(){this._modalVisible=!0,this._updateRendering(),this.setAttribute("visible","")}hide(){this._modalVisible=!1,this._updateRendering(),this.removeAttribute("visible")}_updateRendering(){if(this.shadowRoot){const t=this.shadowRoot.querySelector("dialog");if(!t)return;this._modalVisible?t.showModal():t.close(),this.style.display=this._modalVisible?"flex":"none"}}}customElements.define("s-modal",a)}function C(r){const e=document.createElement("template");e.innerHTML=`
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
  `;class a extends HTMLElement{constructor(){super();c(this,"inputElement",null);this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[r],this.shadowRoot.appendChild(e.content.cloneNode(!0)),this.inputElement=this.shadowRoot.querySelector("input"),this.updateType(),this.updatePlaceholder(),this.updateValue())}static get observedAttributes(){return["type","placeholder","value"]}attributeChangedCallback(t,n,s){t==="type"?this.updateType():t==="placeholder"?this.updatePlaceholder():t==="value"&&this.updateValue()}updateType(){if(!this.inputElement)return;const t=this.getAttribute("type")||"text";this.inputElement.type=t}updatePlaceholder(){if(!this.inputElement)return;const t=this.getAttribute("placeholder")||"";this.inputElement.placeholder=t}updateValue(){if(!this.inputElement)return;const t=this.getAttribute("value")||"";this.inputElement.value=t}}customElements.define("s-input",a)}function x(){return fetch("./theme.css").then(r=>r.text()).then(r=>{const e=new CSSStyleSheet;e.replaceSync(r),p(e),m(e),f(e),y(e),v(e),g(),w(e),S(e),C(e)})}document.addEventListener("DOMContentLoaded",()=>{x().then(()=>{const r=document.querySelector("s-table");if(r){const e={headers:["Name","Age","City"],rows:[["Alice",30,"New York"],["Bob",25,"San Francisco"],["Charlie",35,"London"]]};r.data=e}})});
