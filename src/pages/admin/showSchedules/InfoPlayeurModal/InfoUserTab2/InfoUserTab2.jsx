import React, { useState, useEffect, useContext } from "react";

// CONTEXT
import { usePlayeurInscription } from "../../../../../hooks/usePlayeurInscription";
// FUNCTIONS

import { formatDate } from "../../../../../functions/formatDate";
import { findPriceToPay } from "../../../../../functions/getPlayeurInscription";

export default function InfoUserTab2({ infoPlayeurClick, playeurClick}) {
  const {name, level, dateInscription} = infoPlayeurClick[0] || {};
  const playeurInscriptions = usePlayeurInscription(playeurClick);
  const [formule, setFormule] = useState("");
  useEffect(() => {
    if(level || playeurInscriptions.length > 0) {
      const formule = findPriceToPay(playeurInscriptions, level);
      setFormule(formule);
    }
  }, [infoPlayeurClick]);

  function extractAfterSlash(inputString) {
    if(inputString) {
      const parts = inputString.split('/');
      if (parts.length > 1) {
        return parts[1]; // Retourne la partie de la chaîne après le '/'
      }
      return 'Erreur'; 
    }

  }
  return (
    <div className="tab-container">
      <div className="text-container">
        <h3>Formule : </h3>
        <h4>{extractAfterSlash(formule)}</h4>
      </div>
      <div className="text-container">
        <h3>Date inscription :</h3>
        {dateInscription ? (
          <h4>{formatDate(dateInscription)}</h4>
        ) : (
          <h4>Pas renseigné</h4>
        )}
      </div>
      <div className="text-container">
        <h3>Inscription(s) : </h3>
        {playeurInscriptions.length === 0 && <h4>Pas inscrit</h4>}
        {playeurInscriptions?.map((inscription, index) => {
          const { startHour, endHour, day } = inscription;
          return (
            <h4 key={index}>
              {day} de {startHour} à {endHour}
            </h4>
          );
        })}
      </div>
    </div>
  );
}
