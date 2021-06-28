import * as React from "react";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Inject,
  ViewsDirective,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";
import { extend, createElement } from "@syncfusion/ej2-base";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import "./index.css";

class Scheduler extends React.Component {
  constructor() {
    super(...arguments);
    var allEvents = JSON.parse(localStorage.getItem("allEvents"));
    this.scheduleData = allEvents || [];
    this.data = extend([], this.scheduleData, null, true);
  }

  onPopupOpen(args) {
    if (args.type === "Editor") {
      if (!args.element.querySelector(".custom-field-row")) {
        let row = createElement("div", { className: "custom-field-row" });
        let formElement = args.element.querySelector(".e-schedule-form");
        formElement.firstChild.insertBefore(
          row,
          formElement.firstChild.firstChild
        );
        let container = createElement("div", {
          className: "custom-field-container",
        });
        let labelInputEle = createElement("label", {
          className: "e-field-label",
          attrs: { name: "Email Label" },
        });
        labelInputEle.innerHTML = "Send Emails to ";
        container.appendChild(labelInputEle);
        let inputEle = createElement("input", {
          className: "e-field",
          attrs: { name: "Emails", type: "email" },
        });
        container.appendChild(inputEle);
        row.appendChild(container);
        inputEle.setAttribute("name", "Emails");
        inputEle.setAttribute("type", "email");
      }
    }
  }
  onPopupClose = (e) => {
    if (e.type === "DeleteAlert") {
      this.scheduleObj.deleteEvent(e.data.Id);
      localStorage.setItem("allEvents", JSON.stringify(this.scheduleData));
    }
    if (e.type === "QuickInfo" || Object.keys(e.data).length > 0) {
      let Data = [];
      Data.push(e.data);
      this.scheduleObj.saveEvent(Data);
      localStorage.setItem("allEvents", JSON.stringify(this.scheduleData));
    }
  };
  render() {
    return (
      <>
        <ScheduleComponent
          ref={(t) => (this.scheduleObj = t)}
          width="100%"
          height="550px"
          selectedDate={new Date()}
          eventSettings={{ dataSource: this.scheduleData }}
          popupOpen={this.onPopupOpen.bind(this)}
          enablePersistence={true}
          popupClose={this.onPopupClose.bind(this)}
        >
          <ViewsDirective>
            <ViewDirective option="Day" />
            <ViewDirective option="Week" />
            <ViewDirective option="WorkWeek" />
            <ViewDirective option="Month" />
          </ViewsDirective>
          <Inject services={[Day, Week, WorkWeek, Month]} />
        </ScheduleComponent>
      </>
    );
  }
}
export default Scheduler;
