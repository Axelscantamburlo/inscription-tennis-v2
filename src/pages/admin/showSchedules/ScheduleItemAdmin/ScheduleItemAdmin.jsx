import React, { useState } from "react";

// COMPONENT
import AddPlayeurModal from "../addPlayeurModal/AddPlayeurModal";
import InfoPlayeurModal from "../InfoPlayeurModal/InfoPlayeurModal";
import DeletePlayeurModal from "../deletePlayeurModal/DeletePlayeurModal";

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
  const [showAddPlayeurModal, setShowAddPlayeurModal] = useState(false);
  const [showInfoPlayeurModal, setShowInfoPlayeurModal] = useState(false);
  const [showDeletePlayeurModal, setDeletePlayeurModal] = useState(false);

  const [playeurClick, setPlayeurClick] = useState("");
  return (
    <>
      <div className="one-schedule">
        <h2>
          {day} de {startHour} à {endHour}
        </h2>
        <h2>
          {educator} {level} {playedForm}
        </h2>
        <table style={{ background: "green" }}>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index}>
                <td
                  style={{ background: "pink", height: "20px" }}
                  onClick={() =>
                    item
                      ? (setShowInfoPlayeurModal(true), setPlayeurClick(item))
                      : setShowAddPlayeurModal(true)
                  }
                >
                  {item}
                </td>
                {item && (
                  <h6
                    onClick={() => {
                      setDeletePlayeurModal(true);
                      setPlayeurClick(item);
                    }}
                  >
                    Icon
                  </h6>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAddPlayeurModal && (
        <AddPlayeurModal
          uid={uid}
          usersRegisted={usersRegisted}
          numberOfPlaces={numberOfPlaces}
        />
      )}
      {showInfoPlayeurModal && <InfoPlayeurModal playeurClick={playeurClick} />}
      {showDeletePlayeurModal && (
        <DeletePlayeurModal playeurToDelete={playeurClick} uid={uid} />
      )}
    </>
  );
}
