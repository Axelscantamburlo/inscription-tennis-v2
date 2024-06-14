import React, { useState, useEffect, useContext } from "react";

// FIREBASE
import {
  addDoc,
  collection,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../../config/firebase-config";

// FUNCTIONS
import { firebaseUpdateSchedulesDb } from "../../../../functions/firebaseUpdateSchedulesdb";
import { AllDataUsers } from "../../../../context/AllDataUsers";

export default function AddPlayeurModal({
  uid,
  usersRegisted,
  numberOfPlaces,
  level,
  setShowModal1,
}) {
  const [nameEnter, setNameEnter] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [priority, setPriority] = useState(false);

  const { usersData } = useContext(AllDataUsers);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowModal1(false);
    if (nameEnter.trim() !== "" && usersRegisted.length < numberOfPlaces) {
      await firebaseUpdateSchedulesDb(uid, nameEnter, "arrayUnion", birthDay);
      const infoPlayeurAdd = {
        name: nameEnter.trim().toLowerCase(),
        level: level,
        dateInscription: new Date(),
        isPayed: false,
      };

      const info = usersData.filter((user) => user.name == nameEnter);
      if (!priority && info.length === 0) {
        const docRef = await addDoc(collection(db, "users"), {
          playeurInfo: [infoPlayeurAdd],
          playeurNames: [infoPlayeurAdd.name],
        });
      }
    }
  };

  // Ajoutez ces états dans votre composant
  const [suggestions, setSuggestions] = useState([]);
  // Gestionnaire pour mettre à jour l'entrée et réinitialiser les suggestions
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setNameEnter(value);
    if (value.length > 2) {
      // Commence à chercher après 2 caractères
      fetchSuggestions(value.toLowerCase().trim());
    } else {
      setSuggestions([]);
    }
  };

  // Fonction pour récupérer les suggestions
  const fetchSuggestions = async (input) => {
    const usersRef = collection(db, "excel-users");
    const q = query(
      usersRef,
      where("name", ">=", input),
      where("name", "<=", input + "\uf8ff"),
      limit(4)
    );
    const querySnapshot = await getDocs(q);
    const fetchedSuggestions = [];
    querySnapshot.forEach((doc) => {
      const { name, birthDay } = doc.data(); // Déstructuration pour obtenir seulement name et birthDay
      fetchedSuggestions.push({ name, birthDay }); // Ajoutez ces propriétés à l'array
    });
    setSuggestions(fetchedSuggestions);
  };

  // Ajoutez un useEffect pour nettoyer les suggestions lors de la fermeture du modal ou un autre événement
  useEffect(() => {
    return () => {
      setSuggestions([]);
    };
  }, []);
  return (
    <div className="confirmation-modal-container">
      <form className="card responsive-card" onSubmit={handleSubmit}>
        <h1
          className="title"
          style={{ color: "var(--background-color)", margin: "10px 0" }}
        >
          Ajouter un joueur
        </h1>
        <div
          className="inputs"
          style={{ width: "90%", display: "flex", flexDirection: "column" }}
        >
          <input
            style={{ width: "100%" }}
            type="text"
            name=""
            onChange={handleInputChange}
            placeholder="Nom et prénom"
            value={nameEnter}
          />
          <input
            style={{ width: "100%" }}
            type="text"
            name=""
            onChange={(e) => setBirthDay(e.target.value)}
            placeholder="Année de naissance"
            value={birthDay}
          />
          <label htmlFor="priority">Prioriété adulte</label>
          <input
            type="checkbox"
            name="priority"
            onChange={() => setPriority(!priority)}
          />
        </div>
        {suggestions.length > 0 && (
          <ul style={{ cursor: "pointer" }}>
            {suggestions.map((suggestion, index) => (
              <li
                onClick={() => {
                  setNameEnter(suggestion.name);
                  setBirthDay(suggestion.birthDay.slice(0, 4));
                }}
                key={index}
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
        <div className="buttons">
          <button type="submit" className="cancel-button">
            Annuler
          </button>
          <button type="submit" className="confirm-button">
            Valider
          </button>
        </div>
      </form>
    </div>
  );
}
