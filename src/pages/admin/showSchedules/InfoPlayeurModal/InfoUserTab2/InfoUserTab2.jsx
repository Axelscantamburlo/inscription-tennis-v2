import React, { useState, useEffect, useContext } from "react";

// CONTEXT
import { AllDataSchedules } from "../../../../../context/AllDataSchedules";

// FUNCTIONS
import {
  getPlayeurInscription,
  findPriceToPay,
} from "../../../../../functions/getPlayeurInscription";

export default function InfoUserTab2({ playeurClick }) {

  // Appel d'une fonction externe pour récupérer les horaires d'inscriptions du joueur et les affichées
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
    <div>
      {playeurInscription?.map((inscription, index) => {
        const { startHour, endHour, day } = inscription;
        return <h2 key={index}>{day}</h2>;
      })}
    </div>
  );
}
