import React, { useContext, useEffect, useState } from "react";
// REDUX
import { useSelector, useDispatch } from "react-redux";
import { selectSchedule } from "../../../redux/actions";
// HOOKS
import { usePlayeurInscription } from "../../../hooks/usePlayeurInscription";
// COMPONENTS
import ConfirmationModal from "../Schedules/confirmationModal/ConfirmationModal";
import RefusePriority from "./RefusePriority";

export default function PriorityInscription() {
  const { name } = useSelector((state) => state.user);
  const playeurInscription = usePlayeurInscription(name);
  const [schedulesRegisted, setSchedulesRegisted] = useState([]);

  useEffect(() => {
    if (Object.keys(playeurInscription).length > 0) {
      const selectedSchedules = Object.values(playeurInscription)
        .filter((schedule) => schedule && Object.keys(schedule).length > 0)
        .map(
          (schedule) =>
            `${schedule.day} de ${schedule.startHour} à ${schedule.endHour}`
        );

      setSchedulesRegisted(selectedSchedules);
    }
  }, [playeurInscription]);
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);

  const handleAccept = () => {
    dispatch(selectSchedule(playeurInscription[0], "First"));
    setOpenModal(true);
  };
  const dataPlayeur = {
    name: name,
    birthDay: "",
  };
  return (
    <div className="priority-inscription-container">
      <div className="card">
        <h1
          className="title"
          style={{ color: "var(--background-color)", margin: "10px 0" }}
        >
          Bonne nouvelle ! <br /> Vous êtes prioritaire sur le créneau du :
        </h1>
        {schedulesRegisted.length > 0 ? (
          schedulesRegisted.map((schedule, index) => (
            <h2 style={{ fontWeight: "bold" }} key={index}>
              {schedule}
            </h2>
          ))
        ) : (
          <h2 style={{ fontWeight: "bold" }}>Aucun créneau trouvé</h2>
        )}
        <p>
          Vous avez la possibilité d'accepter ou de refuser ce créneau qui vous
          était attribué l'année précédente. En cas de refus, votre inscription
          à un autre créneau ne sera possible qu'à partir du ?? juin.
        </p>
        <div className="buttons">
          <button className="cancel-button" onClick={() => setOpenModal2(true)}>
            Refuser
          </button>
          <button className="confirm-button" onClick={handleAccept}>
            Accepter
          </button>
        </div>
      </div>
      {openModal && (
        <ConfirmationModal setOpenModal={setOpenModal} isPriority={true} />
      )}
      {openModal2 && (
        <RefusePriority
          setOpenModal2={setOpenModal2}
          name={dataPlayeur}
          uid={playeurInscription[0].uid}
        />
      )}
    </div>
  );
}
