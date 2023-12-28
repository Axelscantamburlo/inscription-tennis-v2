// Permet de gérer les update de la db schedules pour les composants: AddPlayeur, DeletePlayeur, EditSchedulesModal, ConfirmationModal
import { updateDoc, doc, arrayRemove, arrayUnion } from "firebase/firestore";
import { db } from "../config/firebase-config";



export async function firebaseUpdateSchedulesDb(uid,data, operationType) {
    const schedulesRef = doc(db, "schedules", uid);
    const operationMap = {
        "arrayUnion": arrayUnion,
        "arrayRemove": arrayRemove,
        "editObject": (data) => data  // Vous pouvez définir une fonction anonyme pour l'opération "editObject"
      };
      const operationFunction = operationMap[operationType];

    if(operationType === 'arrayUnion' || operationType === 'arrayRemove')
    await updateDoc(schedulesRef, {
       usersRegisted: operationFunction(data)
    }); else {
        await updateDoc(schedulesRef, {
            ...data
          });
    }
}