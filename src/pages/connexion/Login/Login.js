import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// FIREBASE
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebase-config";

// DATA
import { INPUTS_DATA } from '../../../data/inputsData';

export default function Login() {
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState('')

  const { email, password } = loginInfo;

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        localStorage.setItem("user", JSON.stringify('connecté')); 
        localStorage.removeItem('persist:root'); 

        navigate("/inscrire-un-joueur");

        // ...
      })
      .catch((error) => {
        const errorMessages = {
          'auth/invalid-email': 'Email invalide',
          'auth/missing-password': 'Veuillez entrer un mot de passe',
          'auth/invalid-login-credentials': 'Email ou mot de passe invalide',
          default: 'Une erreur est survenue'
        };
      
        setErrorMessage(errorMessages[error.code] || errorMessages.default);
      });

  };

  return (
    <div className="login-container">
      <div className="box">
        <h1>Se connecter</h1>

        <form onSubmit={handleSubmit}>
          <div className="inputs">
            {INPUTS_DATA.map((input) => {
              const { id, label, type, maxLength, className } = input;
              return (
                <div className="row" key={id}>
                  <label>{label}</label>
                  <input
                    type={type}
                    name={id}
                    id={id}
                    className={className}
                    maxLength={maxLength}
                    autoComplete="off"
                    onChange={handleInputChange}
                  />
                </div>
              );
            })}
          </div>
          {/* {error && <span>Wrong Email or Password</span>} */}
          <button type="submit" className="submit-btn">
            Valider
          </button>
        </form>
      </div>
      {errorMessage && <span className="error-message">{errorMessage}</span>}

    </div>
  );
}
