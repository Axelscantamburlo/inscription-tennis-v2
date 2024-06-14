import React, { useState, useEffect, useContext, useMemo } from "react";

// CONTEXT
import { AllDataSchedules } from "../../../context/AllDataSchedules";
// FUNCTION
import {
  getPlayeurInscription,
  findPriceToPay,
} from "../../../functions/getPlayeurInscription";
import { useSelector } from "react-redux";
import { usePlayeurInscription } from "../../../hooks/usePlayeurInscription";

export default function PlayeurRegistedInfo({ playeurInfo }) {
  const { name, birthDay, level, isPayed } = playeurInfo;
console.log(level);
  const [playeurInscription, setPlayeurInscription] = useState([]);
  const [priceToPay, setPriceToPay] = useState("");

  const playeurInscriptions = usePlayeurInscription(name);
  const price = findPriceToPay(playeurInscriptions, level);

  useEffect(() => {
    setPlayeurInscription(playeurInscriptions);
    setPriceToPay(price);
  }, []);

  function extractBeforeSlash(inputString) {
    const parts = inputString.split('/');
    return parts[0]; // Retourne la partie de la chaîne avant le '/'
  }
  

  return (
    <div className="playeur-card">
      <h2>{name}</h2>
      <h2>Inscription(s) :</h2>
      {playeurInscription.length === 0 && (
        <p className="p-style">Pas inscrit</p>
      )}
      {playeurInscription?.map((inscription, index) => {
        return (
          <p className="p-style" key={index}>
            {inscription.day} de {inscription.startHour} à {inscription.endHour}
          </p>
        );
      })}
      {isPayed ? (
        <p style={{ color: "green", fontWeight: "bold" }}>Payé</p>
      ) : (
        <p>Prix à payer: {extractBeforeSlash(priceToPay)}€ + adhésion</p>
      )}
    </div>
  );
}
