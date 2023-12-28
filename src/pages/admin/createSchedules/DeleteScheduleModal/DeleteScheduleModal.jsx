import React from 'react'
// FIREBASE
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../../../../config/firebase-config';

export default function DeleteScheduleModal({uid}) {
    const handleSubmit = async () => {

        await deleteDoc(doc(db, "schedules", uid));
    }
  return (
    <div>
        <button>Annuler</button>
        <button onClick={handleSubmit}>Valider</button>
    </div>
  )
}
