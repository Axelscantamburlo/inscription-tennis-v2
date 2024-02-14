import React, { useState } from 'react'

// FIREBASE
import { collection, addDoc, updateDoc, doc } from "firebase/firestore"; 
import { db } from '../../../../config/firebase-config';


export default function CreateScheduleModal() {
    const [scheduleCreate, setScheduleCreate] = useState({
        day: 'Lundi',
        startHour: '10:00',
        endHour: '11:00',
        numberOfPlaces: '0',
        level: '0',
        playedForm: '0',
        educator: ''
    })
    const {day, startHour, endHour, numberOfPlaces, level, playedForm, educator} = scheduleCreate

    const handleInputChange = (e) => {
        const {value, name} = e.target
        setScheduleCreate({...scheduleCreate, [name]: value})
    }
    
    const handleSumbit = async (e) => {
        e.preventDefault()
        if(day && startHour && endHour && numberOfPlaces && level && playedForm && educator) {
            const docRef = await addDoc(collection(db, "schedules"), {
                ...scheduleCreate,
                usersRegisted: []
              });
        } else {
            console.log('il manque des infos');
        }

    }
  return (
    <div >
        <form onSubmit={handleSumbit} style={{display: 'flex'}}>
        <select name="day" value={day} id=""  onChange={handleInputChange}>
            <option value="lundi">Lundi</option>
            <option value="mardi">Mardi</option>
        </select>
        <div>
            <input type="time" value={startHour} name="startHour" id="" onChange={handleInputChange} />
        </div>
        <div>
            <input type="time" value={endHour} name="endHour" id="" onChange={handleInputChange} />
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
            <input type="number" value={numberOfPlaces} min={1}   name="numberOfPlaces" id="" onChange={handleInputChange} />
        </div>
        <select name="playedForm" value={playedForm} id=""  onChange={handleInputChange}>
            <option value="0">Classique</option>
            <option value="1">Forme Jouée</option>
        </select>
        <div>
            <input type="text" value={educator} name="educator" id="" onChange={handleInputChange} />
        </div>
        <button type="submit">Valider</button>

        </form>
    </div>
  )
}
