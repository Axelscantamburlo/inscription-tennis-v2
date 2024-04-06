import React, { useState } from "react";

// COMPONENT
import AddPlayeurModal from "../addPlayeurModal/AddPlayeurModal";
import InfoPlayeurModal from "../InfoPlayeurModal/InfoPlayeurModal";
import DeletePlayeurModal from "../deletePlayeurModal/DeletePlayeurModal";

// CONTEXT
import { useModal } from "../../../../context/ModalContext";
// FUNCTION
import {
  convertLevelToWord,
  convertLevelToColor,
} from "../../../../functions/convertLevelToWord";

// ICONS
import { FaTrash } from "react-icons/fa";


export default function ScheduleItemAdmin({ schedule }) {
  const {
    day,
    startHour,
    endHour,
    educator,
    numberOfPlaces,
    level,
    playedForm,
    usersRegisted,
    uid,
  } = schedule;

  // Calculer le nombre de places restantes
  const remainingPlaces = numberOfPlaces - usersRegisted.length;

  // Créer un tableau avec les éléments de usersRegisted et des cases vides
  const tableData = Array.from(usersRegisted).concat(
    Array(remainingPlaces).fill("")
  );

  // state pour les modal
  const [modal1, setShowModal1] = useState(false);
  const [modal2, setShowModal2] = useState(false);
  const [modal3, setShowModal3] = useState(false);
  // const {modal1, modal2, modal3, openModal1, openModal2, openModal3} = useModal()
  // console.log(showInfoPlayeurModal);
  const [playeurClick, setPlayeurClick] = useState("");

  return (
    <>  
      <div className="schedule-card">
        <div className="header-card">
          <h2>
            {day} de {startHour} à {endHour}
          </h2>
          <div>
            <p>{educator}</p>
            <p>{convertLevelToWord(level)}</p>
            <p>{playedForm === "0" ? "Classique" : "Forme jouée"}</p>
          </div>
        </div>
        <table style={{backgroundColor: convertLevelToColor(level)}}>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index} style={item ? {padding: "15px 5px"} : {height: "50px"}}>
                <td
                  onClick={() =>
                    item
                      ? (setShowModal2(true), setPlayeurClick(item))
                      : setShowModal1(true)
                  }
                  
                >
                  {item}
                </td>
                {item && (
                  <span
                    onClick={() => {
                      setShowModal3(true);
                      setPlayeurClick(item);
                    }}
                  >
                    <FaTrash />
                  </span>
                  
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal1 && (
        <AddPlayeurModal
          uid={uid}
          usersRegisted={usersRegisted}
          numberOfPlaces={numberOfPlaces}
          setShowModal1={setShowModal1}
        />
      )}
      {modal2 && (
        <InfoPlayeurModal
          playeurClick={playeurClick}
          setShowModal2={setShowModal2}
        />
      )}
      {modal3 && (
        <DeletePlayeurModal
          playeurToDelete={playeurClick}
          uid={uid}
          setShowModal3={setShowModal3}
          schedule={schedule}
        />
      )}
    </>
  );
}
