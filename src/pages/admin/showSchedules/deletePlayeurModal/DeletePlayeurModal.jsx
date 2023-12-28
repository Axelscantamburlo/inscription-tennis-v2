import React, { useState, useEffect } from "react";

//FIREBASE
import { db } from "../../../../config/firebase-config";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  query,
  updateDoc,
  where,
  getDocs,
} from "firebase/firestore";

// FUNCTIONS
import { firebaseUpdateSchedulesDb } from '../../../../functions/firebaseUpdateSchedulesdb';

export default function DeletePlayeurModal({ uid, playeurToDelete }) {
  const handleConfirm = async () => {

    await firebaseUpdateSchedulesDb(uid, playeurToDelete, 'arrayRemove');

  };

  return (
    <div className="delete-playeur-modal-container">
      <button>Annuler</button>
      <button onClick={handleConfirm}>Valider</button>
    </div>
  );
}
