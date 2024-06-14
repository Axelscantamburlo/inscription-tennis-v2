import React, { useEffect, useContext, useState } from "react";

// FIREBASE
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../config/firebase-config";
// CONTEXT
import { AllDataSchedules } from "../../../../../context/AllDataSchedules";
// FUNCTIONS
import { findPriceToPay } from "../../../../../functions/getPlayeurInscription";
import { usePlayeurInscription } from "../../../../../hooks/usePlayeurInscription";

export default function InfoUserTab3({
  infoPlayeurClick,
  playeurClick,
  setShowModal2,
}) {
  // const { loadedData } = useContext(AllDataSchedules);
  const {
    name,
    uid,
    level,
    isPayed,
    pricePay,
  } = infoPlayeurClick[0] || {};
  console.log(infoPlayeurClick[0]);
  const [price, setPrice] = useState("");
  console.log(price);
  const playeurInscriptions = usePlayeurInscription(playeurClick);
  useEffect(() => {
    if (level || playeurInscriptions.length > 0) {
      const price = findPriceToPay(playeurInscriptions, level);
      setPrice(price);
    }
  }, [infoPlayeurClick, playeurClick]);
  // const {closeModal2} = useModal()
  const handleConfirmPaiement = async () => {
    if (uid) {
      // Vérifie si uid existe
      const usersRef = doc(db, "users", uid);
      const userDoc = await getDoc(usersRef);
      setShowModal2(false);

      if (userDoc.exists()) {
        const updatedPlayeurInfo = userDoc.data().playeurInfo.map((info) =>
          info.name === name
            ? {
                ...info,
                isPayed: !info.isPayed,
                pricePay: info.isPayed === true ? null : price,
              }
            : info
        );

        await updateDoc(usersRef, { playeurInfo: updatedPlayeurInfo });
      }
    }
  };


  function extractBeforeSlash(inputString) {
    const parts = inputString.split('/');
    return parts[0]; // Retourne la partie de la chaîne avant le '/'
  }
  
 

  return (
    <div className="tab-container tab-container-3">
      {isPayed ? (
        <>
          <div className="text-container">
            <h1>Prix payé: </h1>
            <h4>{pricePay ? `${extractBeforeSlash(pricePay)}€` : "Pas renseigné"}</h4>
          </div>
          
          <button className="submit-btn" onClick={handleConfirmPaiement}>
            Annuler le paiement
          </button>
        </>
      ) : (
        <>
          <h2>
            <span style={{ color: "var(--blue-color)" }}>Prix à payer:</span>{" "}
            {price ? `${extractBeforeSlash(price)}€` : "Pas renseigné"}{" "}
          </h2>
          <button className="submit-btn" onClick={handleConfirmPaiement}>
            Valider le paiement
          </button>
        </>
      )}
    </div>
  );
}
