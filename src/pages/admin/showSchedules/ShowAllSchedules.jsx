import React, { useContext, useState } from "react";

// NavBar
import NavBar from "../navBar/NavBar";
// CONTEXT
import { AllDataSchedules } from "../../../context/AllDataSchedules";
// COMPONENT
import ScheduleItemAdmin from "./ScheduleItemAdmin/ScheduleItemAdmin";

export default function ShowAllSchedules() {
  const { loadedData } = useContext(AllDataSchedules);
  const [sortBy, setSortBy] = useState("day");

  const sortedSchedules = loadedData?.sort((a, b) => {
    if (sortBy === "day") {
      const daysOrder = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
      return daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day);
    } else if (sortBy === "level") {
      const levelOrder = ['0', '1', '2', '3', '4', '5', '6'];
      // console.log(levelOrder.indexOf(a.level) - levelOrder.indexOf(b.level));
      return levelOrder.indexOf(a.level) - levelOrder.indexOf(b.level);
    }
  });

  return (
    <div className="show-all-schedules-container">
      <NavBar toggleClassName={1} />
      <select style={{marginTop: '70px'}} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="day">Trier par jour</option>
        <option value="level">Trier par niveau</option>
      </select>
      <div className="schedules-container">
      {sortedSchedules?.map((schedule, index) => (
          <div key={index}>
            {/* {index === 0 || schedule.day !== sortedSchedulesByDay[index - 1].day ? (
              <h1>{schedule.day}</h1>
            ) : null} */}
            <ScheduleItemAdmin schedule={schedule} />
          </div>
        ))}
      </div>
    </div>
  );
}


  // return (
  //   <div className="show-all-schedules-container">
  //     <NavBar toggleClassName={1} />
  //     <div className="schedules-container">
  //     {sortedSchedulesByDay?.map((schedule, index) => (
  //         <div key={index}>
  //           {index === 0 || schedule.day !== sortedSchedulesByDay[index - 1].day ? (
  //             <h1>{schedule.day}</h1>
  //           ) : null}
  //           <ScheduleItemAdmin schedule={schedule} />
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );