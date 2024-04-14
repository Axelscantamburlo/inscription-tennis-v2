import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// CONTEXT
import { AllDataSchedules } from "../../../context/AllDataSchedules";
// COMPONENT
import ScheduleItem from "../ScheduleItem/ScheduleItem";
import ConfirmationModal from "./confirmationModal/ConfirmationModal";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { setPlayeurInfo } from "../../../redux/actions";
// FUNCTIONS
import { handleButtonClick } from "../../../functions/handleButtonClick";

// DATA
import { FORMULES } from "../../../data/formules";

// ///////////////////////
export default function InscriptionSchedules() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // récupérer les tableaux à mapper à l'utilisateur
  const { loadedData } = useContext(AllDataSchedules);
  // récucpérer les infos de l'utilisateur (son niveau)
  const { level, formule, name } = useSelector((state) => state.user);
  const { selectedScheduleFirst } = useSelector((state) => state.schedule);
  // GESTION FORMULES
  const [formules, setFormules] = useState([]);

  useEffect(() => {
    if (!level || !name || level === "Niveau invalide") {
      navigate("/inscrire-un-joueur");
    } else {
      const formulesByLevel = FORMULES.find((f) => f.levels.includes(level));
      setFormules(formulesByLevel ? formulesByLevel.formules : []);
    }
  }, [level, name, navigate]);

  const [chooseFormule, setChooseFormule] = useState(
    level === 0 ? "50min par semaine" : "1h par semaine"
  );
  const handleChangeFormule = (e) => {
    const selectedFormule = e.target.value;
    setChooseFormule(selectedFormule);
    dispatch(setPlayeurInfo({ formule: selectedFormule }));
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="inscription-schedules-container">
      <div className="formules-container">
        <h2>Sélectionner votre formule</h2>
        <select
          name="formules"
          id=""
          value={formule}
          onChange={handleChangeFormule}
        >
          {formules.map((formule, index) => (
            <option value={formule} key={index}>
              {formule}
            </option>
          ))}
        </select>
      </div>
      <div className="schedules-container">
        {loadedData
          .filter((el) => el.level === level)
          .filter((el) => el.playedForm === "0")
          .map((schedule, index) => {
            return (
              <ScheduleItem schedule={schedule} path="First" key={index} />
            );
          })}
      </div>
      <button
        className="submit-btn "
        onClick={() =>
          handleButtonClick(
            formule === "1h par semaine" ? 2 : 1,
            selectedScheduleFirst,
            setOpenModal,
            setErrorMessage,
            navigate,
            formule === "1h par semaine" ? null : "deuxieme-heure"
          )
        }
      >
        {formule === "1h par semaine" ? "Valider" : "Suivant"}
      </button>
      {errorMessage && <span className="error-message">{errorMessage}</span>}
      {openModal && <ConfirmationModal setOpenModal={setOpenModal} />}
    </div>
  );
}

//TODO:  Vérifier formule
