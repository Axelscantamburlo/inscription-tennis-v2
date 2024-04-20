import React, { useState } from "react";
// REDUX
import { useSelector } from "react-redux";
// FIREBASE
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../config/firebase-config";
import { useLocation } from "react-router-dom";

const AddCommentary = () => {
  // const location = useLocation();
  // const customPropValue = location.state.customProp;
  // console.log(customPropValue);
  const { name } = useSelector((state) => state.user);

  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    // Add a new document with a generated id.
    if (comment) {
      const docRef = await addDoc(collection(db, "commentary"), {
        name: name,
        commentary: comment,
      });
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
