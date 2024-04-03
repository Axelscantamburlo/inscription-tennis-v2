import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// CONTEXT
import { AllDataSchedules } from "../../../context/AllDataSchedules";
import { useModal } from "../../../context/ModalContext";
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
  const { level } = useSelector((state) => state.user);
  
  // récupérer le store redux pour vérifier si l'utilisateur à bien choisi une horaire
  const { selectedScheduleFirst } = useSelector((state) => state.schedule);

  // const [showModal, setShowModal] = useState(false);
  const { openModal2, modal2 } = useModal();
  // GESTION FORMULES
  const [formules, setFormules] = useState([]);
  useEffect(() => {
    const formulesByLevel = FORMULES.find((formule) =>
      formule.levels.includes(level)
    );
    if (formulesByLevel) {
      setFormules(formulesByLevel.formules);
    }

  }, []);

  const [chooseFormule, setChooseFormule] = useState(
    level === 0 ? "50min par semaine" : "1h par semaine"
  );
  const handleChangeFormule = (e) => {
    const selectedFormule = e.target.value;
  setChooseFormule(selectedFormule);
  dispatch(setPlayeurInfo({ formule: selectedFormule }));

  };

  const [errorMessage, setErrorMessage] = useState("");
  const [openModal, setOpenModal] = useState(false)

  return (
    <div className="inscription-schedules-container">
      <div className="formules-container">
        <h2>Sélectionner votre formule</h2>
        <select name="formules" id="" onChange={handleChangeFormule}>
          {formules.map((formule, index) => (
            <option value={formule} key={index}>
              {formule}
            </option>
          ))}
        </select>
      </div>
      <div className="schedules-container">
        {chooseFormule === "1h par semaine" ||
        chooseFormule === "2h par semaine" ? (
          <>
            {loadedData
              .filter((el) => el.level === level)
              .filter(el => el.playedForm === "0")
              // .filter(el => el.numberOfPlaces - el.usersRegisted.length !== 0)TODO: je sais pas si je met
              .map((schedule, index) => {
                return (
                  <ScheduleItem schedule={schedule} path="First" key={index} />
                );
              })}
          </>
        ) : chooseFormule === 'Forme jouée 2h par semaine' || chooseFormule === 'Forme jouée 3h par semaine' ? (
          <>
          {loadedData
              .filter((el) => el.level === level)
              .filter(el => el.playedForm === "1")

              // .filter(el => el.numberOfPlaces - el.usersRegisted.length !== 0)TODO: je sais pas si je met
              .map((schedule, index) => {
                return (
                  <ScheduleItem schedule={schedule} path="First" key={index} />
                );
              })}</>
        ) : null}
      </div>
      <button
        className="submit-btn "
        onClick={() =>
          handleButtonClick(
            chooseFormule === "1h par semaine" ? 2 : 1,
            selectedScheduleFirst,
            setOpenModal,
            setErrorMessage,
            navigate,
            chooseFormule === "1h par semaine" ? null : "deuxieme-heure",
          )
        }
      >
        {chooseFormule === "1h par semaine" ? "Valider" : "Suivant"}
      </button>
      {errorMessage && <span className="error-message">{errorMessage}</span>}
      {openModal && <ConfirmationModal setOpenModal={setOpenModal} />}
    </div>
  );
}
