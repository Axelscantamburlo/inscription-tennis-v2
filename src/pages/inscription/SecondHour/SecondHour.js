import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
  const dispatch = useDispatch()
  // récupérer les tableaux à mapper à l'utilisateur
  const { loadedData } = useContext(AllDataSchedules);

  // récucpérer les infos de l'utilisateur (son niveau)
  const { level, formule } = useSelector((state) => state.user);

  // récupérer le store redux pour vérifier si l'utilisateur à bien choisi une horaire
  const {
    selectedScheduleFirst: { uid },
    selectedScheduleSecond,
  } = useSelector((state) => state.schedule);

  const [showModal, setShowModal] = useState(false);

  // naviguer à l'heure précédente: supprimer le schedule séléctionné dans redux

  const navigatePreviousHour = () => {
    dispatch(selectSchedule(null, 'Second'));  
    navigate('/inscrire-un-joueur/inscription')

  }

  const {openModal1, modal1} = useModal()

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
            handleButtonClick(2, selectedScheduleSecond, openModal1)
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
      <button onClick={() => navigatePreviousHour()}>Précédent </button>

      {modal1 && <ConfirmationModal />}
    </div>
  );
}
