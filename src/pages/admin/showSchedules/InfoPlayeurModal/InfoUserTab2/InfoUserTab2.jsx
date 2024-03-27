import React, { useState, useEffect, useContext } from "react";

// CONTEXT
import { AllDataSchedules } from "../../../../../context/AllDataSchedules";

// FUNCTIONS
import {
  getPlayeurInscription,
  findPriceToPay,
} from "../../../../../functions/getPlayeurInscription";

export default function InfoUserTab2({ playeurClick }) {
 
  // Appel d'une fonction externe pour récupérer les horaires d'inscriptions du joueur et les afficher
  const { loadedData } = useContext(AllDataSchedules);
  const [playeurInscription, setPlayeurInscription] = useState([]);
  useEffect(() => {
    const playExternFunction = async () => {
      const inscriptions = await getPlayeurInscription(
        loadedData,
        playeurClick
      );
      setPlayeurInscription(inscriptions);
    };
    playExternFunction();
  }, []);
  return (
    <div className="tab-container">
      <div className="text-container">
        <p>Formule : </p>
        {playeurInscription.length === 0 ? (
          <p>Pas inscrit</p>
        ) : (
          <p>{playeurInscription.length} heure(s) par semaine</p>
        )}
      </div>
      <div className="text-container">
        <p>Inscription(s) : </p>
        {playeurInscription?.map((inscription, index) => {
          const { startHour, endHour, day } = inscription;
          return (
            <p key={index}>
              {inscription.day} de {inscription.startHour} à {inscription.endHour}
            </p>
          );
        })}
      </div>
    </div>
  );
}
