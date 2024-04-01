import React, { useState, useEffect } from "react";


// FUNCTIONS
import { firebaseUpdateSchedulesDb } from '../../../../functions/firebaseUpdateSchedulesdb';

export default function DeletePlayeurModal({ uid, playeurToDelete, setShowModal3, schedule }) {
  const handleConfirm = async () => {

    setShowModal3(false)
    await firebaseUpdateSchedulesDb(uid, playeurToDelete, 'arrayRemove');
  };

  const {day, startHour, endHour} = schedule

  return (
    <div className="confirmation-modal-container">

      <div className="card">
      <h1 className="title" style={{color: 'var(--background-color)', margin: '10px 0'}}>Supprimer un joueur</h1>
      <p>Êtes-vous certain de vouloir retirer <span style={{fontWeight: 'bold', color: 'var(--blue-color)'}}>{playeurToDelete}</span>  le {day} de {startHour} à {endHour}</p>
      <div className="buttons">
      <button className="cancel-button" onClick={() => setShowModal3(false)}>Annuler</button>
      <button className="confirm-button" onClick={handleConfirm}>Valider</button>
      </div>
      </div>
    </div>
  );
}
