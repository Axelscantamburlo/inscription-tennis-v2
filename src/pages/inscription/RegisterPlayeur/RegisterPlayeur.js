import React, { useContext, useEffect, useState } from "react";
// COMPONENT
import RegisterNewPlayer from "./modal/RegisterNewPlayeur";
import PlayeurRegistedInfo from "./PlayeurRegistedInfo";
import LogoutButton from "../../connexion/Logout/LogoutButton";
// FIREBASE
import { getDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../config/firebase-config";
// CONTEXT
import { UidUserConnected } from "../../../context/UidUserConnected";
//ICONS
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RegisterPlayeur() {
  const navigate = useNavigate();
  const { uid } = useContext(UidUserConnected);

  const [playeurInfoToMap, setPlayeurInfoToMap] = useState([]);

  const [propsToPass, setPropsToPass] = useState([]);
  const [endInscription, setEndInscription] = useState(true);

  const [errorMessage, setErrorMesage] = useState("");

  const getEndInscriptionState = async () => {
    const adminDocRef = doc(db, "admin", "endInscription");
    const adminDocSnap = await getDoc(adminDocRef);

    if (adminDocSnap.exists()) {
      setEndInscription(adminDocSnap.data().endInscription);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
    const unsub = onSnapshot(doc(db, "admin", "endInscription"), (doc) => {
      setEndInscription(doc.data().endInscription);
    });
  };
  useEffect(() => {
    const loadDataUser = async () => {
      if (uid) {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPlayeurInfoToMap(docSnap.data().playeurInfo);
          setPropsToPass(docSnap.data().playeurNames);
        } else {
          console.log("No such document!");
        }
      }
    };
    

    const fetchData = async () => {
      await loadDataUser();
      await getEndInscriptionState();
    };

    fetchData();
  }, [uid]);

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="register-playeur-container">
      <div className="header">
        <IoIosInformationCircleOutline
          className="info-icon"
          style={{ opacity: "0" }}
          // onClick={() => navigate("/informations-inscription")}
        />
        <h1 className="title">Vos pré-inscriptions</h1>
        <LogoutButton />
      </div>
      <div className="card-container">
        {playeurInfoToMap?.length > 0 &&
          playeurInfoToMap.map((playeur, index) => {
            return <PlayeurRegistedInfo key={index} playeurInfo={playeur} />;
          })}
      </div>
      <h3 className="warning-message">
        Merci de venir au club dans les 7 jours suivants votre pré-inscription
        afin de finaliser votre dossier par le paiement. Hors ce délai de 7
        jours, votre pré-inscription sera automatiquement annulée.
      </h3>
      <div
        className="add-playeur-button"
        onClick={() =>
          !endInscription
            ? setOpenModal(true)
            : setErrorMesage("Les inscriptions sont fermées")
        }
      >
        <button
          style={!endInscription ? {} : { opacity: "0.5", cursor: "no-drop" }}
        >
          Ajouter un membre
        </button>
      </div>

      {openModal && (
        <RegisterNewPlayer
          playeurNames={propsToPass}
          setOpenModal={setOpenModal}
        />
      )}
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
}
