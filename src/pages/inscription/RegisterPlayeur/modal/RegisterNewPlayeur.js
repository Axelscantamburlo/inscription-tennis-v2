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
      !name ||
      !firstName ||
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
        "Le joueur n'a pas été trouvé (entrer le nom et le prénom sans accent)"
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

    if (isPlayeurAlreadyRegisted && !playeur.priority) {
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
      level: playeur.level.toString(),
    };
    dispatch(setPlayeurInfo(updatedRegisterPlayeurInfo));

    const currentDate = new Date();
    const limitDate = new Date(currentDate.getFullYear(), 5, 24); // 24 juin

    if (playeur.priority && currentDate < limitDate) {
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

  const handleDateCheck = () => {
    const currentDate = new Date();
    const registrationDate = new Date(currentDate.getFullYear(), 5, 26); // Juin est le mois 5 en JavaScript (0-indexé)

    if (currentDate < registrationDate) {
      setToggleClassName(2);
    } else {
      setToggleClassName(1);
      setErrorMessage(""); // Effacer le message d'erreur si la condition est remplie
    }
  };
  return (
    <div className="register-playeur-modal-container">
      <div className="box">
        <button className="close-modal" onClick={() => setOpenModal(false)}>
          &times;
        </button>
        {/* A mapper */}
        <div className="tab-buttons">
          <p>Choisissez votre type d'inscription</p>
          <ul>
            <li
              onClick={() => setToggleClassName(0)}
              className={toggleClassName === 0 ? "underlign" : null}
            >
              Ré-inscription
            </li>
            <li
              className={toggleClassName === 1 ? "underlign" : null}
              onClick={handleDateCheck}
            >
              Nouvelle inscription
            </li>
          </ul>
        </div>
        {toggleClassName === 0 ? (
          <form onSubmit={handleFormSubmit}>
            <h2>Joueur / Joueuse</h2>
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
        ) : toggleClassName === 1 ? (
          <NewInscriptionModal playeursNames={playeursNames} />
        ) : toggleClassName === 2 ? (
          <h2>Vous ne pourrez vous inscrire qu'à partir du 25 juin.</h2>
        ) : null}
      </div>
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
}
