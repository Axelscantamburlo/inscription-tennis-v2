import React, { useContext, useState } from "react";
import { firebaseUpdateSchedulesDb } from "../../../functions/firebaseUpdateSchedulesdb";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPlayeurInfo } from "../../../redux/actions";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase-config";
import { UidUserConnected } from "../../../context/UidUserConnected";

export default function RefusePriority({ setOpenModal2, dataPlayeur, uidSchedule }) {
  const navigate = useNavigate();
const dispatch = useDispatch()
  const playeurInfo = useSelector((state) => state.user);
  const { uid } = useContext(UidUserConnected);

  const [playeurInfoState, setPlayeurInfoState] = useState({
    ...playeurInfo,
    // isPayed: false,

    dateInscription: new Date(),
  });
  console.log(dataPlayeur);
  const handleConfirm = async () => {
    navigate("/emettre-un-souhait");
    await firebaseUpdateSchedulesDb(uidSchedule, dataPlayeur, "arrayRemove");
    // const userRef = doc(db, "users", uid);
    // if (userRef) {
    //   await updateDoc(userRef, {
    //     playeurInfo: arrayUnion(playeurInfoState),
    //     playeurNames: arrayUnion(playeurInfoState.name),
    //   });
    //   dispatch(setPlayeurInfo({}));
    //   return navigate("/emettre-un-souhait", { state: { isRegisted: true } });
    // }
    // localStorage.removeItem("persist:root");
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
