import React from 'react'
// FIREBASE
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../../../config/firebase-config';

export default function DeletePlayeurInfoModal({setOpenModal, playeurInfo}) {
  const {name, uid} = playeurInfo
  const handleConfirm = async () => {
    setOpenModal(false)
    return await deleteDoc(doc(db, "users", uid));
  }
  return (
    <div className="confirmation-modal-container">
    <div className="card">
      <h1
        className="title"
        style={{ color: "var(--background-color)", margin: "10px 0" }}
      >
        Supprimer un joueur
      </h1>
      <p>
        Êtes-vous certain de vouloir retirer{" "}
        <span
          style={{
            fontWeight: "bold",
            color: "var(--blue-color)",
            textTransform: "uppercase",
          }}
        >
          {name}
        </span>{" "}
      </p>
      <div className="buttons">
        <button
          className="cancel-button"
          onClick={() => setOpenModal(false)}
        >
          Annuler
        </button>
        <button className="confirm-button" onClick={handleConfirm}>
          Valider
        </button>
      </div>
    </div>
  </div>
  )
}
