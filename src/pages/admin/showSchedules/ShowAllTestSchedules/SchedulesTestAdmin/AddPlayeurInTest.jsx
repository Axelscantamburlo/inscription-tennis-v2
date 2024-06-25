import React, { useState, useEffect, useContext } from "react";
import { db } from "../../../../../config/firebase-config";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

export default function AddPlayeurInTest({ uid, setOpenModal }) {
  const [nameEnter, setNameEnter] = useState("");

  const handleConfirm = async (e) => {
    e.preventDefault();
    setOpenModal(false);

    if (nameEnter) {
      const docRef = doc(db, "test-schedules", uid);

      // Set the "capital" field of the city 'DC'
      await updateDoc(docRef, {
        usersRegisted: arrayUnion(nameEnter),
      });
    }
  };

  return (
    <div className="confirmation-modal-container">
      <form className="card responsive-card" onSubmit={handleConfirm}>
        <h1
          className="title"
          style={{ color: "var(--background-color)", margin: "10px 0" }}
        >
          Ajouter un joueur
        </h1>
        <div
          className="inputs"
          style={{ width: "90%", display: "flex", flexDirection: "column" }}
        >
          <input
            style={{ width: "100%" }}
            type="text"
            name=""
            onChange={(e) => setNameEnter(e.target.value)}
            placeholder="Nom et prénom"
            value={nameEnter}
          />
        </div>
        <div className="buttons">
          <button
            type="submit"
            className="cancel-button"
            onClick={() => setOpenModal(false)}
          >
            Annuler
          </button>
          <button type="submit" className="confirm-button">
            Valider
          </button>
        </div>
      </form>
    </div>
  );
}
