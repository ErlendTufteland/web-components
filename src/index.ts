import { defineWebComponents } from "./web-components/index";
import { SMessagesElement } from "./web-components/s-messages";
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

    const messageBox = document.getElementById(
      "messageBox"
    ) as SMessagesElement;
    if(messageBox) {
      messageBox.showMessage("Submission successful!", "success");
      messageBox.showMessage("An error occurred!", "error");
      messageBox.showMessage("Please check your input.", "warning");
    }


  });
});

function triggerMessage(type: "success" | "error" | "warning"): void {
  console.log("triggerMessage");
  const messageBox = document.getElementById(
    "messageBox"
  ) as SMessagesElement;
  if(messageBox) {
    if(type === "success") {
      messageBox.showMessage("Submission successful!", type);
    }
    if(type === "error") {
      messageBox.showMessage("An error occurred!", type);
    }
    if(type === "warning") {
      messageBox.showMessage("Please check your input.", type);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("successButton")
    ?.addEventListener("click", () => triggerMessage("success"));
  document
    .getElementById("warningButton")
    ?.addEventListener("click", () => triggerMessage("warning"));
  document
    .getElementById("dangerButton")
    ?.addEventListener("click", () => triggerMessage("error"));
});


document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("myCheckbox")?.addEventListener("change", (event: Event) => {
    console.log("Checkbox state:", (event as CustomEvent).detail); // true or false
  });
});