import React, { useState } from "react";

// FIREBASE
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../config/firebase-config";

// FUNCTIONS
import { firebaseUpdateSchedulesDb } from '../../../../functions/firebaseUpdateSchedulesdb';

export default function AddPlayeurModal({uid,usersRegisted,numberOfPlaces, setShowModal1}) {
  const [nameEnter, setNameEnter] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (usersRegisted.length < numberOfPlaces) {

      await firebaseUpdateSchedulesDb(uid, nameEnter, 'arrayUnion');

    }
  };
  return (
    <div className="add-playeur-modal-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name=""
          onChange={(e) => setNameEnter(e.target.value)}
        />
        <button type="submit">Valider</button>
        <button onClick={() => setShowModal1(false)}>Annuler</button>
      </form>
    </div>
  );
}
