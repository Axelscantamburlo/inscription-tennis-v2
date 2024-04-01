import React, { useContext, useEffect, useState } from "react";
// FIREBASE
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../../config/firebase-config";

// COMPONENT
import NavBar from "../navBar/NavBar";
import InfoPlayeurModal from "../showSchedules/InfoPlayeurModal/InfoPlayeurModal";

// CONTEXT
import { useModal } from "../../../context/ModalContext";
import { AllDataUsers } from "../../../context/AllDataUsers";

// FUNCTIONS
import { formatDate } from "../../../functions/formatDate";

// DEPENDENCIE
// import {XLSX} from 'xlsx'


export default function ShowAllUsers() {
  // Récupérer et stocker tous les joueurs INSCRITS
  const { usersData } = useContext(AllDataUsers);
  // filtrer les joueurs lorsque on cherche dans la searchBar
  const [searchBar, setSearchBar] = useState("");
  const [filteredPlayeursInfos, setFilteredPlayeursInfos] = useState([]);

  const filterName = (value) => {
    setSearchBar(value);
    if (!value) {
      setFilteredPlayeursInfos([]);
    }
    const filteredUsers = usersData.filter((user) =>
      user.name.trim().toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPlayeursInfos(filteredUsers);
  };


  // const handleDownload = () => {
  //   const wb = XLSX.utils.book_new()
  //    const ws = XLSX.utils.json_to_sheet(usersData)
  //    XLSX.utils.book_append_sheet(wb, ws, "MySheet1")
  //    XLSX.writeFile(wb, "MyExcel.xlsx")
  // };
 

  const [showModal2, setShowModal2] = useState(false);
  const [playeurClick, setPlayeurClick] = useState("");
  return (
    <div className="show-all-users-container">
      <NavBar toggleClassName={3} />
      <div className="inputs">
        <input
          type="text"
          value={searchBar}
          onChange={(e) => filterName(e.target.value)}
          placeholder="Rechercher par nom"
        />
      </div>

      <div className="users-container">
        {(searchBar.length >= 2 ? filteredPlayeursInfos : usersData).map(
          (playeurInfo, index) => {
            const { name, isPayed, dateInscription } = playeurInfo;
            return (
              <div
                className="user-card"
                key={index}
                onClick={() => {
                  setShowModal2(true);
                  setPlayeurClick(name);
                }}
                style={isPayed ? {border: '3px solid #2E933C'} : {border: '3px solid var(--red-color)'}}
                
              >
                <h2>{name.toUpperCase()}</h2>
                <p>{formatDate(dateInscription)}</p>
                {isPayed ? <p>Payé</p> : <p>Pas payé</p>}
              </div>
            );
          }
        )}
      </div>
      {/* <button onClick={handleDownload}>Cliquer</button> */}
      {showModal2 && <InfoPlayeurModal playeurClick={playeurClick} setShowModal2={setShowModal2} />}
    </div>
  );
}
