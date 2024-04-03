import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ConfirmLogoutModal = ({setOpenModal1}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate('/')
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div className="confirmation-modal-container">
      <div className="card">
        <h1
          className="title"
          style={{ color: "var(--background-color)", margin: "10px 0" }}
        >
          Se déconnecter
        </h1>
        <p>Êtes-vous certain de vouloir vous déconnecter</p>
      <div className="buttons">
        <button className="cancel-button" onClick={() => setOpenModal1(false)}>
          Annuler
        </button>
        <button className="confirm-button" onClick={handleLogout}>
          Valider
        </button>
      </div>
      </div>
    </div>
  );
};

export default ConfirmLogoutModal;
