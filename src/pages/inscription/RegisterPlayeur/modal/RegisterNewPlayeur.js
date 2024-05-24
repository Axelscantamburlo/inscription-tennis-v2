import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// FIREBASE
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  limit,
  orderBy,
  limitToLast,
} from "firebase/firestore";
import { db } from "../../../../config/firebase-config";

// REDUX
import { setPlayeurInfo } from "../../../../redux/actions";
import { useDispatch } from "react-redux";

// CONTEXT
import { AllDataSchedules } from "../../../../context/AllDataSchedules";

// DATA
import { NEW_PLAYEUR_INPUTS } from "../../../../data/inputsData";
// COMPONENTS
import NewInscriptionModal from "./NewInscriptionModal/NewInscriptionModal";

export default function RegisterNewPlayer({ playeursNames, setOpenModal }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loadExcelUsers = async (name) => {
    const q = query(
      collection(db, "excel-users"),
      where("name", "==", name),
      orderBy("name"),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data();
    } else {
      return null;
    }
  };

  const [registerPlayeurInfo, setRegisterPlayeurInfo] = useState({
    name: "",
    firstName: "",
    // phone: "",
    // email: "",
    birthDay: "",
    level: null,
    // job: "",
    // nationality: "",
    // adress: "",
  });

  const { name, firstName, phone, email, birthDay, nationality, adress } =
    registerPlayeurInfo;
  const handleInputChange = (e) => {
    const { value, name } = e.target;

    setRegisterPlayeurInfo({ ...registerPlayeurInfo, [name]: value });
  };

  const [errorMessage, setErrorMessage] = useState("");

  // Récupérer les infos des users pour véirifer si il n'est pas déjà inscrit
  const { loadedData } = useContext(AllDataSchedules);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const cleanName = `${name.trim()} ${firstName.trim()}`
      .replace(/\s+/g, " ")
      .toLowerCase();

    if (
      !name || !firstName ||
      !birthDay 
      // !nationality ||
      // !adress
    ) {
      return setErrorMessage("Veuillez remplir tous les champs");
      
    }

    // const playeur = loadedExcelData.find(
    //   (data) => data.name.trim().replace(/\s+/g, " ").toLowerCase() === cleanName
    // );

    const playeur = await loadExcelUsers(cleanName);

    if (!playeur) {
      setErrorMessage(
        "Le joueur n'a pas été trouvé (entrer le nom puis le prénom)"
      );
      return;
    }

    const isPlayeurAlreadyRegisted =
      loadedData.some((data) =>
        data.usersRegisted
          ?.map((user) => user.name.toLowerCase())
          .includes(cleanName)
      ) ||
      playeursNames
        ?.map((playeur) => playeur.toLowerCase())
        .includes(cleanName);

    if (isPlayeurAlreadyRegisted && !playeur.isPriority) {
      setErrorMessage("Le joueur est déjà inscrit");
      return;
    }

    const isBirthDayMatch = playeur.birthDay === birthDay;
    if (!isBirthDayMatch) {
      setErrorMessage("La date de naissance est incorrecte");
      return;
    }
    checkPhoneNumber(phone);

    const updatedRegisterPlayeurInfo = {
      ...registerPlayeurInfo,
      name: cleanName,
      level: playeur.level,
      sexe: playeur.sexe,
    };
    dispatch(setPlayeurInfo(updatedRegisterPlayeurInfo));

    if (playeur.isPriority) {
      return navigate("priorite-inscription");
    }
    navigate("inscription");
  };

  function checkPhoneNumber(phoneNumber) {
    const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/; // Expression régulière pour valider un numéro de téléphone international
    if (!phoneRegex.test(phoneNumber)) {
      setErrorMessage("Veuillez vérifier le numéro de téléphone");
    }
  }

  const [toggleClassName, setToggleClassName] = useState(0);
  const [countrySelected, setCountrySelected] = useState("");
  return (
    <div className="register-playeur-modal-container">
      <div className="box">
        <button className="close-modal" onClick={() => setOpenModal(false)}>
          &times;
        </button>
        {/* A mapper */}
        <div className="tab-buttons">
          <ul>
            <li
              onClick={() => setToggleClassName(0)}
              className={toggleClassName === 0 ? "underlign" : null}
            >
              Ré-inscription
            </li>
            <li
              className={toggleClassName === 1 ? "underlign" : null}
              onClick={() => setToggleClassName(1)}
            >
              Nouvelle inscription
            </li>
          </ul>
        </div>
        {toggleClassName === 0 ? (
          <form onSubmit={handleFormSubmit}>
            <h2>Joueur</h2>
          {NEW_PLAYEUR_INPUTS.map((input) => {
            const { id, label, type, maxLength } = input;
            return (
              <div className="inputs" key={id}>
                <label>{label}</label>
                <input
                  type={type}
                  name={id}
                  id={id}
                  maxLength={maxLength}
                  autoComplete="off"
                  onChange={handleInputChange}
                />
              </div>
            );
          })}

          <button type="submit" className="submit-btn">
            Valider
          </button>
        </form>
        ) : <NewInscriptionModal />}
      </div>
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
}
