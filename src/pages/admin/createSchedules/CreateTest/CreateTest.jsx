import React, { useEffect, useState } from "react";
// FIREBASE
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../config/firebase-config";
// COMPONENTS
import NavBar from "../../navBar/NavBar";

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

  const [openModal2, setOpenModal2] = useState(false);

  const [scheduleClick, setScheduleClick] = useState({});

  return (
    <div className="create-schedules-container">
      <NavBar toggleClassName={2} />
      <div className="schedules-container">
        {testSchedules.map((schedule, index) => {
          const {
           date, 
           level,
           numberOfPlaces
  
          } = schedule;
          return (
            <div className="schedule-card" key={index}>
              <h3 style={{ textAlign: "center" }}>Test</h3>
              <div className="contents">
                <div className="content">
                  <span>Date : </span>
                  <span>{date}</span>
                </div>
                <div className="content">
                  <span>Niveau : </span>
                  <span>{level}</span>
                </div>
                <div className="content">
                  <span>Nombre de places :</span>
                  <span>{numberOfPlaces}</span>
                </div>
              
              </div>
              {/* <div className="buttons">
                <button
                  className="cancel-button"
                  onClick={() => {
                    setOpenModal2(true);
                    setScheduleClick({ ...schedule });
                  }}
                >
                  Supprimer
                </button>
              </div> */}
            </div>
          );
        })}
      </div>
      {/* <button className="submit-btn" onClick={() => setOpenModal0(true)}>
        Ajouter un créneau
      </button> */}

      {/* {openModal2 && (
        <DeleteScheduleModal
          scheduleClick={scheduleClick}
          setOpenModal2={setOpenModal2}
          path="test-schedules"
        />
      )} */}
    </div>
  );
}
