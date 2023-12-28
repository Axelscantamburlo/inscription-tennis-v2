import React, { useContext } from "react";

// NavBar
import NavBar from "../navBar/NavBar";
// CONTEXT
import { AllDataSchedules } from "../../../context/AllDataSchedules";
import ScheduleItemAdmin from "./ScheduleItemAdmin/ScheduleItemAdmin";

export default function ShowAllSchedules() {
  const { loadedData } = useContext(AllDataSchedules);
  return (
    <div className="show-all-schedules-container" style={{ display: "flex" }}>
      <NavBar toggleClassName={1} />
      {loadedData?.map((schedule, index) => (
      
        <ScheduleItemAdmin schedule={schedule} key={index}/>
      ))}
    </div>
  );
}
