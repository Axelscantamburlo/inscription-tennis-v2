import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// COMPONENT
import ScheduleItem from "../ScheduleItem/ScheduleItem";
import ConfirmationModal from "../Schedules/confirmationModal/ConfirmationModal";
// CONTEXT
import { AllDataSchedules } from "../../../context/AllDataSchedules";
import { useModal } from "../../../context/ModalContext";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { selectSchedule } from "../../../redux/actions";
// FUNCTIONS
import { handleButtonClick } from "../../../functions/handleButtonClick";

export default function SecondHour() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // récupérer les tableaux à mapper à l'utilisateur
  const { loadedData } = useContext(AllDataSchedules);

  // récucpérer les infos de l'utilisateur (son niveau)
  const { level, formule } = useSelector((state) => state.user);

  // récupérer le store redux pour vérifier si l'utilisateur à bien choisi une horaire
  const {
    selectedScheduleFirst,
    selectedScheduleSecond,
  } = useSelector((state) => state.schedule);

  const [openModal, setOpenModal] = useState(false);

  // naviguer à l'heure précédente: supprimer le schedule séléctionné dans redux

  const navigatePreviousHour = () => {
    dispatch(selectSchedule(null, "Second"));
    navigate("/inscrire-un-joueur/inscription");
  };

  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const confirmRefresh = (event) => {
      event.preventDefault();
      const message = 'Êtes-vous sûr de vouloir actualiser la page ? Toutes vos modifications seront perdues.';
      event.returnValue = message; // For Chrome
      return message; // For Firefox
    };
  
    if (selectedScheduleFirst === null) {
      navigate('/inscrire-un-joueur/inscription');
    }
  
    window.addEventListener('beforeunload', confirmRefresh);
  
    return () => {
      window.removeEventListener('beforeunload', confirmRefresh);
    };
  }, [selectedScheduleFirst, selectedScheduleSecond, navigate]);

  
  return (
    <div className="inscription-schedules-container">
      <div style={{position: 'relative'}}>
      <button className="previous-btn" onClick={() => navigatePreviousHour()}>
        Précédent
      </button>
      <h1 className="title" style={{ color: "var(--background-color)" }}>
        Votre deuxième heure :
      </h1>
      </div>
      <div className="schedules-container">
        {loadedData
          .filter((el) => el.level === level && el.uid !== selectedScheduleFirst.uid)
          .filter(el => el.playedForm === '0')

          .map((schedule, index) => {
            return (
              <div className="schedule" key={index}>
                <ScheduleItem schedule={schedule} path="Second" />
              </div>
            );
          })}
      </div>

      <button
        className="submit-btn"
        onClick={() =>
          handleButtonClick(
            formule === "2h par semaine" ? 2 : 1,
            selectedScheduleSecond,
            setOpenModal,
            setErrorMessage,
            navigate,
            formule === "2h par semaine" ? null : "troisieme-heure",
          )
        }
      >
        {formule === "2h par semaine" ? "Valider" : "Suivant"}
      </button>
      {errorMessage && <span className="error-message">{errorMessage}</span>}
      {openModal && <ConfirmationModal setOpenModal={setOpenModal} />}
    </div>
  );
}
