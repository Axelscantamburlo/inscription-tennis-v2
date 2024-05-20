import React, { useState, useEffect, useContext } from "react";

// CONTEXT
import { usePlayeurInscription } from "../../../../../hooks/usePlayeurInscription";
// FUNCTIONS

import { formatDate } from "../../../../../functions/formatDate";

export default function InfoUserTab2({ playeurClick, dateInscription }) {
  const playeurInscription = usePlayeurInscription(playeurClick);

  return (
    <div className="tab-container">
      <div className="text-container">
        <h3>Formule : </h3>
        {playeurInscription.length === 0 ? (
          <h3>Pas inscrit</h3>
        ) : (
          <h4>{playeurInscription.length} entrainement(s) par semaine</h4>
        )}
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
        {playeurInscription?.map((inscription, index) => {
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
