import React from "react";
import { firebaseUpdateSchedulesDb } from "../../../functions/firebaseUpdateSchedulesdb";
import { useNavigate } from "react-router-dom";

export default function RefusePriority({ setOpenModal2, dataPlayeur, uid }) {
  const navigate = useNavigate();
  const handleConfirm = async () => {
    navigate("/inscrire-un-joueur");
    await firebaseUpdateSchedulesDb(uid, dataPlayeur, "arrayRemove");
  };
  return (
    <div className="confirmation-modal-container" style={{backgroundColor: 'white'}}>
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
