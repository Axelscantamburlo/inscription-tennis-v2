import React, { useContext, useState } from "react";

// COMPONENT
import NavBar from "../navBar/NavBar";
import CreateScheduleModal from "./CreateScheduleModal/CreateScheduleModal";
import EditScheduleModal from "./EditScheduleModal/EditScheduleModal";
import DeleteScheduleModal from "./DeleteScheduleModal/DeleteScheduleModal";

// CONTEXT
import { AllDataSchedules } from "../../../context/AllDataSchedules";
import { useModal } from "../../../context/ModalContext";

export default function CreateSchedules() {
  const { loadedData } = useContext(AllDataSchedules);

  const convertLevelToWord = (level) => {
    const levelMap = {
      0: "Blanc",
      1: "Violet",
      2: "Rouge",
      3: "Orange",
      4: "Vert",
      5: "Jaune",
    };

    return levelMap[level] || "Inconnu";
  };

  // const [editScheduleModal, setEditScheduleModal] = useState(false)
  // const [deleteScheduleModal, setDeleteScheduleModal] = useState(false)
  const [scheduleClick, setScheduleClick] = useState({});

  const { modal1, openModal1, modal2, openModal2 } = useModal();

  // const handleButtonClick = (button, schedule) => {
  //   setScheduleClick({...schedule})
  //   if(button === 'edit') {
  //     setEditScheduleModal(true)
  //   } else if(button === 'delete') {
  //     setDeleteScheduleModal(true)
  //   }
  // }
  return (
    <div>
      <NavBar toggleClassName={2} />

      <CreateScheduleModal />
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
          <div
            style={{ display: "flex", justifyContent: "space-around" }}
            key={index}
          >
            <span>{day}</span>
            <span>
              {startHour} à {endHour}
            </span>
            <span>Niveau: {convertLevelToWord(level)}</span>
            <span>{numberOfPlaces}</span>
            <span>{playedForm === "0" ? "Classique" : "Forme jouée"}</span>
            <span>{educator}</span>

            <button
              onClick={() => {
                openModal1();
                 setScheduleClick({ ...schedule });
              }}
            >
              Modifier
            </button>
            <button
              onClick={() => {
                openModal2();
                 setScheduleClick({ ...schedule });
              }}
            >
              Supprimer
            </button>
          </div>
        );
      })}
      {modal1 && <EditScheduleModal scheduleClick={scheduleClick} />}
      {modal2 && <DeleteScheduleModal uid={scheduleClick.uid} />}
    </div>
  );
}
