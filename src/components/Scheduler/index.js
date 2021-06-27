import { Inject, Day, Week, WorkWeek, Month, Agenda, ScheduleComponent, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons'

const Scheduler = () => {
  
  return(
    <>
    <ScheduleComponent currentView="Month">
      <ViewsDirective>
          <ViewDirective option='Day'/>
          <ViewDirective option='Week'/>
          <ViewDirective option='WorkWeek'/>
          <ViewDirective option='Month'/>
      </ViewsDirective>
      <Inject services = {[Day, Week, WorkWeek, Month, Agenda]} />
    </ScheduleComponent>
    </>
  );
}

export default Scheduler
