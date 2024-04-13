import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// COMPONENT
import ScheduleItem from "../ScheduleItem/ScheduleItem";
import ConfirmationModal from "../Schedules/confirmationModal/ConfirmationModal";
import PreviousHourButtons from "./PreviousHourButton/PreviousHourButtons";
// CONTEXT
import { AllDataSchedules } from "../../../context/AllDataSchedules";

// REDUX
import { useSelector, useDispatch } from "react-redux";

// FUNCTIONS
import { handleButtonClick } from "../../../functions/handleButtonClick";

export default function SecondHour() {
  const navigate = useNavigate();
  // récupérer les tableaux à mapper à l'utilisateur
  const { loadedData } = useContext(AllDataSchedules);

  // récucpérer les infos de l'utilisateur (son niveau)
  const { level, formule } = useSelector((state) => state.user);
  // récupérer le store redux pour vérifier si l'utilisateur à bien choisi une horaire
  const { selectedScheduleFirst, selectedScheduleSecond } = useSelector(
    (state) => state.schedule
  );

  const [openModal, setOpenModal] = useState(false);

  // naviguer à l'heure précédente: supprimer le schedule séléctionné dans redux

  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const confirmRefresh = (event) => {
      event.preventDefault();
      const message =
        "Êtes-vous sûr de vouloir actualiser la page ? Toutes vos modifications seront perdues.";
      event.returnValue = message; // For Chrome
      return message; // For Firefox
    };

    if (selectedScheduleFirst === null) {
      navigate("/inscrire-un-joueur/inscription");
    }

    window.addEventListener("beforeunload", confirmRefresh);

    return () => {
      window.removeEventListener("beforeunload", confirmRefresh);
    };
  }, [selectedScheduleFirst, selectedScheduleSecond, navigate]);

  return (
    <div className="inscription-schedules-container">
      <div style={{ position: "relative" }}>
        <PreviousHourButtons path="Second" urlPath="inscription" />

        <h1
          className="title"
          style={{ color: "var(--background-color)", margin: "50px 0 15px 0" }}
        >
          Votre deuxième heure : {formule === 'Forme jouée 2h par semaine' ? "(Forme jouée)" : ""}
        </h1>
      </div>
      <div className="schedules-container">

        {formule === "2 x 1h par semaine" ||
        formule === "Forme jouée 3h par semaine" ? (
          <>
            {loadedData
              .filter(
                (el) =>
                  el.level === level && el.uid !== selectedScheduleFirst.uid
              )
              .filter((el) => el.playedForm === "0")

              .map((schedule, index) => {
                return (
                  <div className="schedule" key={index}>
                    <ScheduleItem schedule={schedule} path="Second" />
                  </div>
                );
              })}
          </>
        ) : formule === "Forme jouée 2h par semaine" ? (
          <>
            {loadedData
              .filter((el) => el.level === level)
              .filter((el) => el.playedForm === "1")

              // .filter(el => el.numberOfPlaces - el.usersRegisted.length !== 0)TODO: je sais pas si je met
              .map((schedule, index) => {
                return (
                  <ScheduleItem schedule={schedule} path="Second" key={index} />
                );
              })}
          </>
        ) : null}
      </div>

      <button
        className="submit-btn"
        onClick={() =>
          handleButtonClick(
            formule === "Forme jouée 3h par semaine" ? 1 : 2,
            selectedScheduleSecond,
            setOpenModal,
            setErrorMessage,
            navigate,
            formule === "Forme jouée 3h par semaine" ? "troisieme-heure" : null
          )
        }
      >
        {formule === "Forme jouée 3h par semaine" ? "Suivant" : "Valider"}
      </button>
      {errorMessage && <span className="error-message">{errorMessage}</span>}
      {openModal && <ConfirmationModal setOpenModal={setOpenModal} />}
    </div>
  );
}
