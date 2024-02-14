import React, { useState, useEffect, useContext } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../../config/firebase-config";
import InfoUserTab1 from "./InfoUserTab1/InfoUserTab1";
import InfoUserTab2 from "./InfoUserTab2/InfoUserTab2";
import InfoUserTab3 from "./InfoUserTab3/InfoUserTab3";
// import { closeModal } from "../../../../functions/closeModal";
import { useModal } from "../../../../context/ModalContext";
import { AllDataUsers } from "../../../../context/AllDataUsers";

export default function InfoPlayeurModal({ playeurClick, setShowModal2 }) {
  const [activeTab, setActiveTab] = useState(1);


  const { usersData } = useContext(AllDataUsers);
  const [infoPlayeurClick, setInfoPlayeurClick] = useState([]);

  useEffect(() => {
    const info = usersData.filter((user) => user.name == playeurClick);

    if(info) {
      setInfoPlayeurClick(info)
    }
  }, []);

  return (
    <div className="info-playeur-modal-container">
      <button onClick={() => setShowModal2(false)}>x</button>
      <div className="tab-buttons">
        {[1, 2, 3].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}>
            Onglet {tab}
          </button>
        ))}
      </div>
      {activeTab === 1 && <InfoUserTab1 infoPlayeurClick={infoPlayeurClick} />}
      {activeTab === 2 && <InfoUserTab2 playeurClick={playeurClick} />}
      {activeTab === 3 && <InfoUserTab3 infoPlayeurClick={infoPlayeurClick} setShowModal2={setShowModal2} />}
    </div>
  );
}
