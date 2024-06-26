import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// CONTEXT
import { UidUserConnected } from "../../../../context/UidUserConnected";
import { AllDataSchedules } from "../../../../context/AllDataSchedules";
// FIREBASE
import { getAuth, deleteUser } from "firebase/auth";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../../../../config/firebase-config";

const ConfirmDeleteAccountModal = ({ setOpenModal2 }) => {
  const { uid } = useContext(UidUserConnected);
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const handleDeleteAccount = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      deleteUser(user)
        .then(() => {
          deleteDoc(doc(db, "users", uid));
          //  deletePlayeurRegistedInSchedules()
          navigate("/");
          localStorage.removeItem("user");
          localStorage.removeItem("persist:root");
        })
        .catch((error) => {
          setErrorMessage("Une erreur s'est produite");
        });
    } else {
      setErrorMessage("Une erreur s'est produite");

      // Rediriger l'utilisateur vers la page de connexion ou afficher un message d'erreur
    }
  };

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
          Cette action n'entraîne pas l'annulation de vos inscriptions,
          <br /> veuillez vous adresser directement au club pour cela.
        </p>
        <div className="buttons">
          <button
            className="cancel-button"
            onClick={() => setOpenModal2(false)}
          >
            Annuler
          </button>
          <button className="confirm-button" onClick={handleDeleteAccount}>
            Valider
          </button>
        </div>
      </div>
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};

export default ConfirmDeleteAccountModal;
