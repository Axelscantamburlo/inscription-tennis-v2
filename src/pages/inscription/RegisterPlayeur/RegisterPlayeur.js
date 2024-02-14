import React, { useContext, useEffect, useState } from "react";
// COMPONENT
import RegisterNewPlayer from "./modal/RegisterNewPlayeur";
import PlayeurRegistedInfo from "./PlayeurRegistedInfo";
// FIREBASE
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../config/firebase-config";
// CONTEXT
import { UidUserConnected } from "../../../context/UidUserConnected";
import {useSelector} from 'react-redux'


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
      <div className="card-container">
        {playeurInfoToMap?.length > 0 &&
          playeurInfoToMap.map((playeur, index) => {
            return (
              <PlayeurRegistedInfo key={index} playeurInfo={playeur}/>
            );
          })}
      </div>
      <div className="add-playeur-button" onClick={handleOpenModal}>
        <button>Ajouter</button>
      </div>
      {openModal && (
        <div className="modal">
          <RegisterNewPlayer playeursNames={propsToPass} />
        </div>
      )}
    </div>
  );
}
