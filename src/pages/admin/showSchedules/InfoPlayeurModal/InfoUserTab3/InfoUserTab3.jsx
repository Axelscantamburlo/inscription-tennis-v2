import React, { useEffect, useContext, useState } from "react";

// FIREBASE
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../config/firebase-config";
// CONTEXT
import { AllDataSchedules } from "../../../../../context/AllDataSchedules";
import { useModal } from "../../../../../context/ModalContext";
// FUNCTIONS
import {
  getPlayeurInscription,
  findPriceToPay,
} from "../../../../../functions/getPlayeurInscription";

export default function InfoUserTab3({ infoPlayeurClick, setShowModal2 }) {
  const { loadedData } = useContext(AllDataSchedules);
  const { name, uid, level, isPayed, pricePay, howManyTimePaiement, typePaiement } = infoPlayeurClick[0];
  const [price, setPrice] = useState("");

  useEffect(() => {
    const playExternFunction = async () => {
      const inscriptions = await getPlayeurInscription(loadedData, name);
      const price = findPriceToPay(inscriptions, level);
      setPrice(price);
    };
    playExternFunction();
  }, [infoPlayeurClick]);

// const {closeModal2} = useModal()
  const handleConfirmPaiement = async () => {
    setShowModal2(false)
    const usersRef = doc(db, "users", uid);
    const userDoc = await getDoc(usersRef);

    if (userDoc.exists()) {
      const updatedPlayeurInfo = userDoc.data().playeurInfo.map((info) =>
        info.name === name
          ? {
              ...info,
              isPayed: !info.isPayed,
              typePaiement: info.isPayed === false ? selectedMethodPaiement : null,
              howManyTimePaiement: info.isPayed === false ? selectedHowManyTimePaiement : null,
              pricePay: info.isPayed === false ? price : null,
            }
          : info
      );

      await updateDoc(usersRef, { playeurInfo: updatedPlayeurInfo });
    }
  };


  // toggle style
  const [selectedMethodPaiement, setSelectedMethodPaiement] = useState(null);
  const [selectedHowManyTimePaiement, setSelectedHowManyTimePaiement] =
    useState(null);

  return (
    <div>
      {isPayed ? (
        <div>
          <h1>Prix payé: {pricePay}</h1>
          <h5>moyen de paiement: {typePaiement}</h5>
          <h5>Paiement en: {howManyTimePaiement}</h5>
          <button onClick={handleConfirmPaiement}>Annuler le paiement</button>
        </div>
      ) : (
        <div>
          <h2>Prix à payer {price}</h2>
          <div>
            <h2>Moyen de paiement:</h2>
            {["CB", "Chèque", "Autre"].map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedMethodPaiement(item)}
                style={
                  selectedMethodPaiement === item ? { background: "red" } : null
                }
              >
                {item}
              </button>
            ))}
          </div>
          <div>
            <h2>Paiement en:</h2>
            {["1x", "3x", "10x"].map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedHowManyTimePaiement(item)}
                style={
                  selectedHowManyTimePaiement === item
                    ? { background: "red" }
                    : null
                }
              >
                {item}
              </button>
            ))}
          </div>
          <button onClick={handleConfirmPaiement}>Valider le paiement</button>
        </div>
      )}
    </div>
  );
}

