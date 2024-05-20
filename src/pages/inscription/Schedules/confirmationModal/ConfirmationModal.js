import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { setPlayeurInfo } from "../../../../redux/actions";

//FIREBASE
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../../../config/firebase-config";

//CONTEXT
import { UidUserConnected } from "../../../../context/UidUserConnected";
import { AllDataSchedules } from "../../../../context/AllDataSchedules";

// FUNCTIONS
import { firebaseUpdateSchedulesDb } from "../../../../functions/firebaseUpdateSchedulesdb";

export default function ConfirmationModal({ setOpenModal, isPriority }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Récupérer l'uid de l'utilisateur connecté
  const { uid } = useContext(UidUserConnected);
  const { loadedData } = useContext(AllDataSchedules);

  // récucpérer les infos de l'utilisateur (son niveau)
  const playeurInfo = useSelector((state) => state.user);
  //  const [playeurInfoState, setPlayeurInfoState] = useState({...playeurInfo, inscriptions: [], priceToPay: '', isStillRegisted: true})
  const [playeurInfoState, setPlayeurInfoState] = useState({
    ...playeurInfo,
    isPayed: false,

    dateInscription: new Date(),
  });

  const { name, level, birthDay } = playeurInfoState;
  console.log(birthDay);
  // récupérer le store redux pour vérifier si l'utilisateur à bien choisi une horaire
  const inscriptions = useSelector((state) => state.schedule);
  const isPlayeurAlreadyRegisted = loadedData.some((data) =>
    data.usersRegisted?.map((user) => user.name.toLowerCase()).includes(name)
  );

  const handleConfirm = async () => {
    for (const key in inscriptions) {
      if (inscriptions[key]) {
        const { usersRegisted, numberOfPlaces, uid } = inscriptions[key];
        if (
          usersRegisted.length < numberOfPlaces &&
          !isPlayeurAlreadyRegisted &&
          !isPriority
        ) {
          await firebaseUpdateSchedulesDb(uid, name, "arrayUnion", birthDay);
        } else if (!isPriority) {
          navigate("/inscrire-un-joueur");
        }
      }
    }
    const userRef = doc(db, "users", uid);
    if ((userRef && !isPlayeurAlreadyRegisted) || isPriority) {
      await updateDoc(userRef, {
        playeurInfo: arrayUnion(playeurInfoState),
        playeurNames: arrayUnion(name),
      });
      dispatch(setPlayeurInfo({}));
      return navigate("/emettre-un-souhait", { state: { isRegisted: true } });
    }
    localStorage.removeItem("persist:root");
  };

  const [schedulesChoose, setSchedulesChoose] = useState([]);
  useEffect(() => {
    const selectedSchedules = Object.values(inscriptions)
      .filter((schedule) => schedule && Object.keys(schedule).length > 0)
      .map(
        (schedule) =>
          `${schedule.day} de ${schedule.startHour} à ${schedule.endHour}`
      );

    setSchedulesChoose(selectedSchedules);
  }, []);

  return (
    <div className="confirmation-modal-container">
      <div className="card">
        <h1
          className="title"
          style={{ color: "var(--background-color)", margin: "10px 0" }}
        >
          Confirmer l'inscription
        </h1>
        <p>Confirmez votre inscription pour le(s) créneau(x) suivant(s) :</p>
        {schedulesChoose.map((schedule, index) => (
          <h2 style={{ fontWeight: "bold" }} key={index}>
            {schedule}
          </h2>
        ))}
        <p style={{ color: "var(--red-color)", maxWidth: "70%" }}>
          Attention : Cette action est irréversible et aucune modification ne
          sera possible par la suite.
        </p>
        <div className="buttons">
          <button className="cancel-button" onClick={() => setOpenModal(false)}>
            Annuler
          </button>
          <button className="confirm-button" onClick={handleConfirm}>
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
}
