import React, { useState } from "react";

// FIREBASE
import {doc, updateDoc} from 'firebase/firestore'
import { db } from "../../../../config/firebase-config";

// FUNCTIONS
import { firebaseUpdateSchedulesDb } from '../../../../functions/firebaseUpdateSchedulesdb';

export default function EditScheduleModal({ scheduleClick }) {
    const [scheduleEdit, setScheduleEdit] = useState(scheduleClick)
    const {day, startHour, endHour, numberOfPlaces, level, playedForm, educator, uid} = scheduleEdit

    const handleInputChange = (e) => {
        
        const {value, name} = e.target
        setScheduleEdit({...scheduleEdit, [name]: value})
    }
    
    const handleSubmit = async  e => {
        e.preventDefault()
        const userRef = doc(db, 'schedules', uid)
        await updateDoc(userRef, {
            ...scheduleEdit
        });
        await firebaseUpdateSchedulesDb(uid, scheduleEdit);

    }
  return (
    <div>
      <form onSubmit={handleSubmit} style={{display: 'flex'}}>
        <select name="day" value={day} id=""  onChange={handleInputChange}>
            <option value="lundi">Lundi</option>
            <option value="mardi">Mardi</option>
        </select>
        <div>
            <input type="time" value={startHour}  name="startHour" id="" onChange={handleInputChange}  />
        </div>
        <div>
            <input type="time" value={endHour}  name="endHour" id="" onChange={handleInputChange} />
        </div>
        <select name="level" id="" value={level} onChange={handleInputChange}>
            <option value='0'>Blanc</option>
            <option value="1">Violet</option>
            <option value='2'>Rouge</option>
            <option value='3'>Orange</option>
            <option value='4'>Vert</option>
            <option value='5'>Jaune</option>
        </select>
        <div>
            <input type="number" value={numberOfPlaces} name="numberOfPlaces" id="" onChange={handleInputChange} />
        </div>
        <select name="playedForm" value={playedForm} id="" onChange={handleInputChange} >
            <option value="0">Classique</option>
            <option value="1">Forme Jouée</option>
        </select>
        <div>
            <input type="text" value={educator} name="educator" id="" onChange={handleInputChange} />
        </div>
        <button type="submit">Valider</button>

        </form>
    </div>
  );
}
