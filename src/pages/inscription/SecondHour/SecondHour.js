import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// COMPONENT
import ScheduleItem from "../ScheduleItem/ScheduleItem";
import ConfirmationModal from "../Schedules/confirmationModal/ConfirmationModal";
// CONTEXT
import { AllDataSchedules } from "../../../context/AllDataSchedules";

// REDUX
import { useSelector } from "react-redux";
// FUNCTIONS
import { handleButtonClick } from "../../../functions/handleButtonClick";

export default function SecondHour({ route }) {
  const location = useLocation();

  // Accédez à la customData depuis props.location.state
  const formule = location.state.formule;
  console.log(formule);
  const navigate = useNavigate();
  // récupérer les tableaux à mapper à l'utilisateur
  const { loadedData } = useContext(AllDataSchedules);

  // récucpérer les infos de l'utilisateur (son niveau)
  const { level } = useSelector((state) => state.user);

  // récupérer le store redux pour vérifier si l'utilisateur à bien choisi une horaire
  const {
    selectedScheduleFirst: { uid },
    selectedScheduleSecond,
  } = useSelector((state) => state.schedule);

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="second-hour-container">
      {loadedData
        .filter((el) => el.level === level && el.uid !== uid)
        .map((schedule, index) => {
          return (
            <div
              className="schedule"
              style={{ background: "yellow", marginBottom: "50px" }}
              key={index}
            >
              <ScheduleItem schedule={schedule} path="Second" />
            </div>
          );
        })}
      {formule === "2h par semaine" ? (
        <button
          onClick={() =>
            handleButtonClick(2, selectedScheduleSecond, setShowModal)
          }
        >
          Valider
        </button>
      ) : (
        <button
          onClick={() =>
            handleButtonClick(
              1,
              selectedScheduleSecond,
              null,
              navigate,
              "troisieme-heure"
            )
          }
        >
          Suivant
        </button>
      )}

      {showModal && <ConfirmationModal />}
    </div>
  );
}
