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
    howManyTimePaiement,
    typePaiement,
  } = infoPlayeurClick[0] || {};
  const [price, setPrice] = useState("");

  const playeurInscriptions = usePlayeurInscription(playeurClick);

  useEffect(() => {
    if (level) {
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
                typePaiement:
                  info.isPayed === false ? selectedMethodPaiement : null,
                howManyTimePaiement:
                  info.isPayed === false ? selectedHowManyTimePaiement : null,
                pricePay: info.isPayed === false ? price : null,
              }
            : info
        );

        await updateDoc(usersRef, { playeurInfo: updatedPlayeurInfo });
      }
    }
  };

  // toggle style
  const [selectedMethodPaiement, setSelectedMethodPaiement] = useState(null);
  const [selectedHowManyTimePaiement, setSelectedHowManyTimePaiement] =
    useState(null);

  return (
    <div className="tab-container tab-container-3">
      {isPayed ? (
        <>
          <div className="text-container">
            <h1>Prix payé: </h1>
            <h4>{pricePay ? `${pricePay}€` : "Pas renseigné"}</h4>
          </div>
          <div className="text-container">
            <h3>Moyen de paiement:</h3>
            <h4>{typePaiement ? typePaiement : "Pas renseigné"}</h4>
          </div>
          <div className="text-container">
            <h3>Paiement en: </h3>
            <h4>
              {howManyTimePaiement ? howManyTimePaiement : "Pas renseigné"}
            </h4>
          </div>
          <button className="submit-btn" onClick={handleConfirmPaiement}>
            Annuler le paiement
          </button>
        </>
      ) : (
        <>
          <h2>
            <span style={{ color: "var(--blue-color)" }}>Prix à payer:</span>{" "}
            {price ? `${price}€` : "Pas renseigné"}{" "}
          </h2>
          {/* <div className="buttons-container">
            <h2>Moyen de paiement:</h2>
            <div className="buttons">
              {["CB", "Chèque", "Autre"].map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedMethodPaiement(item)}
                  style={
                    selectedMethodPaiement === item
                      ? {
                          background: "var(--background-color)",
                          color: "var(--grey-color)",
                        }
                      : null
                  }
                >
                  {item}
                </button>
              ))}
            </div>
          </div> */}
          {/* <div className="buttons-container">
            <h2>Paiement en:</h2>
            <div className="buttons">
              {["1x", "3x", "10x"].map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedHowManyTimePaiement(item)}
                  style={
                    selectedHowManyTimePaiement === item
                      ? {
                          background: "var(--background-color)",
                          color: "var(--grey-color)",
                        }
                      : null
                  }
                >
                  {item}
                </button>
              ))}
            </div>
          </div> */}
          <button className="submit-btn" onClick={handleConfirmPaiement}>
            Valider le paiement
          </button>
        </>
      )}
    </div>
  );
}
