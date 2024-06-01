import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import React from "react";
import { db } from "../../../../../../config/firebase-config";
import { useNavigate } from "react-router-dom";

export default function ConfirmInscriptionTest({
  setOpenModal,
  testChoose,
  name,
}) {
  const navigate = useNavigate();
  const handleConfirm = async () => {
    const { usersRegisted, numberOfPlaces, uid } = testChoose;
    if (usersRegisted.length < numberOfPlaces) {
      const docRef = doc(db, "test-schedules", uid);

      // Set the "capital" field of the city 'DC'
      await updateDoc(docRef, {
        usersRegisted: arrayUnion(name),
      });
    } else {
      navigate("/inscrire-un-joueur");
    }
  };
  return (
    <div className="confirmation-modal-container">
      <div className="card">
        <h1
          className="title"
          style={{ color: "var(--background-color)", margin: "10px 0" }}
        >
          Confirmer l'inscription au test
        </h1>
        <p>Confirmez votre inscription au test pour le créneau suivant :</p>
        <h2>{testChoose.date}</h2>
        <p style={{ color: "var(--red-color)", maxWidth: "70%" }}>
          Attention : Cette action est irréversible et aucune modification ne
          sera possible par la suite.
        </p>
        <div className="buttons">
          <button className="cancel-button" onClick={() => setOpenModal(false)}>
            Annuler
          </button>
          <button className="confirm-button" onClick={handleConfirm}>
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
}
