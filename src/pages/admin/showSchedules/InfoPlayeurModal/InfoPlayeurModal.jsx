import React, { useState, useEffect } from "react";

// COMPONENT
import InfoUserTab1 from "./InfoUserTab1/InfoUserTab1";
import InfoUserTab2 from "./InfoUserTab2/InfoUserTab2";
import InfoUserTab3 from "./InfoUserTab3/InfoUserTab3";

// FIREBASE
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../../config/firebase-config";

export default function InfoPlayeurModal({ playeurClick }) {


  const [activeTab, setActiveTab] = useState(1)

  // Mettre dans le state infoUserCLick les info de l'user cliqué par l'admin qui sont recup de firebase
  const [infoUserClick, setInfoUserClick] = useState([]);
  const { level } = infoUserClick;

  useEffect(() => {
    const findInfoPlayeurClick = async () => {
      const q = query(
        collection(db, "users"),
        where("playeurNames", "array-contains", playeurClick)
      );

      const querySnapshot = await getDocs(q);
      const playeurInfoArr = [];
      querySnapshot.forEach((doc) => {
        const playeurInfo = doc.data().playeurInfo;
        const index = playeurInfo.findIndex(
          (info) => info.name === playeurClick
        );
        if (index !== -1) {
          playeurInfoArr.push(playeurInfo[index]);
        }
      });
      setInfoUserClick(playeurInfoArr);
    };
    findInfoPlayeurClick();
  }, [playeurClick]);


  return (
    <div className="info-playeur-modal-container">
      <div className="tab-buttons">
        <button onClick={() => setActiveTab(1)}>Onglet 1</button>
        <button onClick={() => setActiveTab(2)}>Onglet 2</button>
        <button onClick={() => setActiveTab(3)}>Onglet 3</button>
      </div>
      {activeTab === 1 && <InfoUserTab1 infoUserClick={infoUserClick} />}
      {activeTab === 2 && <InfoUserTab2 playeurClick={playeurClick} />}
      {activeTab === 3 && <InfoUserTab3 level={level} playeurClick={playeurClick} />}
    </div>
  );
}
