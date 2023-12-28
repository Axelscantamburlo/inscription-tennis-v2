import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// FIREBASE
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../config/firebase-config";

// REDUX
import { setPlayeurInfo } from "../../../../redux/actions";
import { useDispatch } from "react-redux";

// CONTEXT
import { UidUserConnected } from "../../../../context/UidUserConnected";
import { AllDataSchedules } from "../../../../context/AllDataSchedules";

export default function RegisterNewPlayer({playeursNames}) {
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

  const { name, phone, email, birthDay, level } = registerPlayeurInfo;

  const handleInputChange = (e) => {
    const { value, name } = e.target;

    setRegisterPlayeurInfo({ ...registerPlayeurInfo, [name]: value });
  };

  const [errorMessage, setErrorMessage] = useState("");

  // Récupérer les infos des users pour véirifer si il n'est pas déjà inscrit
  const { loadedData } = useContext(AllDataSchedules);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const playeur = loadedExcelData.find((data) => data.name === name);
    if (!playeur) {
      setErrorMessage("Le joueur n'est pas dans la base de données Excel");
      return;
    }
    const isPlayeurAlreadyRegisted = loadedData.some((data) =>
      data.usersRegisted.includes(name)
    ) || playeursNames?.includes(name);
  
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
      level: playeur.level,
      sexe: playeur.sexe
    };
    dispatch(setPlayeurInfo(updatedRegisterPlayeurInfo));
  
    navigate("inscription");
  };

  return (
    <div className="register-playeur-modal-container">
      <div className="responsive-container">
        <ul>
          <li>Ré-inscription</li>
          <li>Nouvelle inscription</li>
        </ul>
        <h2>Info du Joueur !!</h2>
        <form
          onSubmit={
            name && email && phone && birthDay ? handleFormSubmit : null
          }
        >
          <input
            type="text"
            name="name"
            placeholder="Nom"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Numéro de Téléphone"
            maxLength="10"
            onChange={handleInputChange}
          />
          <input
            type="mail"
            name="email"
            placeholder="email"
            onChange={handleInputChange}
          />
          <input
            type="-text"
            name="birthDay"
            placeholder="Date de naiss."
            onChange={handleInputChange}
          />
          <button type="submit">Valider</button>
          <span style={{ color: "red" }}>{errorMessage}</span>
          
        </form>
      </div>
    </div>
  );
}

