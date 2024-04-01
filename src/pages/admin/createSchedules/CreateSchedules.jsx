import React, { useContext, useState } from "react";

// COMPONENT
import NavBar from "../navBar/NavBar";
import CreateScheduleModal from "./CreateScheduleModal/CreateScheduleModal";
import EditScheduleModal from "./EditScheduleModal/EditScheduleModal";
import DeleteScheduleModal from "./DeleteScheduleModal/DeleteScheduleModal";

// CONTEXT
import { AllDataSchedules } from "../../../context/AllDataSchedules";
import { useModal } from "../../../context/ModalContext";
// FUNCTION
import { convertLevelToColor, convertLevelToWord } from "../../../functions/convertLevelToWord";

export default function CreateSchedules() {
  const { loadedData } = useContext(AllDataSchedules);

  // const [editScheduleModal, setEditScheduleModal] = useState(false)
  // const [deleteScheduleModal, setDeleteScheduleModal] = useState(false)
  const [scheduleClick, setScheduleClick] = useState({});


  const [openModal0, setOpenModal0] = useState(false)
  const [openModal1, setOpenModal1] = useState(false)
  const [openModal2, setOpenModal2] = useState(false)
  const handleButtonClick = (button, schedule) => {
    setScheduleClick({ ...schedule });
    button === 'edit' ? setOpenModal1(true) : setOpenModal2(true);
  };

  return (
    <div className="create-schedules-container">
      <NavBar toggleClassName={2} />

     
      <div className="schedules-container">
        {loadedData.map((schedule, index) => {
          const {
            day,
            startHour,
            endHour,
            level,
            numberOfPlaces,
            educator,
            playedForm,
            uid,
          } = schedule;
          return (
            <div className="schedule-card" key={index}>
              <div className="contents">
              <div className="content">
                <span>Jour: </span>
                <span>{day}</span>
              </div>
              <div className="content">
                <span>Horaires :</span>
                <span>De {startHour} à {endHour}</span>
              </div>
              <div className="content">
                <span>Niveau : </span>
                <span style={{color: convertLevelToColor(level)}}> {convertLevelToWord(level)}</span>
              </div>
              <div className="content">
                <span>Nombre de places :</span>
                <span>{numberOfPlaces}</span>
              </div>
              <div className="content">
                <span>Formule : </span>
                <span>{playedForm === "0" ? "Classique" : "Forme jouée"}</span>
              </div>
              <div className="content">
                <span>Enseignant</span>
                <span>{educator}</span>
              </div>
              </div>
              
              

              <div className="buttons">
              <button className="confirm-button" onClick={() => handleButtonClick('edit', schedule)}>
                  Modifier
                </button>
                <button className="cancel-button" onClick={() => handleButtonClick('delete', schedule)}>
                  Supprimer
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <button className="submit-btn" onClick={() => setOpenModal0(true)}>
        Ajouter un créneau
      </button>
      {openModal0 &&  <CreateScheduleModal setOpenModal0={setOpenModal0}/>}
      {openModal1 && <EditScheduleModal scheduleClick={scheduleClick} setOpenModal1={setOpenModal1} />}
      {openModal2 && <DeleteScheduleModal scheduleClick={scheduleClick} setOpenModal2={setOpenModal2}/>}
    </div>
  );
}
