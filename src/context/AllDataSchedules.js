import { createContext, useEffect, useState } from "react";
import { db } from "../config/firebase-config";
import { collection, getDocs, onSnapshot } from "firebase/firestore";

export const AllDataSchedules = createContext()

export const AllDataSchedulesProvider = ({children}) => {
    const [loadedData, setLoadedData] = useState([])

    const loadDataSchedules = async () => {
        const querySnapshot = await getDocs(collection(db, "schedules"));
        const dataArr = [] 
        const dataWithUid = []
        querySnapshot.forEach((doc) => {
          const dataWithUid = { ...doc.data(), uid: doc.id };
          dataArr.push(dataWithUid);
        });
        setLoadedData(dataArr)
      }
      useEffect(() => {
        const replay = onSnapshot(collection(db, "schedules"), (snapshot) => {
          loadDataSchedules();
        });
    
        return () => {
          replay();
        };
      }, []);

      return(
        <AllDataSchedules.Provider value={{loadedData}} >
            {children}
        </AllDataSchedules.Provider>
      )
}