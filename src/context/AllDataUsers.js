import { createContext, useEffect, useState } from "react";
import { db } from "../config/firebase-config";
import { collection, getDocs, onSnapshot } from "firebase/firestore";

export const AllDataUsers = createContext()

export const AllDataUsersProvider = ({children}) => {
    const [usersData, setUsersData] = useState([])

    const loadDataUsers = async () => {
        const querySnapshot = await getDocs(collection(db, "users"));
        const dataArr = [] 
        querySnapshot.forEach((doc) => {
            const playeurInfo = doc.data().playeurInfo.map((info) => ({ ...info, uid: doc.id }));
            dataArr.push(...playeurInfo);
        });
        setUsersData(dataArr)
      }
      useEffect(() => {
        const replay = onSnapshot(collection(db, "users"), (snapshot) => {
            loadDataUsers();
        });
    
        return () => {
          replay();
        };
      }, []);

      return(
        <AllDataUsers.Provider value={{usersData}} >
            {children}
        </AllDataUsers.Provider>
      )
}