import React, { useState } from "react";

// FIREBASE
import {doc, updateDoc} from 'firebase/firestore'
import { db } from "../../../../config/firebase-config";

// FUNCTIONS
import { firebaseUpdateSchedulesDb } from '../../../../functions/firebaseUpdateSchedulesdb';

// CONTEXT
import { useModal } from "../../../../context/ModalContext";
// COMPONENT
import InputFields from "../CreateScheduleModal/InputsFields/InputsFields";

export default function EditScheduleModal({ scheduleClick, setOpenModal1 }) {
    const [scheduleEdit, setScheduleEdit] = useState(scheduleClick)
    const {day, startHour, endHour, numberOfPlaces, level, playedForm, educator, uid} = scheduleEdit

    const handleInputChange = (e) => {
        
        const {value, name} = e.target
        setScheduleEdit({...scheduleEdit, [name]: value})
    }
    
    const handleSubmit = async  e => {
        setOpenModal1(false)
        e.preventDefault()
        const userRef = doc(db, 'schedules', uid)
        await updateDoc(userRef, {
            ...scheduleEdit
        });
        await firebaseUpdateSchedulesDb(uid, scheduleEdit);

    }

    
  return (
    <div className="create-schedule-modal-container">
        <div className="responsive-container">
        <h1 className="title">Modifier un créneau</h1>
              <button className="close-modal" onClick={() => setOpenModal1(false)}>
          &times;
        </button>
      <form onSubmit={handleSubmit}>
      <InputFields scheduleCreate={scheduleEdit} handleInputChange={handleInputChange}/>


       <button className="submit-btn" type="submit">Valider</button>
        </form>
        </div>
    </div>
  );
}
