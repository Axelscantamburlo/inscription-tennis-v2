import React, { useState, useEffect } from "react";


// FUNCTIONS
import { firebaseUpdateSchedulesDb } from '../../../../functions/firebaseUpdateSchedulesdb';

export default function DeletePlayeurModal({ uid, playeurToDelete, setShowModal3 }) {
  const handleConfirm = async () => {

    await firebaseUpdateSchedulesDb(uid, playeurToDelete, 'arrayRemove');

  };

  return (
    <div className="delete-playeur-modal-container">
      <button onClick={() => setShowModal3(false)}>Annuler</button>
      <button onClick={handleConfirm}>Valider</button>
    </div>
  );
}
