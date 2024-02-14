import { createContext, useEffect, useState } from "react";
import { db } from "../config/firebase-config";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";



export const AllDataSchedules = createContext();

export const AllDataSchedulesProvider = ({ children }) => {
  const [loadedData, setLoadedData] = useState([]);
  
  const loadDataSchedules = async () => {
    // const querySnapshot = await getDocs(collection(db, "schedules"));
    const q = query(collection(db, "schedules"));
    const querySnapshot = await getDocs(q);
    const dataArr = [];
    querySnapshot.forEach((doc) => {
      const dataWithUid = { ...doc.data(), uid: doc.id };
      dataArr.push(dataWithUid);
    });
    setLoadedData(dataArr);

  };
  useEffect(() => {
    const replay = onSnapshot(collection(db, "schedules"), (snapshot) => {
      loadDataSchedules();
    });

    return () => {
      replay();
    };
  }, []);

  return (
    <AllDataSchedules.Provider value={{ loadedData }}>
      {children}
    </AllDataSchedules.Provider>
  );
};
