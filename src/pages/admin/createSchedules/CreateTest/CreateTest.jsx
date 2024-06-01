import React, { useEffect, useState } from "react";
// FIREBASE
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../config/firebase-config";
// COMPONENTS
import NavBar from "../../navBar/NavBar";
import CreateScheduleModal from "../CreateScheduleModal/CreateScheduleModal";
import { convertLevelToWord } from "../../../../functions/convertLevelToWord";
import DeleteScheduleModal from "../DeleteScheduleModal/DeleteScheduleModal";

export default function CreateTest() {
  const [testSchedules, setTestSchedules] = useState([]);
  const getSchedulesTest = async () => {
    const dataArr = [];
    const querySnapShot = await getDocs(collection(db, "test-schedules"));
    querySnapShot.forEach((doc) => {
      dataArr.push(doc.data());
    });
    setTestSchedules(dataArr);
  };
  useEffect(() => {
    getSchedulesTest();
  }, []);

  const [openModal0, setOpenModal0] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);

  const [scheduleClick, setScheduleClick] = useState({});

  return (
    <div className="create-schedules-container">
      <NavBar toggleClassName={2} />
      <div className="schedules-container">
        {testSchedules.map((schedule, index) => {
          const {
            day,
            startHour,
            endHour,
            level,
            numberOfPlaces,
            educator,
            playedForm,
            uid,
          } = schedule;
          return (
            <div className="schedule-card" key={index}>
              <h3 style={{ textAlign: "center" }}>Test</h3>
              <div className="contents">
                <div className="content">
                  <span>Jour : </span>
                  <span>{day}</span>
                </div>
                <div className="content">
                  <span>Horaires :</span>
                  <span>
                    De {startHour} à {endHour}
                  </span>
                </div>
                <div className="content">
                  <span>Niveau : </span>
                  <span> {convertLevelToWord(level)}</span>
                </div>
                <div className="content">
                  <span>Nombre de places :</span>
                  <span>{numberOfPlaces}</span>
                </div>
                <div className="content">
                  <span>Formule : </span>
                  <span>
                    {playedForm === "0" ? "Classique" : "Forme jouée"}
                  </span>
                </div>
                <div className="content">
                  <span>Enseignant :</span>
                  <span>{educator}</span>
                </div>
              </div>
              <div className="buttons">
                <button
                  className="cancel-button"
                  onClick={() => {
                    setOpenModal2(true);
                    setScheduleClick({ ...schedule });
                  }}
                >
                  Supprimer
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <button className="submit-btn" onClick={() => setOpenModal0(true)}>
        Ajouter un créneau
      </button>
      {openModal0 && (
        <CreateScheduleModal
          path="test-schedules"
          setOpenModal0={setOpenModal0}
        />
      )}
      {openModal2 && (
        <DeleteScheduleModal
          scheduleClick={scheduleClick}
          setOpenModal2={setOpenModal2}
          path="test-schedules"
        />
      )}
    </div>
  );
}
