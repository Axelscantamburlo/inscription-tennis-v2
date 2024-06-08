import React from "react";
import { NavLink } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="welcome-page-container">
      <div className="box">
        <h1>Bienvenue !</h1>
        <div className="buttons">
          <NavLink to="/creer-un-compte">
            <p>Première connexion ?</p>
            <button>Créer un Compte</button>
          </NavLink>
          <NavLink to="/se-connecter">
            <button>Se Connecter</button>
          </NavLink>

          <NavLink style={{ textDecoration: "none" }} to="/connexion-admin">
            <p className="admin">Administrateur</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
