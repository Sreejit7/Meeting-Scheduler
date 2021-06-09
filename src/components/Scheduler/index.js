import { Inject, Day, Week, WorkWeek, Month, Agenda, ScheduleComponent } from '@syncfusion/ej2-react-schedule';

const Scheduler = () => {
  return(
    <ScheduleComponent currentView="Month">
      <Inject services = {[Day, Week, WorkWeek, Month, Agenda]} />
    </ScheduleComponent>
  );
}

export default Scheduler
