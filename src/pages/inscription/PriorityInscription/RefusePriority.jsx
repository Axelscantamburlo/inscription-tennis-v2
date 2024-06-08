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
    <div className="confirmation-modal-container">
      <div className="card" style={{ padding: "50px" }}>
        <p>Etes vous certain de vouloir refuser ce créneau ?</p>
        <div className="buttons" style={{ marginTop: "30px" }}>
          <button
            className="cancel-button"
            onClick={() => setOpenModal2(false)}
          >
            Annuler
          </button>
          <button className="confirm-button" onClick={handleConfirm}>
            Oui, refuser
          </button>
        </div>
      </div>
    </div>
  );
}
