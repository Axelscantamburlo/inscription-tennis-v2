import React, {useEffect, useState} from "react";
// FIREBASE
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase-config";

// COMPONENT
import NavBar from "../navBar/NavBar";

export default function ShowAllUsers() {

  const [playeursInfos, setPlayeursInfos] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const users = []
      querySnapshot.forEach((doc) => {
        const playeurInfoArr = doc.data().playeurInfo
        users.push(...playeurInfoArr)
      });
      setPlayeursInfos(users)
    };
    getUsers();
  }, []);

  const [searchBar, setSearchBar] = useState('')
  const [filteredPlayeursInfos, setFilteredPlayeursInfos] = useState([]);

  const filterName = (value) => {
    
    setSearchBar(value)
    if(!value) {
      setFilteredPlayeursInfos([])
    }
    const filteredUsers = playeursInfos.filter(user => user.name.toLowerCase().includes(value.toLowerCase()));
    setFilteredPlayeursInfos(filteredUsers)
  }
  return (
    <div className="ahow-all-users-containers">
      <NavBar />
      <h2>Renseignements joueurs</h2>
      <input type="text" value={searchBar} onChange={(e) => filterName(e.target.value)} placeholder="Rechercher par nom" />

      <div>
      {(searchBar ? filteredPlayeursInfos : playeursInfos)?.map((playeur, index) => {
          const { name, email, phone, level, birthDay, sexe, formule } = playeur;
          return (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>{name}</h3>
              <h3>{email}</h3>
              <h3>{phone}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
