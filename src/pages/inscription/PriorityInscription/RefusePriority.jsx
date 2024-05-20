import React from "react";
import { firebaseUpdateSchedulesDb } from "../../../functions/firebaseUpdateSchedulesdb";
import { useNavigate } from "react-router-dom";

export default function RefusePriority({ setOpenModal2, name, uid }) {
  const navigate = useNavigate();
  const handleConfirm = async () => {
    navigate("/inscrire-un-joueur");
    await firebaseUpdateSchedulesDb(uid, name, "arrayRemove", null);
  };
  return (
    <div className="confirmation-modal-container">
      <div className="card">
        <p>Etes vous sur de vouloir refuser ce créneau ?</p>
      </div>
      <div className="buttons">
        <button className="cancel-button" onClick={() => setOpenModal2(false)}>
          Annuler
        </button>
        <button className="confirm-button" onClick={handleConfirm}>
          Confirmer
        </button>
      </div>
    </div>
  );
}
