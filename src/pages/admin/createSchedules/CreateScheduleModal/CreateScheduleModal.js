import React, { useState } from "react";

// FIREBASE
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../../../config/firebase-config";

// COMPOSANT
import InputFields from "./InputsFields/InputsFields";

export default function CreateScheduleModal({ setOpenModal0 }) {
  const [scheduleCreate, setScheduleCreate] = useState({
    day: "Lundi",
    startHour: "10:00",
    endHour: "11:00",
    numberOfPlaces: "0",
    level: "0",
    playedForm: "0",
    educator: "",
  });
  const {
    day,
    startHour,
    endHour,
    numberOfPlaces,
    level,
    playedForm,
    educator,
  } = scheduleCreate;

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setScheduleCreate({ ...scheduleCreate, [name]: value });
  };

  const [errorMessage, setErrorMessage] = useState("");

  const handleSumbit = async (e) => {
    e.preventDefault();
    if (
      day &&
      startHour &&
      endHour &&
      numberOfPlaces &&
      level &&
      playedForm &&
      educator
    ) {
      setOpenModal0(false);
      const docRef = await addDoc(collection(db, "schedules"), {
        ...scheduleCreate,
        usersRegisted: [],
      });
    } else {
      setErrorMessage("Veuillez remplir tous les champs");
    }
  };

  return (
    <div className="create-schedule-modal-container">
      <div className="responsive-container">
      <h1 className="title">
        Ajouter un créneau
      </h1>

      <button className="close-modal" onClick={() => setOpenModal0(false)}>
        &times;
      </button>
      <form onSubmit={handleSumbit}>
        <InputFields
          scheduleCreate={scheduleCreate}
          handleInputChange={handleInputChange}
        />
        <button className="submit-btn" type="submit">
          Valider
        </button>
        {errorMessage && <span className="error-message">{errorMessage}</span>}
      </form>
      </div>
    </div>
  );
}
