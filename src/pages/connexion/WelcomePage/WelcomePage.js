import React from "react";
import { NavLink } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="welcome-page-container">
      <div className="box">
        <h1>Bienvenue !</h1>
        <div className="buttons">
          <NavLink to="/se-connecter">
            <button>Se Connecter</button>
          </NavLink>
          <NavLink to="/creer-un-compte">
            <button>Créer un Compte</button>
          </NavLink>

          <NavLink
            style={{ textDecoration: "none", color: "white", textAlign: 'center' }}
            to="/connexion-admin"
          >
            <p>Administrateur</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
