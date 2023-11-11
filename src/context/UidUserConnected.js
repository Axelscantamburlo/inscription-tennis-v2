import { createContext, useEffect, useState } from "react";
import { db, auth } from "../config/firebase-config";
import { getAuth, onAuthStateChanged } from "firebase/auth";


export const UidUserConnected = createContext();

export const UidUserConnectedProvider = ({ children }) => {
  const [uid, setUid] = useState('');
  const getUid = async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUid(uid)
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  };
  useEffect(() => {
    getUid();
    console.log('jouée');
  }, [auth]);

  return (
    <UidUserConnected.Provider value={{ uid }}>
      {children}
    </UidUserConnected.Provider>
  );
};
