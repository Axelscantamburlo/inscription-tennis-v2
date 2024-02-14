import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// CONTEXT
import { AllDataSchedules } from "../../../context/AllDataSchedules";
// COMPONENT
import ScheduleItem from "../ScheduleItem/ScheduleItem";
import ConfirmationModal from "./confirmationModal/ConfirmationModal";

// REDUX
import { useSelector, useDispatch } from "react-redux";

// FUNCTIONS
import { handleButtonClick } from "../../../functions/handleButtonClick";

// DATA

import { FORMULES } from "../../../data/formules";
import { setPlayeurInfo } from "../../../redux/actions";
import { useModal } from "../../../context/ModalContext";

// ///////////////////////
export default function InscriptionSchedules() {
  const navigate = useNavigate();

  // récupérer les tableaux à mapper à l'utilisateur
  const { loadedData } = useContext(AllDataSchedules);
  // récucpérer les infos de l'utilisateur (son niveau)
  const { level } = useSelector((state) => state.user);

  // récupérer le store redux pour vérifier si l'utilisateur à bien choisi une horaire
  const { selectedScheduleFirst } = useSelector((state) => state.schedule);

  // const [showModal, setShowModal] = useState(false);
  const {openModal1, modal1} = useModal()

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

  const [chooseFormule, setChooseFormule] = useState(level === 0 ? "50min par semaine" : "1h par semaine");
  const handleChangeFormule = (e) => {
    setChooseFormule(e.target.value);
  };
  
  return (
    <div className="inscription-schedules-container">
      <div className="schedules">
        <select name="formules" id="" onChange={handleChangeFormule}>
          {formules.map((formule, index) => (
            <option value={formule} key={index}>
              {formule}
            </option>
          ))}
        </select>
        {chooseFormule === "1h par semaine" ||
        chooseFormule === "2h par semaine" ? (
          <>
            {loadedData
              .filter((el) => el.level === level)
              .map((schedule, index) => {
                return (
                  <div
                    className="schedule"
                    style={{ background: "yellow", marginBottom: "50px" }}
                    key={index}
                  >
                    <ScheduleItem schedule={schedule} path="First" />
                  </div>
                );
              })}
          </>
        ) : null}
      </div>
      {chooseFormule === "1h par semaine" ? (
        <button
          onClick={() =>
            handleButtonClick(
              2,
              selectedScheduleFirst,
              openModal1,
              navigate,
              null
            )
          }
        >
          Valider
        </button>
      ) : (
        <button
          onClick={() =>
            handleButtonClick(
              1,
              selectedScheduleFirst,
              openModal1,
              navigate,
              "deuxieme-heure",
              chooseFormule
            )
          }
        >
          Suivant
        </button>
      )}

      {modal1 && <ConfirmationModal />}
    </div>
  );
}
