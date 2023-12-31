import React, {useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
// REDUX
import {useSelector} from 'react-redux'

//FIREBASE
import {doc, updateDoc, arrayUnion} from 'firebase/firestore'
import { db } from '../../../../config/firebase-config';

//CONTEXT
import { UidUserConnected } from '../../../../context/UidUserConnected';

// FUNCTIONS
import { firebaseUpdateSchedulesDb } from '../../../../functions/firebaseUpdateSchedulesdb';


export default function ConfirmationModal() {

    const navigate = useNavigate()
    // Récupérer l'uid de l'utilisateur connecté
    const {uid} = useContext(UidUserConnected)

 // récucpérer les infos de l'utilisateur (son niveau)
 const playeurInfo = useSelector((state) => state.user);

//  const [playeurInfoState, setPlayeurInfoState] = useState({...playeurInfo, inscriptions: [], priceToPay: '', isStillRegisted: true})
 const [playeurInfoState, setPlayeurInfoState] = useState({...playeurInfo})
 const {name, level} = playeurInfoState
     // récupérer le store redux pour vérifier si l'utilisateur à bien choisi une horaire
  const inscriptions = useSelector((state) => state.schedule);

  const handleConfirm = async () => {
    for (const key in inscriptions) {
      if (inscriptions[key]) {
        const { usersRegisted, numberOfPlaces, uid} = inscriptions[key];
        if (usersRegisted.length < numberOfPlaces) {

           await firebaseUpdateSchedulesDb(uid, name, 'arrayUnion');

        } else {
          console.log('plus de place'); 
        }
      }
    }
    const userRef = doc(db, 'users', uid)
    await updateDoc(userRef, {
        playeurInfo: arrayUnion(playeurInfoState),
        playeurNames: arrayUnion(name)
        
    });
    navigate('/informations-inscription')
}


const [schedulesChoose, setSchedulesChoose] = useState([])
useEffect(() => {
    const selectedSchedules = Object.values(inscriptions)
    .filter(schedule => schedule && Object.keys(schedule).length > 0) 
    .map(schedule => `${schedule.day} de ${schedule.startHour} à ${schedule.endHour}`);
    
    setSchedulesChoose(selectedSchedules);
  }, [])


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
