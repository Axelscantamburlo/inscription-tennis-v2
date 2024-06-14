import React, { useState, useEffect, use } from "react";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
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
      const dataWithUid = { ...doc.data(), uid: doc.id };
      dataArr.push(dataWithUid);
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

  const toggleStatus = async (id, currentStatus) => {
    const commentaryRef = doc(db, "commentary", id);
    await updateDoc(commentaryRef, {
      status: !currentStatus,
    });
    // getCommentary(); // Refresh the commentary list after status toggle
  };

  return (
    <div className="show-all-commentary-container">
      <NavBar toggleClassName={3} />
      <div className="commentary-container">
        {commentary?.map((el, index) => {
          return (
            <div
              className="commentary-card"
              key={index}
              style={el.status ? { backgroundColor: "green" } : null}
            >
              <h2 style={{ textTransform: "uppercase" }}>{el.name}</h2>
              <p>{el.commentary}</p>
              <button
                onClick={() => toggleStatus(el.uid, el.status)}
                style={
                  el.status
                    ? { background: "var(--red-color)" }
                    : { background: "var(--linear-gradient)" }
                }
              >
                Demande traitée
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
