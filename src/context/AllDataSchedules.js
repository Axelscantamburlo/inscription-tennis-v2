import { createContext, useEffect, useState } from "react";
import { db } from "../config/firebase-config";
import { collection, getDocs } from "firebase/firestore";

export const AllDataSchedules = createContext()

export const AllDataSchedulesProvider = ({children}) => {
    const [loadedData, setLoadedData] = useState([])

    const loadDataSchedules = async () => {
        const querySnapshot = await getDocs(collection(db, "schedules"));
        const dataArr = [] 
        querySnapshot.forEach((doc) => {
          dataArr.push(doc.data())
          
        });
        setLoadedData(dataArr)
      }
      useEffect(() => {
        loadDataSchedules()
      }, [])

      return(
        <AllDataSchedules.Provider value={{loadedData}} >
            {children}
        </AllDataSchedules.Provider>
      )
}