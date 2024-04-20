import React, { useState, useEffect, use } from "react";
import NavBar from "../navBar/NavBar";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../../config/firebase-config";

export default function ShowAllCommentary() {
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
      <div className="users-container">
        {commentary?.map((el) => {
          return (
            <div className="user-card">
              {el.name}
              {el.commentary}
            </div>
          );
        })}
      </div>
    </div>
  );
}
