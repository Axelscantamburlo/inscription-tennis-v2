import React, { useEffect, useState } from "react";
import NavBar from "../../navBar/NavBar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../config/firebase-config";
import SchedulesTestAdmin from "./SchedulesTestAdmin/SchedulesTestAdmin";

export default function ShowAllTestSchedules() {
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
  return (
    <div className="show-all-schedules-container">
      <NavBar toggleClassName={1} />

      <div className="schedules-container">
        {testSchedules?.map((schedule, index) => (
          <React.Fragment key={index}>
            <SchedulesTestAdmin schedule={schedule} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
