import React, { useContext, useEffect, useState } from "react";
// COMPONENT
import RegisterNewPlayer from "./modal/RegisterNewPlayeur";
import RegisterPlayeurModal from "./RegisterPlayeurModal";
// FIREBASE
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../config/firebase-config";
// CONTEXT
import { UidUserConnected } from "../../../context/UidUserConnected";
import { AllDataSchedules } from "../../../context/AllDataSchedules";



export default function RegisterPlayeur() {
  const { uid } = useContext(UidUserConnected);
  
  const [playeurInfoToMap, setPlayeurInfoToMap] = useState([]);

  const [propsToPass, setPropsToPass] = useState([])
  
  useEffect(() => {
    const loadDataUsers = async () => {
      if (uid) {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPlayeurInfoToMap(docSnap.data().playeurInfo);
          setPropsToPass(docSnap.data().playeurNames)
        } else {
          console.log("No such document!");
        }
      }
    };
    loadDataUsers();
  }, [uid]);





  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };




  return (
    <div className="register-playeur-container">
      <h1>Inscrire un joueur</h1>
      <div className="add-playeur-button" onClick={handleOpenModal}>
        <button>+</button>
      </div>
      <div style={{ color: "white", display: "flex" }}>
        {playeurInfoToMap?.length > 0 &&
          playeurInfoToMap.map((playeur, index) => {
            return (
              <RegisterPlayeurModal key={index} playeurInfo={playeur}/>
            );
          })}
      </div>
      {openModal && (
        <div className="modal">
          <RegisterNewPlayer playeursNames={propsToPass} />
        </div>
      )}
    </div>
  );
}


// TODO: creer un onClick pour afficher le prix et les horaires d'inscriptions dans RegisterPlayeur.js 
