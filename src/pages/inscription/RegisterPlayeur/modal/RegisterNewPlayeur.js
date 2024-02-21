import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";


// FIREBASE
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../config/firebase-config";

// REDUX
import { setPlayeurInfo } from "../../../../redux/actions";
import { useDispatch } from "react-redux";

// CONTEXT
import { AllDataSchedules } from "../../../../context/AllDataSchedules";

// DATA
import { NEW_PLAYEUR_INPUTS } from "../../../../data/inputsData";
import { useModal } from "../../../../context/ModalContext";

export default function RegisterNewPlayer({ playeursNames }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loadedExcelData, setLoadedExcelData] = useState([]);

  const loadExcelUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "excel-users"));
    const dataArr = [];
    querySnapshot.forEach((doc) => {
      dataArr.push(doc.data());
    });
    setLoadedExcelData(dataArr);
  };
  useEffect(() => {
    loadExcelUsers();
  }, []);

  const [registerPlayeurInfo, setRegisterPlayeurInfo] = useState({
    name: "",
    phone: "",
    email: "",
    birthDay: "",
    level: null,
  });

  const { name, phone, email, birthDay } = registerPlayeurInfo;

  const handleInputChange = (e) => {
    const { value, name } = e.target;

    setRegisterPlayeurInfo({ ...registerPlayeurInfo, [name]: value });
  };

  const [errorMessage, setErrorMessage] = useState("");

  // Récupérer les infos des users pour véirifer si il n'est pas déjà inscrit
  const { loadedData } = useContext(AllDataSchedules);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    const cleanName = name.trim().replace(/\s+/g, ' ').toLowerCase();
  
    if (!cleanName || !phone || !email || !birthDay) {
      setErrorMessage('Veuillez remplir tous les champs');
      return;
    }
  
    const playeur = loadedExcelData.find((data) => data.name.toLowerCase() === cleanName);

 if (!playeur) {
      setErrorMessage("Le joueur n'a pas été trouvé (entrer le prénom puis le nom)");
      return;
    }
  
    const isPlayeurAlreadyRegisted =
      loadedData.some((data) => data.usersRegisted.map((user) => user.toLowerCase()).includes(cleanName)) ||
      playeursNames?.map((playeur) => playeur.toLowerCase()).includes(cleanName);
  
    if (isPlayeurAlreadyRegisted) {
      setErrorMessage("Le joueur est déjà inscrit");
      return;
    }
  
    const isBirthDayMatch = playeur.birthDay === birthDay;
    if (!isBirthDayMatch) {
      setErrorMessage("La date de naissance est incorrecte");
      return;
    }
    checkPhoneNumber(phone)
  
    const updatedRegisterPlayeurInfo = {
      ...registerPlayeurInfo,
      name: cleanName,
      level: playeur.level,
      sexe: playeur.sexe,
    };
    dispatch(setPlayeurInfo(updatedRegisterPlayeurInfo));
  
    navigate("inscription");
  };

  function checkPhoneNumber(phoneNumber) {
    const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/; // Expression régulière pour valider un numéro de téléphone international
    if (!phoneRegex.test(phoneNumber)) {
        setErrorMessage("Veuillez vérifier le numéro de téléphone")
    }
}

  const {closeModal1} = useModal()

  const [toggleClassName, setToggleClassName] = useState(0)

  return (
    <div className="register-playeur-modal-container">
      <div className="box">
      <button className="close-modal" onClick={closeModal1}>&times;</button>
        <ul>
          <li onClick={() => setToggleClassName(0)} className={toggleClassName === 0 ? 'underlign' : null} >Ré-inscription</li>
          <li className={toggleClassName === 1 ? 'underlign' : null} onClick={() => setToggleClassName(1)}>Nouvelle inscription</li>
        </ul>
        <h2>Joueur</h2>
        <form
            onSubmit={handleFormSubmit}
        >
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
          <button type="submit" className="submit-btn">Valider</button>
          <span className="error-message">{errorMessage}</span>
        </form>
      </div>
    </div>
  );
}
