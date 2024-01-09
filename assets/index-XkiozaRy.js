var h=Object.defineProperty;var u=(r,t,n)=>t in r?h(r,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):r[t]=n;var c=(r,t,n)=>(u(r,typeof t!="symbol"?t+"":t,n),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const e of o)if(e.type==="childList")for(const a of e.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const e={};return o.integrity&&(e.integrity=o.integrity),o.referrerPolicy&&(e.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?e.credentials="include":o.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function l(o){if(o.ep)return;o.ep=!0;const e=n(o);fetch(o.href,e)}})();function b(r){const t=document.createElement("template");t.innerHTML=`
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
            color: var(--text-color);
            background-color: var(--background-color);
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
`;class n extends HTMLElement{static get observedAttributes(){return["title","header","footer"]}constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[r],this.shadowRoot.appendChild(t.content.cloneNode(!0)))}connectedCallback(){this.updateTitle(),this.updateHeader(),this.updateFooter()}attributeChangedCallback(o){o==="title"?this.updateTitle():o==="header"?this.updateHeader():o==="footer"&&this.updateFooter()}updateTitle(){if(!this.shadowRoot)return;const o=this.getAttribute("title"),e=this.shadowRoot.querySelector("#title");if(!e)return;const a=this.querySelector('template[slot="title"]');if(a){const s=a.content.cloneNode(!0);e.innerHTML="",e.appendChild(s),e.style.display="block"}else e.innerHTML=o?`${o}`:"",e.style.display=o?"block":"none"}updateHeader(){if(!this.shadowRoot)return;const o=this.getAttribute("header"),e=this.shadowRoot.querySelector("#header"),a=this.querySelector('template[slot="header"]');if(a){const s=a.content.cloneNode(!0);e.innerHTML="",e.appendChild(s),e.style.display="block"}else e.innerHTML=o?`<header>${o}</header>`:"",e.style.display=o?"block":"none"}updateFooter(){if(!this.shadowRoot)return;const o=this.getAttribute("footer"),e=this.shadowRoot.querySelector("#footer"),a=this.querySelector('template[slot="footer"]');if(a){const s=a.content.cloneNode(!0);e.innerHTML="",e.appendChild(s),e.style.display="block"}else e.innerHTML=o?`<footer>${o}</footer>`:"",e.style.display=o?"block":"none"}}customElements.define("s-card",n)}function p(r){const t=document.createElement("template");t.innerHTML=`
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
`;class n extends HTMLElement{constructor(){super();c(this,"hamburger",null);c(this,"menubar",null);this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[r],this.shadowRoot.appendChild(t.content.cloneNode(!0)),this.hamburger=this.shadowRoot.querySelector(".hamburger"),this.menubar=this.shadowRoot.querySelector(".menubar"),this.hamburger&&this.hamburger.addEventListener("click",()=>this.toggleMenu()))}toggleMenu(){this.menubar&&this.menubar.classList.toggle("open")}}customElements.define("s-menubar",n)}function m(r){const t=document.createElement("template");t.innerHTML=`
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
`;class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[r],this.shadowRoot.appendChild(t.content.cloneNode(!0)))}}customElements.define("s-menuitem",n)}function f(r){const t=document.createElement("template");t.innerHTML=`
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
  `;class n extends HTMLElement{constructor(){super();c(this,"button",null);this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[r],this.shadowRoot.appendChild(t.content.cloneNode(!0)),this.button=this.shadowRoot.querySelector(".button"))}connectedCallback(){this.addEventListener("click",this._onClick)}disconnectedCallback(){this.removeEventListener("click",this._onClick)}_onClick(e){this.dispatchEvent(new CustomEvent("s-button-click",{bubbles:!0,composed:!0,detail:{originalEvent:e}}))}get severity(){return this.getAttribute("severity")}set severity(e){e&&this.setAttribute("severity",e)}static get observedAttributes(){return["text","severity"]}attributeChangedCallback(e,a,s){this.button&&(e==="text"?this.button.textContent=s:e==="severity"&&this.updateButtonSeverity(s))}updateButtonSeverity(e){this.button&&(this.button.className="button",e&&this.button.classList.add(e))}}customElements.define("s-button",n)}function y(r){const t=document.createElement("template");t.innerHTML=`
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
        background-color: var(--secondary-color);
        color: var(--secondary-text-color);
        border: none;
        border-bottom: 4px solid transparent;
        border-radius: var(--border-radius) var(--border-radius) 0 0;
        margin-right: .25rem;
      }

      .tab-button.active {
        border-bottom-color: var(--secondary-active-color);
      }

      .tab-content {
        display: none;
        padding: var(--spacing);
        background-color: var(--background-color);
        border: var(--border-width) solid var(--secondary-border-color);
        border-radius: 0 var(--border-radius) var(--border-radius) var(--border-radius);
      }

      .tab-content.active {
        display: block;
      }
    </style>

    <div class="tabs-header"></div>
    <div class="tabs-content"></div>
  `;class n extends HTMLElement{constructor(){super();c(this,"tabsHeader",null);c(this,"tabsContent",null);this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[r],this.shadowRoot.appendChild(t.content.cloneNode(!0)),this.tabsHeader=this.shadowRoot.querySelector(".tabs-header"),this.tabsContent=this.shadowRoot.querySelector(".tabs-content"))}connectedCallback(){this.renderTabs()}renderTabs(){!this.tabsHeader||!this.tabsContent||(this.tabsHeader.innerHTML="",this.tabsContent.innerHTML="",Array.from(this.children).forEach((e,a)=>{if(e.tagName.toLowerCase()==="s-tab"){const s=e,d=document.createElement("button");if(d.classList.add("tab-button"),d.textContent=s.title,d.addEventListener("click",()=>this.selectTab(a)),!this.tabsHeader)return;this.tabsHeader.appendChild(d);const i=document.createElement("div");for(i.classList.add("tab-content");e.firstChild;)i.appendChild(e.firstChild);if(!this.tabsContent)return;this.tabsContent.appendChild(i)}}),this.selectTab(0))}selectTab(e){if(!this.tabsHeader||!this.tabsContent)return;const a=this.tabsHeader.querySelectorAll(".tab-button"),s=this.tabsContent.querySelectorAll(".tab-content");a.forEach((d,i)=>{d.classList.toggle("active",i===e)}),s.forEach((d,i)=>{d.classList.toggle("active",i===e)})}}customElements.define("s-tabs",n)}function v(r){class t extends HTMLElement{constructor(){super()}get title(){return this.getAttribute("title")??""}}customElements.define("s-tab",t)}function g(r){const t=document.createElement("template");t.innerHTML=`
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
                background-color: var(--background-color);
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
    `;class n extends HTMLElement{constructor(){super();c(this,"tableHeader",null);c(this,"tableBody",null);this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[r],this.shadowRoot.appendChild(t.content.cloneNode(!0)),this.tableHeader=this.shadowRoot.querySelector("#table-header"),this.tableBody=this.shadowRoot.querySelector("#table-body"),console.log("STable constructor"))}set data(e){e&&e.headers&&e.rows&&this.renderTable(e)}renderTable(e){this.renderTableHeader(e.headers),this.renderTableBody(e.rows)}renderTableHeader(e){this.tableHeader&&(this.tableHeader.innerHTML="",e.forEach(a=>{const s=document.createElement("th");s.textContent=a,this.tableHeader&&this.tableHeader.appendChild(s)}))}renderTableBody(e){this.tableBody&&(this.tableBody.innerHTML="",e.forEach(a=>{const s=document.createElement("tr");a.forEach(d=>{const i=document.createElement("td");i.textContent=d.toString(),s.appendChild(i)}),this.tableBody&&this.tableBody.appendChild(s)}))}}customElements.define("s-table",n)}function w(r){const t=document.createElement("template");t.innerHTML=`
      <style>
        :host {
          display: block;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: none;
          justify-content: center;
          align-items: center;
        }

        .modal-content {
          background-color: #fff;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          max-width: 500px;
          width: 100%;
        }

        .modal-header, .modal-footer {
          padding: 10px 0;
        }

        .modal-body {
          padding: 20px 0;
        }

        .close-button {
          float: right;
          cursor: pointer;
        }
      </style>
      <div class="modal-content">
        <div class="modal-header">
          <slot name="header"></slot>
          <span class="close-button">&times;</span>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;class n extends HTMLElement{constructor(){super();c(this,"_modalVisible",!1);if(this.attachShadow({mode:"open"}),!this.shadowRoot)return;this.shadowRoot.appendChild(t.content.cloneNode(!0));const e=this.shadowRoot.querySelector(".close-button");e&&e.addEventListener("click",()=>this.hide())}connectedCallback(){this.hasAttribute("visible")&&(this._modalVisible=!0),this._updateRendering()}static get observedAttributes(){return["visible"]}attributeChangedCallback(e,a,s){e==="visible"&&(this._modalVisible=s!==null,this._updateRendering())}show(){this._modalVisible=!0,this._updateRendering(),this.setAttribute("visible","")}hide(){this._modalVisible=!1,this._updateRendering(),this.removeAttribute("visible")}_updateRendering(){this.shadowRoot&&(this.style.display=this._modalVisible?"flex":"none")}}customElements.define("s-modal",n)}function S(){return fetch("./theme.css").then(r=>r.text()).then(r=>{const t=new CSSStyleSheet;t.replaceSync(r),b(t),p(t),m(t),f(t),y(t),v(),g(t),w()})}document.addEventListener("DOMContentLoaded",()=>{S().then(()=>{const r=document.querySelector("s-table");if(r){const t={headers:["Name","Age","City"],rows:[["Alice",30,"New York"],["Bob",25,"San Francisco"],["Charlie",35,"London"]]};r.data=t}})});
