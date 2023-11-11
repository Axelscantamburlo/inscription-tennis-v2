import React, {useContext, useEffect, useState} from 'react'

// REDUX
import {useSelector} from 'react-redux'

//FIREBASE
import {doc, updateDoc, arrayUnion} from 'firebase/firestore'
import { db } from '../../../../config/firebase-config';

//CONTEXT
import { UidUserConnected } from '../../../../context/UidUserConnected';


export default function ConfirmationModal() {
    // Récupérer l'uid de l'utilisateur connecté
    const {uid} = useContext(UidUserConnected)

 // récucpérer les infos de l'utilisateur (son niveau)
 const playeurInfo = useSelector((state) => state.user);
 const [playeurInfoState, setPlayeurInfoState] = useState(playeurInfo)
     // récupérer le store redux pour vérifier si l'utilisateur à bien choisi une horaire
  const inscriptions = useSelector((state) => state.schedule);

  // Récupérer la propriété "uid" du local storage

  const handleConfirm = async () => {
    for (const key in inscriptions) {
      if (inscriptions[key]) {
        const { usersRegisted, numberOfPlaces, uid} = inscriptions[key];
        if (usersRegisted.length < numberOfPlaces) {
          const schedulesRef = doc(db, "schedules", uid);
          await updateDoc(schedulesRef, {
            usersRegisted: arrayUnion(playeurInfo.name)
          });
       
        } else {
          console.log('plus de place'); 
        }
      }
    }
    console.log(playeurInfoState);
    const userRef = doc(db, 'users', uid)
    await updateDoc(userRef, {
        playeurInfo: arrayUnion(playeurInfoState)
    });
}
// const cc = [...playeurInfo].push(schedulesChoose)


const [schedulesChoose, setSchedulesChoose] = useState([])
useEffect(() => {
    const selectedSchedules = Object.values(inscriptions)
    .filter(schedule => schedule && Object.keys(schedule).length > 0) 
    .map(schedule => `${schedule.day} de ${schedule.startHour} à ${schedule.endHour}`);
    
    setSchedulesChoose(selectedSchedules);
  }, [])

  useEffect(() => {
    setPlayeurInfoState(prevState => ({...prevState, inscriptions: schedulesChoose}))

  }, [schedulesChoose])
  console.log(playeurInfoState, schedulesChoose);

  return (
    <div className='confirmation-modal-container'>
        <h1>Confirmer Inscription</h1>
        <button onClick={handleConfirm}>confirmer</button>
        {schedulesChoose.map((schedule, index) => (
            <h2 key={index}>{schedule}</h2>
        ))}
        <button>Annuler</button>
    </div>
  )
}
