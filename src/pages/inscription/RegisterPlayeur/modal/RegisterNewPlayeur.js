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
      setErrorMessage('Merci de remplir toutes les infos');
      return;
    }
  
    const playeur = loadedExcelData.find((data) => data.name.toLowerCase() === cleanName);
    if (!playeur) {
      setErrorMessage("Le joueur n'est pas dans la base de données Excel");
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
  
    const updatedRegisterPlayeurInfo = {
      ...registerPlayeurInfo,
      name: cleanName,
      level: playeur.level,
      sexe: playeur.sexe,
    };
    dispatch(setPlayeurInfo(updatedRegisterPlayeurInfo));
  
    navigate("inscription");
  };

  const {closeModal1} = useModal()

  return (
    <div className="register-playeur-modal-container">
      <p onClick={() => closeModal1()}>dldl</p>
      <div className="responsive-container">
        <ul>
          <li>Ré-inscription</li>
          <li>Nouvelle inscription</li>
        </ul>
        <h2>Info du Joueur !!</h2>
        <form
            onSubmit={handleFormSubmit}
        >
          {NEW_PLAYEUR_INPUTS.map((input) => {
            const { id, label, type, maxLength } = input;
            return (
              <div className="input" key={id}>
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
          <button type="submit">Valider</button>
          <span style={{ color: "red" }}>{errorMessage}</span>
        </form>
      </div>
    </div>
  );
}
