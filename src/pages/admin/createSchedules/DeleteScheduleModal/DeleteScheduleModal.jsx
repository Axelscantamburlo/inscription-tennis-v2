import React from "react";
// FIREBASE
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../config/firebase-config";

// CONTEXT

export default function DeleteScheduleModal({
  scheduleClick,
  setOpenModal2,
  path,
}) {
  const { day, startHour, endHour, uid } = scheduleClick;
  const handleSubmit = async () => {
    setOpenModal2(false);
    await deleteDoc(doc(db, path, uid));
  };

  return (
    <div className="confirmation-modal-container">
      <div className="card">
        <h1
          className="title"
          style={{ color: "var(--background-color)", margin: "10px 0" }}
        >
          Supprimer un créneau
        </h1>
        <p>
          Êtes-vous certain de vouloir retirer le créneau du {day} de{" "}
          {startHour} à {endHour}
        </p>

        <div className="buttons">
          <button
            className="cancel-button"
            onClick={() => setOpenModal2(false)}
          >
            Annuler
          </button>
          <button className="confirm-button" onClick={handleSubmit}>
            Valider
          </button>
        </div>
      </div>
    </div>
  );
}
