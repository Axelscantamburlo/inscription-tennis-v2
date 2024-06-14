import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// DATA
import { INPUTS_DATA } from "../../../data/inputsData";
// FIREBASE
import { auth, db } from "../../../config/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function CreateAccount() {
  const navigate = useNavigate();

  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const { email, password } = registerInfo;

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setRegisterInfo({ ...registerInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", res.user.uid), {
        email,
        playeurInfo: [],
        playeurNames: [],
      });

      localStorage.setItem("user", JSON.stringify("connecté"));
      localStorage.removeItem("persist:root");

      // navigate("/informations-inscription");
      navigate("/inscrire-un-joueur");
    } catch (error) {
      const errorMessages = {
        "auth/invalid-email": "Email invalide",
        "auth/email-already-in-use": "Email déjà utilisé",
        "auth/missing-password": "Veuillez entrer un mot de passe",
        "auth/weak-password": "Mot de passe trop faible",
        default: "Une erreur est survenue",
      };

      setErrorMessage(errorMessages[error.code] || errorMessages.default);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="box">
          <h1>Créer un compte</h1>

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
    </>
  );
}
