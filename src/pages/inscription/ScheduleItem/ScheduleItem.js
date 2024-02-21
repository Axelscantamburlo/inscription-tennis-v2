import React, { useState } from "react";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { selectSchedule, setPlayeurInfo } from "../../../redux/actions";

export default function ScheduleItem({ schedule, path }) {
  const dispatch = useDispatch();
  // const [isSelected, setIsSelected] = useState(false);

  const { day, startHour, endHour, numberOfPlaces, usersRegisted, uid } =
    schedule;

  const handleChooseSchedule = () => {
    dispatch(selectSchedule(schedule, path));
    // setIsSelected(true);
  };
  const { selectedScheduleFirst, selectedScheduleSecond, selectedScheduleThird } = useSelector((state) => state.schedule);
  const isSelected = (selectedSchedule, uid) => {
    return selectedSchedule !== null && selectedSchedule.uid === uid;
  };
  return (
    <div
    style={isSelected(selectedScheduleFirst, uid) || isSelected(selectedScheduleSecond, uid) || isSelected(selectedScheduleThird, uid) ? { border: "4px solid green" } : null}
      className="schedule-card"
    >
      <h2>
        {day} de {startHour} à {endHour}
      </h2>
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${(usersRegisted.length / numberOfPlaces) * 100}%` }}
        ></div>
      </div>
      <div className="bottom-card">
        <p>{numberOfPlaces - usersRegisted.length} places disponnibles</p>
        <button style={numberOfPlaces - usersRegisted.length === 0 ? {opacity: '0.5'} : null} onClick={() => numberOfPlaces - usersRegisted.length !== 0 && handleChooseSchedule()}>
          Choisir cette heure
        </button>
      </div>
    </div>
  );
}
