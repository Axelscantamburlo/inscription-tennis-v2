import React from "react";
import { useNavigate } from "react-router-dom";

export default function InformationInscription() {
  const navigate = useNavigate();
  return (
    <div className="informations-inscription-container">
      <div className="card">
        <div className="title">
          <h2>Informations utiles</h2>
        </div>

        <ul className="content">
          <li>Un seul compte suffit par famille.</li>

          <li>Saisissez les informations requises avec soin.</li>

          <li>Lisez attentivement les informations qui apparaîtront.</li>
        </ul>

        <h3>En cas de problème, contacter le club au 05.61.78.16.78</h3>
        <div className="buttons">
          <button
            className="confirm-button"
            onClick={() => navigate("/inscrire-un-joueur")}
          >
            C'est noté !
          </button>
        </div>
      </div>
    </div>
  );
}
