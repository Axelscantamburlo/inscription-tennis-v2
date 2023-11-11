import React, { useContext, useEffect, useState } from "react";

// COMPONENT
import RegisterPlayeurModal from "./modal/RegiserPlayeurModal";

// FIREBASE

import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../config/firebase-config";
// CONTEXT
import { UidUserConnected } from "../../../context/UidUserConnected";
import { AllDataSchedules } from "../../../context/AllDataSchedules";
// REDUX
import { useSelector } from "react-redux";

export default function RegisterPlayeur() {
  const { uid } = useContext(UidUserConnected);
  const { loadedData } = useContext(AllDataSchedules);

  const [playeurInfoToMap, setPlayeurInfoToMap] = useState([]);

  useEffect(() => {
    const loadDataUsers = async () => {
      if (uid) {
        const docRef = doc(db, "users", uid);
        console.log(docRef);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPlayeurInfoToMap(docSnap.data().playeurInfo);
        } else {
          console.log("No such document!");
        }
      }
    };

    loadDataUsers();
  }, [uid]);

  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="register-playeur-container">
      <h1>Inscrire un joueur</h1>
      <div className="add-playeur-button" onClick={() => setOpenModal(true)}>
        <button>+</button>
      </div>
      <div style={{ color: "white", display: "flex" }}>
        {playeurInfoToMap?.length > 0 &&
          playeurInfoToMap.map((playeur, index) => {
            const { name, birthDay, email, inscriptions, level, phone } =
              playeur;
            return (
              <div key={index}>
                <h2>{name}</h2>
                <h2>{birthDay}</h2>
                <h2>{level}</h2>
                <h2>{phone}</h2>
                {inscriptions.map((inscription) => (
                  <h2>{inscription}</h2>
                ))}
              </div>
            );
          })}
      </div>
      {openModal && (
        <div className="modal">
          <RegisterPlayeurModal />
        </div>
      )}
    </div>
  );
}
