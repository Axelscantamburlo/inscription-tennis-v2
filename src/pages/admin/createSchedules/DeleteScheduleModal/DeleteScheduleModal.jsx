import React from 'react'
// FIREBASE
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../../../../config/firebase-config';

// CONTEXT
import { useModal } from '../../../../context/ModalContext';

export default function DeleteScheduleModal({uid}) {
  console.log(uid);
    const handleSubmit = async () => {

        await deleteDoc(doc(db, "schedules", uid));
    }

    const {closeModal2} = useModal()
  return (
    <div>
        <button onClick={closeModal2}>Annuler</button>
        <button onClick={handleSubmit}>Valider</button>
    </div>
  )
}
