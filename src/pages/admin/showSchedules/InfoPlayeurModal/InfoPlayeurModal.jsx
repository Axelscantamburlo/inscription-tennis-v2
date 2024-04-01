import React, { useState, useEffect, useContext } from "react";
// FIREBASE
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../../config/firebase-config";
// COMPONENTS
import InfoUserTab1 from "./InfoUserTab1/InfoUserTab1";
import InfoUserTab2 from "./InfoUserTab2/InfoUserTab2";
import InfoUserTab3 from "./InfoUserTab3/InfoUserTab3";

// CONTEXT
import { useModal } from "../../../../context/ModalContext";
import { AllDataUsers } from "../../../../context/AllDataUsers";

export default function InfoPlayeurModal({ playeurClick, setShowModal2 }) {
  const [activeTab, setActiveTab] = useState(0);
  
  const { usersData } = useContext(AllDataUsers);
  const [infoPlayeurClick, setInfoPlayeurClick] = useState([]);
  
  useEffect(() => {
    const info = usersData.filter((user) => user.name == playeurClick);

    if (info) {
      setInfoPlayeurClick(info);
    }
  }, []);

  return (
    <div className="register-playeur-modal-container responsive-container">
      <div className="box responsive-box">
      <button className="close-modal" onClick={() => setShowModal2(false)}>
        x
      </button>
        <div className="tab-buttons">
          <ul>
            {['Renseignements', 'Inscriptions', 'Paiement'].map((tab, index) => (
              <li
                className={activeTab === index ? "underlign" : null}
                key={tab}
                onClick={() => setActiveTab(index)}
              >
                {tab}
              </li>
            ))}
          </ul>
        </div>
        {activeTab === 0 && (
          <InfoUserTab1 infoPlayeurClick={infoPlayeurClick} />
        )}
        {activeTab === 1 && <InfoUserTab2 playeurClick={playeurClick} dateInscription={infoPlayeurClick[0].dateInscription} />}
        {activeTab === 2 && (
          <InfoUserTab3
            infoPlayeurClick={infoPlayeurClick}
            setShowModal2={setShowModal2}
          />
        )}
      </div>
    </div>
  );
}
