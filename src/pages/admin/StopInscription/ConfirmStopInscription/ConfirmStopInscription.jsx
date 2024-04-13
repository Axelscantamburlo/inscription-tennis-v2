import React from "react";
// FIREBASE
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../config/firebase-config";

const ConfirmStopInscription = ({ setOpenModal, endInscription, setEndInscription, title }) => {
  const handleConfirm = async () => {
    const endInscriptionRef = doc(db, "admin", "endInscription");

    await updateDoc(endInscriptionRef, {
        endInscription: !endInscription,
    });
    setOpenModal(false)
    setEndInscription(!endInscription)
  };
  return (
    <div className="confirmation-modal-container">
      <div className="card">
        <h1
          className="title"
          style={{ color: "var(--red-color)", margin: "10px 0" }}
        >
          {title} les inscriptions
        </h1>
        <p>Êtes-vous certain de vouloir arrêter les inscriptions.</p>
        <div className="buttons">
          <button className="cancel-button" onClick={() => setOpenModal(false)}>
            Annuler
          </button>
          <button className="confirm-button" onClick={handleConfirm}>
            Valider
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmStopInscription;
