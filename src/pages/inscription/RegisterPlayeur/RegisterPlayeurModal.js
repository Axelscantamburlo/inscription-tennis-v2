import React, {useState, useEffect, useContext} from "react";

// CONTEXT
import { AllDataSchedules } from "../../../context/AllDataSchedules";
// FUNCTION
import { getPlayeurInscription, findPriceToPay } from "../../../functions/getPlayeurInscription";


export default function RegisterPlayeurModal({ playeurInfo }) {
  const { name, birthDay, level, phone } = playeurInfo;


  
  // Appel d'une fonction externe pour récupérer les horaires d'inscriptions du joueur et les affichées
  const {loadedData} = useContext(AllDataSchedules)
  const [playeurInscription, setPlayeurInscription] = useState([]);
  const [priceToPay, setPriceToPay] = useState('')
  useEffect(() => {
    const playExternFunction = async () =>  {
      const inscriptions = await getPlayeurInscription(loadedData, name)
      const price = findPriceToPay(inscriptions, level)
      setPlayeurInscription(inscriptions)
      setPriceToPay(price)
      
    }
    playExternFunction()
  }, [loadedData]);
  return (
    <div>
      <h2>{name}</h2>
      <h2>{birthDay}</h2>
      <h2>{level}</h2>
      <h2>{phone}</h2>
      {playeurInscription.map((inscription, index) => {
        return(
            <div key={index}>
                <h2>{inscription.day} et {inscription.startHour} à {inscription.endHour}</h2>
            </div>
        )
      })}
      {priceToPay}
    </div>
  );
}


