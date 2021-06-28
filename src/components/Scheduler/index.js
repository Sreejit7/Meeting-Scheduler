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
  Agenda
} from "@syncfusion/ej2-react-schedule";
import { extend, createElement } from "@syncfusion/ej2-base";
import emailjs from 'emailjs-com';
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
    if (e.type === "QuickInfo" || (e.data && Object.keys(e.data).length > 0)) {
      let Data = [];
      Data.push(e.data);
      this.scheduleObj.saveEvent(Data);
      localStorage.setItem("allEvents", JSON.stringify(this.scheduleData));
      this.sendEmail(e.data.Emails, new Date(e.data.StartTime.getTime() - e.data.StartTime.getTimezoneOffset()*60*1000), new Date(e.data.EndTime), e.data.Subject);
    }
    console.log(e);
  };

  sendEmail = (email, start, end, subject) => {
    emailjs.send('service_8tjeee9','template_udf9dgo', {email, start, end, subject}, 'user_K6Qa3TxsyrpO8CVAX1JCW')
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
    }, (error) => {
        console.log('FAILED!', error.message);
    });
  }
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
          currentView="Month"
        >
          <ViewsDirective>
            <ViewDirective option="Day" />
            <ViewDirective option="Week" />
            <ViewDirective option="WorkWeek" />
            <ViewDirective option="Month" />
            <ViewDirective option="Agenda" />
          </ViewsDirective>
          <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
      </>
    );
  }
}
export default Scheduler;
