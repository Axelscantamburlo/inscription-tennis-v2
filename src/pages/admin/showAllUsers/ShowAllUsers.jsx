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

export default function ShowAllUsers() {
  // Récupérer et stocker tous les joueurs INSCRITS 
const {usersData} = useContext(AllDataUsers)

  // filtrer les joueurs lorsque on cherche dans la searchBar
  const [searchBar, setSearchBar] = useState("");
  const [filteredPlayeursInfos, setFilteredPlayeursInfos] = useState([]);

  const filterName = (value) => {
    setSearchBar(value);
    if (!value) {
      setFilteredPlayeursInfos([]);
    }
    const filteredUsers = usersData.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPlayeursInfos(filteredUsers);
  };

  // Open playeurInfo au onClick
  // const [showInfoPlayeurModal, setShowInfoPlayeurModal] = useState(false);
  const { modal1, openModal1 } = useModal();
  const [playeurClick, setPlayeurClick] = useState("");
  return (
    <div className="ahow-all-users-containers">
      <NavBar toggleClassName={3}/>
      <h2>Renseignements joueurs</h2>
      <input
        type="text"
        value={searchBar}
        onChange={(e) => filterName(e.target.value)}
        placeholder="Rechercher par nom"
      />

      <div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {(searchBar.length >= 2 ? filteredPlayeursInfos : usersData).map(
            (playeurInfo, index) => {
              const { name, isPayed } = playeurInfo;
              return (
                <div
                  key={index}
                  onClick={() => {
                    // setShowInfoPlayeurModal(true);
                    openModal1()
                    setPlayeurClick(name);
                  }}
                >
                  <h2>{name}</h2>
                  {isPayed ? <h2>Payé</h2> : <h2>Pas payé</h2>}
                </div>
              );
            }
          )}
        </div>
      </div>
      {modal1 && <InfoPlayeurModal playeurClick={playeurClick}  />}
    </div>
  );
}
