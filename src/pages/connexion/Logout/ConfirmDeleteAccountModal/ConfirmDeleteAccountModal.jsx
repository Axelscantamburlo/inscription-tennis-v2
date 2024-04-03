import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
// CONTEXT
import {UidUserConnected} from '../../../../context/UidUserConnected'
import {AllDataSchedules} from '../../../../context/AllDataSchedules'
// FIREBASE
import { getAuth, deleteUser } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../config/firebase-config";

const ConfirmDeleteAccountModal = ({ setOpenModal2 }) => {
  const {uid} = useContext(UidUserConnected)
  const navigate = useNavigate()

  const handleDeleteAccount = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user);
    if (user) {
      deleteUser(user).then(() => {
        //  deleteDoc(doc(db, "users", uid))
        //  deletePlayeurRegistedInSchedules()
        //  navigate('/')

      }).catch((error) => {
        console.error('Une erreur s\'est produite lors de la suppression du compte :', error);
      });
    } else {
      console.error('Aucun utilisateur connecté.');
      // Rediriger l'utilisateur vers la page de connexion ou afficher un message d'erreur
    }
  
  }


  return (
    <div className="confirmation-modal-container">
      <div className="card">
        <h1
          className="title"
          style={{ color: "var(--background-color)", margin: "10px 0" }}
        >
          Supprimer le compte
        </h1>
        <p>Êtes-vous certain de vouloir supprimer votre compte ?</p>
        <p style={{ color: "var(--red-color)" }}>
          Cette action entraînera l'annulation de chacune de vos inscriptions.
        </p>
        <div className="buttons">
          <button
            className="cancel-button"
            onClick={() => setOpenModal2(false)}
          >
            Annuler
          </button>
          <button className="confirm-button" onClick={handleDeleteAccount}>Valider</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteAccountModal;
