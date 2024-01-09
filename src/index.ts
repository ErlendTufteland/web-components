import { defineWebComponents } from "./web-components/index";
import { TableData } from "./web-components/s-table";

document.addEventListener("DOMContentLoaded", () => {
  defineWebComponents().then(() => {
    const tableElement = document.querySelector(
      "s-table"
    ) as HTMLTableElement & {
      data: TableData;
    };
    if (tableElement) {
      const tableData: TableData = {
        headers: ["Name", "Age", "City"],
        rows: [
          ["Alice", 30, "New York"],
          ["Bob", 25, "San Francisco"],
          ["Charlie", 35, "London"],
        ],
      };
      tableElement.data = tableData;
    }
  });
});
