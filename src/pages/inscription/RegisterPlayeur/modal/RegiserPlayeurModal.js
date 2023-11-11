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

export default function RegiserPlayeurModal() {
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

    const playeur = loadedExcelData.filter((data) => data.name === name);
    const isBirthDayMatch = playeur.some((item) => item.birthDay === birthDay);

    const isPlayeurAlreadyRegisted = loadedData.some((data) =>
      data.usersRegisted.includes(name)
    );

    if (playeur.length === 0) {
      setErrorMessage("Le joueur n'est pas dans excel db");
      return;
    } else if (isPlayeurAlreadyRegisted) {
      setErrorMessage("LE joueur est déjà inscrit");
      return;
    } else if (!isBirthDayMatch) {
      setErrorMessage("La date de naissance est mauvaise");
      return;
    }
    const updatedRegisterPlayeurInfo = {
      ...registerPlayeurInfo,
      level: playeur[0].level,
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

// Pour vérifier si l'utilisateur n'est pas déjà inscrit, mettre dans la db excel-users, un champ nommé IsInscrit et passer à true quand il est inscrit, comme ca on peut vérifier ici si c pas déjà true
