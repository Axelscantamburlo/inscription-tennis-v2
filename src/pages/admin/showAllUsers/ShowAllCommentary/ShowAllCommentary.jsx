import React, { useState, useEffect, use } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../../../config/firebase-config";
import { useLocation } from "react-router-dom";
import NavBar from "../../navBar/NavBar";

export default function ShowAllCommentary() {
  const location = useLocation();
  // const { selectedSchedule } = location.state;

  const [commentary, setCommentary] = useState([]);
  const getCommentary = async () => {
    const dataArr = [];
    const querySnapShot = await getDocs(collection(db, "commentary"));
    querySnapShot.forEach((doc) => {
      dataArr.push(doc.data());
    });
    setCommentary(dataArr);
  };
  useEffect(() => {
    const replay = onSnapshot(collection(db, "commentary"), (snapshot) => {
      getCommentary();
    });

    return () => {
      replay();
    };
  }, []);

  return (
    <div className="show-all-commentary-container">
      <NavBar toggleClassName={3} />
      <div className="commentary-container">
        {commentary?.map((el) => {
          return (
            <div className="commentary-card">
              <h2 style={{ textTransform: "uppercase" }}>{el.name}</h2>
              <p>{el.commentary}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
