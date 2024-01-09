var h=Object.defineProperty;var u=(n,t,a)=>t in n?h(n,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):n[t]=a;var c=(n,t,a)=>(u(n,typeof t!="symbol"?t+"":t,a),a);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const e of o)if(e.type==="childList")for(const r of e.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&l(r)}).observe(document,{childList:!0,subtree:!0});function a(o){const e={};return o.integrity&&(e.integrity=o.integrity),o.referrerPolicy&&(e.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?e.credentials="include":o.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function l(o){if(o.ep)return;o.ep=!0;const e=a(o);fetch(o.href,e)}})();function b(n){const t=document.createElement("template");t.innerHTML=`
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
`;class a extends HTMLElement{static get observedAttributes(){return["title","header","footer"]}constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[n],this.shadowRoot.appendChild(t.content.cloneNode(!0)))}connectedCallback(){this.updateTitle(),this.updateHeader(),this.updateFooter()}attributeChangedCallback(o){o==="title"?this.updateTitle():o==="header"?this.updateHeader():o==="footer"&&this.updateFooter()}updateTitle(){if(!this.shadowRoot)return;const o=this.getAttribute("title"),e=this.shadowRoot.querySelector("#title");if(!e)return;const r=this.querySelector('template[slot="title"]');if(r){const s=r.content.cloneNode(!0);e.innerHTML="",e.appendChild(s),e.style.display="block"}else e.innerHTML=o?`${o}`:"",e.style.display=o?"block":"none"}updateHeader(){if(!this.shadowRoot)return;const o=this.getAttribute("header"),e=this.shadowRoot.querySelector("#header"),r=this.querySelector('template[slot="header"]');if(r){const s=r.content.cloneNode(!0);e.innerHTML="",e.appendChild(s),e.style.display="block"}else e.innerHTML=o?`<header>${o}</header>`:"",e.style.display=o?"block":"none"}updateFooter(){if(!this.shadowRoot)return;const o=this.getAttribute("footer"),e=this.shadowRoot.querySelector("#footer"),r=this.querySelector('template[slot="footer"]');if(r){const s=r.content.cloneNode(!0);e.innerHTML="",e.appendChild(s),e.style.display="block"}else e.innerHTML=o?`<footer>${o}</footer>`:"",e.style.display=o?"block":"none"}}customElements.define("s-card",a)}function p(n){const t=document.createElement("template");t.innerHTML=`
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
`;class a extends HTMLElement{constructor(){super();c(this,"hamburger",null);c(this,"menubar",null);this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[n],this.shadowRoot.appendChild(t.content.cloneNode(!0)),this.hamburger=this.shadowRoot.querySelector(".hamburger"),this.menubar=this.shadowRoot.querySelector(".menubar"),this.hamburger&&this.hamburger.addEventListener("click",()=>this.toggleMenu()))}toggleMenu(){this.menubar&&this.menubar.classList.toggle("open")}}customElements.define("s-menubar",a)}function m(n){const t=document.createElement("template");t.innerHTML=`
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
`;class a extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[n],this.shadowRoot.appendChild(t.content.cloneNode(!0)))}}customElements.define("s-menuitem",a)}function f(n){const t=document.createElement("template");t.innerHTML=`
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
  `;class a extends HTMLElement{constructor(){super();c(this,"button",null);this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[n],this.shadowRoot.appendChild(t.content.cloneNode(!0)),this.button=this.shadowRoot.querySelector(".button"))}connectedCallback(){this.addEventListener("click",this._onClick)}disconnectedCallback(){this.removeEventListener("click",this._onClick)}_onClick(e){this.dispatchEvent(new CustomEvent("s-button-click",{bubbles:!0,composed:!0,detail:{originalEvent:e}}))}get severity(){return this.getAttribute("severity")}set severity(e){e&&this.setAttribute("severity",e)}static get observedAttributes(){return["text","severity"]}attributeChangedCallback(e,r,s){this.button&&(e==="text"?this.button.textContent=s:e==="severity"&&this.updateButtonSeverity(s))}updateButtonSeverity(e){this.button&&(this.button.className="button",e&&this.button.classList.add(e))}}customElements.define("s-button",a)}function y(n){const t=document.createElement("template");t.innerHTML=`
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
  `;class a extends HTMLElement{constructor(){super();c(this,"tabsHeader",null);c(this,"tabsContent",null);this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[n],this.shadowRoot.appendChild(t.content.cloneNode(!0)),this.tabsHeader=this.shadowRoot.querySelector(".tabs-header"),this.tabsContent=this.shadowRoot.querySelector(".tabs-content"))}connectedCallback(){this.renderTabs()}renderTabs(){!this.tabsHeader||!this.tabsContent||(this.tabsHeader.innerHTML="",this.tabsContent.innerHTML="",Array.from(this.children).forEach((e,r)=>{if(e.tagName.toLowerCase()==="s-tab"){const s=e,i=document.createElement("button");if(i.classList.add("tab-button"),i.textContent=s.title,i.addEventListener("click",()=>this.selectTab(r)),!this.tabsHeader)return;this.tabsHeader.appendChild(i);const d=document.createElement("div");for(d.classList.add("tab-content");e.firstChild;)d.appendChild(e.firstChild);if(!this.tabsContent)return;this.tabsContent.appendChild(d)}}),this.selectTab(0))}selectTab(e){if(!this.tabsHeader||!this.tabsContent)return;const r=this.tabsHeader.querySelectorAll(".tab-button"),s=this.tabsContent.querySelectorAll(".tab-content");r.forEach((i,d)=>{i.classList.toggle("active",d===e)}),s.forEach((i,d)=>{i.classList.toggle("active",d===e)})}}customElements.define("s-tabs",a)}function v(n){class t extends HTMLElement{constructor(){super()}get title(){return this.getAttribute("title")??""}}customElements.define("s-tab",t)}function g(n){const t=document.createElement("template");t.innerHTML=`
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
    `;class a extends HTMLElement{constructor(){super();c(this,"tableHeader",null);c(this,"tableBody",null);this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.adoptedStyleSheets=[n],this.shadowRoot.appendChild(t.content.cloneNode(!0)),this.tableHeader=this.shadowRoot.querySelector("#table-header"),this.tableBody=this.shadowRoot.querySelector("#table-body"),console.log("STable constructor"))}set data(e){e&&e.headers&&e.rows&&this.renderTable(e)}renderTable(e){this.renderTableHeader(e.headers),this.renderTableBody(e.rows)}renderTableHeader(e){this.tableHeader&&(this.tableHeader.innerHTML="",e.forEach(r=>{const s=document.createElement("th");s.textContent=r,this.tableHeader&&this.tableHeader.appendChild(s)}))}renderTableBody(e){this.tableBody&&(this.tableBody.innerHTML="",e.forEach(r=>{const s=document.createElement("tr");r.forEach(i=>{const d=document.createElement("td");d.textContent=i.toString(),s.appendChild(d)}),this.tableBody&&this.tableBody.appendChild(s)}))}}customElements.define("s-table",a)}function w(n){const t=document.createElement("template");t.innerHTML=`
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
          background-color: var(--background-color);
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow);
          max-width: 500px;
          width: 100%;
          color: var(--text-color);
        }

        #modal-header {
            display:flex;
            justify-content: space-between;
          border-top-left-radius: var(--border-radius);
          border-top-right-radius: var(--border-radius);
          background-color: var(--secondary-color);
          color: var(--secondary-text-color);
        }

        #modal-header, #modal-body, #modal-footer {   
            padding: var(--spacing);
            border-bottom: var(--border-width) solid var(--secondary-border-color);
        }

        #modal-title {
          margin: 0;
        }

        .close-button {
          float: right;
          cursor: pointer;
          align-self: center;
          font-size: 1.5rem;
        }
      </style>
         <div class="modal-content">
            <header id="modal-header">
                <h3 id="modal-title"></h3>
                <span class="close-button">&times;</span>
            </header>
            <div id="modal-body">
                <slot></slot>
            </div>
            <footer id="modal-footer"></footer>
        </div>
    `;class a extends HTMLElement{constructor(){super();c(this,"_modalVisible",!1);if(this.attachShadow({mode:"open"}),!this.shadowRoot)return;this.shadowRoot.adoptedStyleSheets=[n],this.shadowRoot.appendChild(t.content.cloneNode(!0));const e=this.shadowRoot.querySelector(".close-button");e&&e.addEventListener("click",()=>this.hide())}static get observedAttributes(){return["visible","title","footer"]}connectedCallback(){this.hasAttribute("visible")&&(this._modalVisible=!0),this._updateRendering(),this.updateTitle(),this.updateFooter()}attributeChangedCallback(e,r,s){e==="visible"?(this._modalVisible=s!==null,this._updateRendering()):e==="title"?this.updateTitle():e==="footer"&&this.updateFooter()}updateTitle(){if(!this.shadowRoot)return;const e=this.getAttribute("title"),r=this.shadowRoot.querySelector("#modal-title");if(!r)return;const s=this.querySelector('template[slot="title"]');if(s){const i=s.content.cloneNode(!0);r.innerHTML="",r.appendChild(i),r.style.display="block"}else r.innerHTML=e?`${e}`:"",r.style.display=e?"block":"none"}updateFooter(){if(!this.shadowRoot)return;const e=this.getAttribute("footer"),r=this.shadowRoot.querySelector("#modal-footer"),s=this.querySelector('template[slot="footer"]');if(s){const i=s.content.cloneNode(!0);r.innerHTML="",r.appendChild(i),r.style.display="block"}else r.innerHTML=e?`<footer>${e}</footer>`:"",r.style.display=e?"block":"none"}show(){this._modalVisible=!0,this._updateRendering(),this.setAttribute("visible","")}hide(){this._modalVisible=!1,this._updateRendering(),this.removeAttribute("visible")}_updateRendering(){this.shadowRoot&&(this.style.display=this._modalVisible?"flex":"none")}}customElements.define("s-modal",a)}function S(){return fetch("./theme.css").then(n=>n.text()).then(n=>{const t=new CSSStyleSheet;t.replaceSync(n),b(t),p(t),m(t),f(t),y(t),v(),g(t),w(t)})}document.addEventListener("DOMContentLoaded",()=>{S().then(()=>{const n=document.querySelector("s-table");if(n){const t={headers:["Name","Age","City"],rows:[["Alice",30,"New York"],["Bob",25,"San Francisco"],["Charlie",35,"London"]]};n.data=t}})});
