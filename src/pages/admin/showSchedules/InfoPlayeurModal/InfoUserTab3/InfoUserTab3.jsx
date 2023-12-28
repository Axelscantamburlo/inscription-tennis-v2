import React, { useEffect, useContext, useState } from "react";

// CONTEXT
import { AllDataSchedules } from "../../../../../context/AllDataSchedules";
// FUNCTIONS
import {
  getPlayeurInscription,
  findPriceToPay,
} from "../../../../../functions/getPlayeurInscription";

export default function InfoUserTab3({ level, playeurClick }) {
  const { loadedData } = useContext(AllDataSchedules);

  const [price, setPrice] = useState("");
  useEffect(() => {
    const playExternFunction = async () => {
      const inscriptions = await getPlayeurInscription(
        loadedData,
        playeurClick
      );
      const price = findPriceToPay(inscriptions, level);
      setPrice(price);
    };
    playExternFunction();
  }, []);
  return <div>Prix à payer: {price}</div>;
}
