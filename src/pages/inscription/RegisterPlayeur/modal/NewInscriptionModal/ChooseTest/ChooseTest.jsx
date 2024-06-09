import React, { useEffect, useState } from "react";
// HOOK
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../../../config/firebase-config";
import { useLocation } from "react-router-dom";
import ConfirmInscriptionTest from "../ConfirmInscriptionTest/ConfirmInscriptionTest";
import { useSelector } from "react-redux";

export default function ChooseTest() {
  const { name, level } = useSelector((state) => state.user);
  console.log(level);
  const [testSchedules, setTestSchedules] = useState([]);
  const getSchedulesTest = async () => {
    const dataArr = [];
    const querySnapShot = await getDocs(collection(db, "test-schedules"));
    querySnapShot.forEach((doc) => {
      const dataWithUid = { ...doc.data(), uid: doc.id };
      dataArr.push(dataWithUid);
    });
    setTestSchedules(dataArr);
  };
  useEffect(() => {
    getSchedulesTest();
  }, []);

  const [isSelected, setIsSelected] = useState(null);
  const [testChoose, setTestChoose] = useState({});

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="inscription-schedules-container">
      <h1 style={{ textAlign: "center", marginTop: "15px" }}>
        Choisissez votre heure de test
      </h1>
      <div className="schedules-container">
        {testSchedules
          ?.filter((el) => el.level === level)
          ?.map((schedule, index) => {
            const { date, level, numberOfPlaces, usersRegisted } = schedule;

            return (
              <div
                className="schedule-card"
                key={index}
                style={{
                  border: isSelected === index ? "4px solid green" : "none",
                }}
              >
                <h2>{date}</h2>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${
                        (usersRegisted.length / numberOfPlaces) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="bottom-card">
                  <p>
                    {numberOfPlaces - usersRegisted.length} place(s)
                    disponible(s)
                  </p>
                  <button
                    style={
                      numberOfPlaces - usersRegisted.length === 0
                        ? { opacity: "0.5" }
                        : null
                    }
                    onClick={() =>
                      // numberOfPlaces - usersRegisted.length !== 0 &&
                      // // handleChooseSchedule()
                      {
                        setIsSelected(index);
                        setTestChoose(schedule);
                      }
                    }
                  >
                    Choisir cette heure
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      <button className="submit-btn" onClick={() => setOpenModal(true)}>
        Valider
      </button>
      {openModal && (
        <ConfirmInscriptionTest
          setOpenModal={setOpenModal}
          testChoose={testChoose}
          name={name}
        />
      )}
    </div>
  );
}
