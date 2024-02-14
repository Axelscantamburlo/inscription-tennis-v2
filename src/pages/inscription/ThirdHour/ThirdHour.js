import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';

// COMPONENT
import ScheduleItem from "../ScheduleItem/ScheduleItem";
import ConfirmationModal from "../Schedules/confirmationModal/ConfirmationModal";

// CONTEXT
import { AllDataSchedules } from "../../../context/AllDataSchedules";
import { useModal } from '../../../context/ModalContext';
// REDUX
import {useSelector} from 'react-redux'

//FUNCTIONS
import { handleButtonClick } from '../../../functions/handleButtonClick';

export default function ThirdHour() {

  const navigate = useNavigate();
  // récupérer les tableaux à mapper à l'utilisateur
  const { loadedData } = useContext(AllDataSchedules);

  // récucpérer les infos de l'utilisateur (son niveau)
  const {level} = useSelector((state) => state.user);

    const { selectedScheduleFirst: { uid: uidFirst }, selectedScheduleSecond: { uid: uidSecond }, selectedScheduleThird } = useSelector((state) => state.schedule);

    const [showModal, setShowModal] = useState(false);

    const {openModal1, modal1} = useModal()

    return (
    <div className='third-hour-container'>
      {loadedData
        .filter((el) => el.level === level && el.uid !== uidFirst && el.uid !== uidSecond)
        .map((schedule, index) => {
          return (
            <div
              className="schedule"
              style={{ background: "yellow", marginBottom: "50px" }}
              key={index}
            >
              <ScheduleItem schedule={schedule} path="Third" />
            </div>
          );
        })}

      <button onClick={() => handleButtonClick(2, selectedScheduleThird, openModal1)}>Valider</button>
    {modal1 && <ConfirmationModal />}
    </div>
  )
}
