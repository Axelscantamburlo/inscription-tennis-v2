import React, { useState, useEffect, useContext, useMemo } from "react";

// CONTEXT
import { AllDataSchedules } from "../../../context/AllDataSchedules";
// FUNCTION
import {
  getPlayeurInscription,
  findPriceToPay,
} from "../../../functions/getPlayeurInscription";
import { useSelector } from "react-redux";

export default function PlayeurRegistedInfo({ playeurInfo }) {
  const { name, birthDay, level, isPayed } = playeurInfo;

  const { loadedData } = useContext(AllDataSchedules);
  // Appel d'une fonction externe pour récupérer les horaires d'inscriptions du joueur et les affichées
  const [playeurInscription, setPlayeurInscription] = useState([]);
  const [priceToPay, setPriceToPay] = useState("");
  useEffect(() => {
    const playExternFunction = async () => {
      const inscriptions = await getPlayeurInscription(loadedData, name);
      const price = findPriceToPay(inscriptions, level);
      setPlayeurInscription(inscriptions);
      setPriceToPay(price);
    };
    playExternFunction();
  }, []);
  console.log(playeurInscription);
  return (
    <div className="playeur-card">
      <h2>{name.toUpperCase()}</h2>
      {playeurInscription.length === 0 && <p>Pas inscrit</p>}
      {playeurInscription.map((inscription, index) => {
        return (
          <div key={index}>
            <p>
              Inscription: {inscription.day} de {inscription.startHour} à{" "}
              {inscription.endHour}
            </p>
          </div>
        );
      })}
      {isPayed ? <p>Payé</p> : <p>Prix à payer: {priceToPay}</p>}
    </div>
  );
}
