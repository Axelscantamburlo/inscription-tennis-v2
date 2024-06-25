import React, { useEffect, useState } from "react";
import NavBar from "../../navBar/NavBar";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../../../config/firebase-config";
import SchedulesTestAdmin from "./SchedulesTestAdmin/SchedulesTestAdmin";

export default function ShowAllTestSchedules() {
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
    const replay = onSnapshot(collection(db, "test-schedules"), (snapshot) => {
      getSchedulesTest();
    });

    return () => {
      replay();
    };
  }, []);
  return (
    <div className="show-all-schedules-container">
      <NavBar toggleClassName={1} />

      <div className="schedules-container">
        {testSchedules
          .sort((a, b) => a.order - b.order)
          ?.map((schedule, index) => (
            <React.Fragment key={index}>
              <SchedulesTestAdmin schedule={schedule} />
            </React.Fragment>
          ))}
      </div>
    </div>
  );
}
