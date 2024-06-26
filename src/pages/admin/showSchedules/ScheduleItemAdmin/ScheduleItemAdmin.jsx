import React, { useState, useContext } from "react";

// COMPONENT
import AddPlayeurModal from "../addPlayeurModal/AddPlayeurModal";
import InfoPlayeurModal from "../InfoPlayeurModal/InfoPlayeurModal";
import DeletePlayeurModal from "../deletePlayeurModal/DeletePlayeurModal";

// CONTEXT
// FUNCTION
import {
  convertLevelToWord,
  convertLevelToColor,
} from "../../../../functions/convertLevelToWord";

// ICONS
import { FaTrash } from "react-icons/fa";
import { AllDataUsers } from "../../../../context/AllDataUsers";

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
    acceptProposition
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
        <table style={{ backgroundColor: convertLevelToColor(level) }}>
          <tbody>
             
            {tableData.map((item, index) => {
             
              return(
                <tr key={index}  style={{ height: "50px" }}>
                
                <td
               style={{
                color: acceptProposition.includes(item.name) ? 'green' : null
              }}
                  className="item"
                  onClick={() =>
                    item
                      ? (setShowModal2(true), setPlayeurClick(item))
                      : setShowModal1(true)
                  }
                >
                  {item.name}
                </td>
                <td className="birthDay no-print">
                  {item.birthDay ? item.birthDay.slice(0, 4) : ""}
                </td>
                {item && (
                  <td
                    className="icon no-print"
                    onClick={() => {
                      setShowModal3(true);
                      setPlayeurClick(item);
                    }}
                  >
                    <FaTrash />
                  </td>
                )}
              </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {modal1 && (
        <AddPlayeurModal
          uid={uid}
          usersRegisted={usersRegisted}
          numberOfPlaces={numberOfPlaces}
          level={level}
          setShowModal1={setShowModal1}
        />
      )}
      {modal2 && (
        <InfoPlayeurModal
          playeurClick={playeurClick.name.toLowerCase().trim()}
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

