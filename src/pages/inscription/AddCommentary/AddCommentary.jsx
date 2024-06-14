import React, { useState } from "react";
// REDUX
import { useSelector } from "react-redux";
// FIREBASE
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../config/firebase-config";
import { useLocation, useNavigate } from "react-router-dom";

const AddCommentary = () => {
  const navigate = useNavigate();
  const { name } = useSelector((state) => state.user);
  const location = useLocation();
  const isRegisted = location.state?.isRegisted;
  const {
    selectedScheduleFirst,
    selectedScheduleSecond,
    selectedScheduleThird,
  } = useSelector((state) => state.schedule);

  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    // Add a new document with a generated id.
    if (comment) {
      const docRef = await addDoc(collection(db, "commentary"), {
        name: name,
        commentary: comment,
        status: false
      });
    }
    closeModal();
  };

  const closeModal = () => {
    if (isRegisted) {
      return navigate("/informations-paiement");
    } else {
      // if (!selectedScheduleFirst) {
      //   navigate("/inscrire-un-joueur/inscription");
      // } else if (!selectedScheduleThird) {
      //   navigate("/inscrire-un-joueur/inscription/deuxieme-heure");
      // } else if (selectedScheduleSecond) {
      //   navigate(
      //     "/inscrire-un-joueur/inscription/deuxieme-heure/troisieme-heure"
      //   );
      // }
      return navigate("/inscrire-un-joueur");
    }
  };

  return (
    <div className="add-commentary-container">
      <h1 className="title">Emettre un souhait</h1>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder={
          isRegisted
            ? "Exemple : Être avec un ou une amie en cours, un professeur en particulier, nous essayerons d'en tenir compte mais nous ne vous le garantissons pas."
            : "Indiquez-nous une ou plusieurs horaires (dans les créneaux proposés pour votre niveau) qui vous conviendraient, nous essayerons d'en tenir compte mais nous ne vous le garantissons pas."
        }
      />
      <div className="buttons">
        <button className="cancel-button" style={{ backgroundColor: "green" }} onClick={() => closeModal()}>
          Passer
        </button>
        <button className="submit-button" type="submit" onClick={handleSubmit}>
          Valider
        </button>
      </div>
    </div>
  );
};

export default AddCommentary;
