import React, { useContext, useState } from "react";

// NavBar
import NavBar from "../navBar/NavBar";
// CONTEXT
import { AllDataSchedules } from "../../../context/AllDataSchedules";
// COMPONENT
import ScheduleItemAdmin from "./ScheduleItemAdmin/ScheduleItemAdmin";
import FilterSchedules from "./filterSchedules/FilterSchedules";

export default function ShowAllSchedules() {
  const { loadedData } = useContext(AllDataSchedules);
  const [filterData, setFilterData] = useState([]);
  const handleFilterData = (sortedSchedules) => {
    setFilterData(sortedSchedules);
  };

  return (
    <div className="show-all-schedules-container">
      <NavBar toggleClassName={1} />
      <FilterSchedules
        handleFilterData={handleFilterData}
        loadedData={loadedData}
      />
      <div className="schedules-container">
        {filterData?.map((schedule, index) => (
          <>
            <ScheduleItemAdmin schedule={schedule} key={index} />
          </>
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
