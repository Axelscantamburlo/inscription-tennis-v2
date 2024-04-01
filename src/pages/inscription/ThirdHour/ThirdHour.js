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

//FUNCTIONS
import { handleButtonClick } from "../../../functions/handleButtonClick";

export default function ThirdHour() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // récupérer les tableaux à mapper à l'utilisateur
  const { loadedData } = useContext(AllDataSchedules);

  // récucpérer les infos de l'utilisateur (son niveau)
  const { level } = useSelector((state) => state.user);

  const {
    selectedScheduleFirst,
    selectedScheduleSecond,
    selectedScheduleThird,
  } = useSelector((state) => state.schedule);

  const [openModal, setOpenModal] = useState(false);

  const navigatePreviousHour = () => {
    dispatch(selectSchedule(null, "Third"));
    navigate("/inscrire-un-joueur/inscription/deuxieme-heure");
  };

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (selectedScheduleFirst === null || selectedScheduleSecond === null) {
      navigate("/inscrire-un-joueur/inscription");
    }
  }, []);

  useEffect(() => {
    const confirmRefresh = (event) => {
      event.preventDefault();
      const message =
        "Êtes-vous sûr de vouloir actualiser la page ? Toutes vos modifications seront perdues.";
      event.returnValue = message; // For Chrome
      return message; // For Firefox
    };

    if (selectedScheduleFirst === null || selectedScheduleSecond === null) {
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
        <button className="previous-btn" onClick={() => navigatePreviousHour()}>
          Précédent
        </button>
        <h1 className="title" style={{ color: "var(--background-color)" }}>
          Votre troisième heure :
        </h1>
      </div>
      <div className="schedules-container">
        {loadedData
          .filter(
            (el) =>
              el.level === level &&
              el.uid !== selectedScheduleFirst?.uid &&
              el.uid !== selectedScheduleSecond?.uid
          )
          .filter((el) => el.playedForm === "0")

          .map((schedule, index) => {
            return (
              <div className="schedule" key={index}>
                <ScheduleItem schedule={schedule} path="Third" />
              </div>
            );
          })}
      </div>

      <button
        className="submit-btn"
        onClick={() =>
          handleButtonClick(
            2,
            selectedScheduleThird,
            setOpenModal,
            setErrorMessage
          )
        }
      >
        Valider
      </button>
      {errorMessage && <span className="error-message">{errorMessage}</span>}

      {openModal && <ConfirmationModal setOpenModal={setOpenModal} />}
    </div>
  );
}
