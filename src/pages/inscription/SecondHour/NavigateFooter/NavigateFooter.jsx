import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { selectSchedule } from "../../../../redux/actions";
// COMPOSANT
import ConfirmationModal from "../../Schedules/confirmationModal/ConfirmationModal";
// FUNCTION
import { handleButtonClick } from "../../../../functions/handleButtonClick";

const PreviousHourButtons = ({
  path,
  previousPath,
  selectedSchedule,
  nextPath,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formule } = useSelector((state) => state.user);
  const navigatePreviousHour = () => {
    dispatch(selectSchedule(null, path));
    navigate(`/inscrire-un-joueur/${previousPath}`);
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="navigation-footer">
      <button
        className="validate-button"
        onClick={() =>
          handleButtonClick(
            /^1h par semaine/.test(formule) ||
              (previousPath === "inscription" &&
                !formule?.includes("Forme jouée 3h par semaine")) ||
              previousPath === "inscription/deuxieme-heure"
              ? 2
              : 1,
            selectedSchedule,
            setOpenModal,
            setErrorMessage,
            navigate,
            /^1h par semaine/.test(formule) ||
              (previousPath === "inscription" &&
                !formule?.includes("Forme jouée 3h par semaine")) ||
              previousPath === "inscription/deuxieme-heure"
              ? null
              : nextPath
          )
        }
      >
        {/^1h par semaine/.test(formule) ||
        (previousPath === "inscription" &&
          !formule?.includes("Forme jouée 3h par semaine")) ||
        previousPath === "inscription/deuxieme-heure"
          ? "Valider"
          : "Suivant"}
      </button>
      <NavLink to={"/emettre-un-souhait"}>
        <p style={{ marginLeft: "300px" }}>
          Emettre un souhait si aucun créneau ne vous convient
        </p>
      </NavLink>
      {path !== "" && (
        <button
          className="validate-button previous-btn"
          onClick={() => navigatePreviousHour()}
        >
          Précédent
        </button>
      )}

      {errorMessage && <span style={{marginBottom: '20px', fontSize: '20px'}} className="error-message">{errorMessage}</span>}
      {openModal && <ConfirmationModal setOpenModal={setOpenModal} />}
    </div>
  );
};

export default PreviousHourButtons;

// Third
