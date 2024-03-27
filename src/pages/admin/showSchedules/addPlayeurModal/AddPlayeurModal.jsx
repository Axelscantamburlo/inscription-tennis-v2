import React, { useState } from "react";

// FIREBASE
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../config/firebase-config";

// FUNCTIONS
import { firebaseUpdateSchedulesDb } from "../../../../functions/firebaseUpdateSchedulesdb";

export default function AddPlayeurModal({
  uid,
  usersRegisted,
  numberOfPlaces,
  setShowModal1,
}) {
  const [nameEnter, setNameEnter] = useState("");
  const [errorMessage, setErrorMessage] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowModal1(false)
    if (nameEnter.trim() !== "" && usersRegisted.length < numberOfPlaces) {
      await firebaseUpdateSchedulesDb(uid, nameEnter, "arrayUnion");
    } 

  };
  return (
    <div className="confirmation-modal-container">
      <form className="card responsive-card" onSubmit={handleSubmit}>
        <h1
          className="title"
          style={{ color: "var(--background-color)", margin: "10px 0" }}
        >
          Ajouter un joueur
        </h1>
        <div className="inputs" style={{ width: "90%" }}>
          <input
            style={{ width: "100%" }}
            type="text"
            name=""
            onChange={(e) => setNameEnter(e.target.value)}
          />
        </div>
        {errorMessage && <span className="error-message">{errorMessage}</span>}
        <div className="buttons">
          <button
          type="submit"
            className="cancel-button"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="confirm-button"
          >
            Valider
          </button>
        </div>
      </form>
    </div>
  );
}
