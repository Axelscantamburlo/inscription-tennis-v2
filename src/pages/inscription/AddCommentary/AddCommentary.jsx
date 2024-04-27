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
      });
    }
    if (window.location.pathname === "/emettre-un-souhait") {
      // Faire une condition spécifique si l'URL est '/emettre-un-souhait'
      navigate("/informations-paiement");
    } else {
      if (!selectedScheduleSecond && !selectedScheduleThird) {
        navigate("/inscrire-un-joueur/inscription");
        console.log("heree");
      } else if (selectedScheduleFirst && !selectedScheduleThird) {
        navigate("/inscrire-un-joueur/inscription/deuxieme-heure");
      } else {
        if (selectedScheduleFirst && selectedScheduleSecond) {
          navigate(
            "/inscrire-un-joueur/inscription/deuxieme-heure/troisieme-heure"
          );
        }
      }
      // Faire une autre condition si l'URL est différente de '/emettre-un-souhait'
    }
  };

  return (
    <div className="add-commentary-container">
      <h1 className="title">Emettre un souhait</h1>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Entrez votre souhait ici"
      />
      <button className="submit-btn" type="submit" onClick={handleSubmit}>
        Valider
      </button>
    </div>
  );
};

export default AddCommentary;
