import React from 'react';
import { NavLink } from 'react-router-dom';

const WelcomePage = () => {
    return (
        <div className='welcome-page-container'>
            <div className="box">
                <h1>Bienvenue !</h1>
                <NavLink to='/se-connecter'>
                    <button>Se Connecter</button>
                </NavLink>
                <NavLink to='/creer-un-compte'>
                    <button>Créer un Compte</button>
                </NavLink>
  
            </div>
            <NavLink to='/connexion-admin' style={{color: 'white'}}>
                <h5>Administrateur</h5>
            </NavLink>
        </div>
    );
};

export default WelcomePage;

