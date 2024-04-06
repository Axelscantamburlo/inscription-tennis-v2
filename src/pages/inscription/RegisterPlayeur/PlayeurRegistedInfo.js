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

  return (
    <div className="playeur-card">
      <h2>{name.toUpperCase()}</h2>
      <h2>Inscription(s) :</h2>
      {playeurInscription.length === 0 && <p className="p-style">Pas inscrit</p>}
      {playeurInscription?.map((inscription, index) => {
        return (
            <p className="p-style" key={index}>
               {inscription.day} de {inscription.startHour} à {inscription.endHour}
            </p>
        );
      })}
      {isPayed ? <p style={{color: 'green', fontWeight: 'bold'}}>Payé</p> : <p>Prix à payer: {priceToPay}€</p>}
    </div>
  );
}
