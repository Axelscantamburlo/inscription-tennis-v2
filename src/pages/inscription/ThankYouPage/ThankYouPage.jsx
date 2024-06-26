import React from "react";
import { useNavigate } from "react-router-dom";

export default function ThankYouPage() {
  const navigate = useNavigate();
  return (
    <div className="thank-you-page-container">
      <div className="card">
        <div className="title">
          <h2>Merci !</h2>
          <p style={{ margin: "0 50px" }}>
            Votre pré-inscription a bien été prise en compte.
          </p>
        </div>
        <p style={{ maxWidth: "80%" }}>
          Attention, vous disposez de <span>7 jours</span> pour vous rendre au
          club et procéder au paiement de votre inscription définitive.
        </p>
        <p>
          Durant ce laps de temps, l'équipe pédagogique sera susceptible de vous
          contacter <br /> dans l'objectif d'une meilleure harmonisation et
          cohérence du niveau des groupes.
        </p>
        <p style={{ color: "var(--red-color)", maxWidth: "80%" }}>
          En cas de non-paiement dans les délais prévus (7 jours), votre
          pré-inscription sera automatiquement annulée.
        </p>
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
