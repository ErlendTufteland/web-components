interface TableData {
  headers: string[];
  rows: (string | number)[][];
}

function defineSTableComponent(themeStyles: CSSStyleSheet) {
  const tableTemplate = document.createElement("template");
  tableTemplate.innerHTML = `
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
    `;

  class STable extends HTMLElement {
    tableHeader: HTMLElement | null = null;
    tableBody: HTMLElement | null = null;

    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      if (!this.shadowRoot) return;
      this.shadowRoot.adoptedStyleSheets = [themeStyles];
      this.shadowRoot.appendChild(tableTemplate.content.cloneNode(true));
      this.tableHeader = this.shadowRoot.querySelector("#table-header");
      this.tableBody = this.shadowRoot.querySelector("#table-body");
      console.log("STable constructor");
    }

    set data(data: TableData) {
      if (data && data.headers && data.rows) {
        this.renderTable(data);
      }
    }

    renderTable(data: TableData) {
      this.renderTableHeader(data.headers);
      this.renderTableBody(data.rows);
    }

    renderTableHeader(headers: string[]) {
      if (!this.tableHeader) return;
      this.tableHeader.innerHTML = "";
      headers.forEach((header) => {
        const th = document.createElement("th");
        th.textContent = header;
        if (!this.tableHeader) return;
        this.tableHeader.appendChild(th);
      });
    }

    renderTableBody(rows: (string | number)[][]) {
      if (!this.tableBody) return;
      this.tableBody.innerHTML = "";
      rows.forEach((row) => {
        const tr = document.createElement("tr");
        row.forEach((cell) => {
          const td = document.createElement("td");
          td.textContent = cell.toString();
          tr.appendChild(td);
        });

        if (!this.tableBody) return;
        this.tableBody.appendChild(tr);
      });
    }
  }

  customElements.define("s-table", STable);
}
