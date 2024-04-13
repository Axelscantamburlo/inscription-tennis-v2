import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase-config";
import ConfirmStopInscription from "./ConfirmStopInscription/ConfirmStopInscription";

const StopInscriptionButton = () => {
  const [openModal, setOpenModal] = useState(false);
  const [endInscription, setEndInscription] = useState(null);

  useEffect(() => {
    const getEndInscriptionState = async () => {
      const docRef = doc(db, "admin", "endInscription");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setEndInscription(docSnap.data().endInscription);
      } else {
        console.log("No such document!");
      }
    };

    getEndInscriptionState();
  }, []);


  return (
    <>
      <button
        className="button"
        style={{ backgroundColor: !endInscription ? "var(--red-color)" : "#548C2F" }}
        onClick={() => setOpenModal(true)}
      >
        {endInscription ? "Reprendre les inscriptions" : "Arrêter les inscriptions"}
      </button>
      {openModal && (
        <ConfirmStopInscription
          setOpenModal={setOpenModal}
          endInscription={endInscription}
          setEndInscription={setEndInscription}
          title={!endInscription ? 'Arrêter' : 'Reprendre'}
        />
      )}
    </>
  );
};

export default StopInscriptionButton;
