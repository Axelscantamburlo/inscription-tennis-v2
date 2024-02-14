import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase-config";

export const fetchDataFunction = async () => {
  console.log('yo');
    try {

      const querySnapshot = await getDocs(collection(db, "schedules"));
        const dataArr = [] 
        querySnapshot.forEach((doc) => {
          const dataWithUid = { ...doc.data(), uid: doc.id };
          dataArr.push(dataWithUid);
        });
        return dataArr
    } catch (error) {
      // Gérer les erreurs
      console.error("Error fetching data from Firebase: ", error);
      throw error;
    }
  };