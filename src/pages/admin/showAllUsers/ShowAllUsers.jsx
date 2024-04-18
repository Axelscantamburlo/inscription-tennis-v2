import React, { useContext, useEffect, useState } from "react";

// COMPONENT
import NavBar from "../navBar/NavBar";
import InfoPlayeurModal from "../showSchedules/InfoPlayeurModal/InfoPlayeurModal";

// CONTEXT
import { AllDataUsers } from "../../../context/AllDataUsers";

// FUNCTIONS
import { formatDate } from "../../../functions/formatDate";

// DEPENDENCIE

import * as XLSX from "xlsx";

// ICONS
import { RiFileDownloadLine } from "react-icons/ri";

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

  // DOWNLAND TO Excel
  const downloadExcelFile = () => {
    const editUsersDataArray = usersData.map(
      ({
        birthDay,
        email,
        name,
        sexe,
        nationality,
        job,
        adress,
        typePaiement,
      }) => ({
        "date de naiss": birthDay,
        email,
        "nom et prénom": name,
        sexe,
        nationaité: nationality,
        profession: job,
        adresse: adress,
        "paiement en": typePaiement,
      })
    );

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(editUsersDataArray);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
    XLSX.writeFile(wb, "info-adhérents.xlsx");
  };

  const currentTimestamp = new Date().getTime();
  const [showModal2, setShowModal2] = useState(false);
  const [playeurClick, setPlayeurClick] = useState("");
  return (
    <div className="show-all-users-container">
      <NavBar toggleClassName={3} />
      <div className="header-container">
        <div className="inputs">
          <input
            type="text"
            value={searchBar}
            onChange={(e) => filterName(e.target.value)}
            placeholder="Rechercher par nom"
          />
        </div>
        <RiFileDownloadLine
          title="Télécharger le fichier excel"
          className="icon"
          onClick={downloadExcelFile}
        />
      </div>

      <div className="users-container">
        {(searchBar.length >= 2 ? filteredPlayeursInfos : usersData).map(
          (playeurInfo, index) => {
            const { name, isPayed, dateInscription } = playeurInfo;
            const limitePaiement =
              dateInscription?.seconds * 1000 +
              dateInscription?.nanoseconds / 1000000 +
              604800000;
            return (
              <div
                className="user-card"
                key={index}
                onClick={() => {
                  setShowModal2(true);
                  setPlayeurClick(name);
                }}
                // style={isPayed ? {border: '3px solid #2E933C'} : {border: '3px solid var(--red-color)'}}
                style={
                  isPayed
                    ? { border: "3px solid #2E933C" }
                    : currentTimestamp > limitePaiement
                    ? { border: "3px solid var(--red-color)" }
                    : { border: " 3px solid orange" }
                }
              >
                <h2>{name}</h2>
                <p>
                  Date inscription:{" "}
                  {dateInscription
                    ? `le ${formatDate(dateInscription)}`
                    : " Pas renseigné "}
                </p>
                {isPayed ? <p>Payé</p> : <p>Pas payé</p>}
              </div>
            );
          }
        )}
      </div>
      {showModal2 && (
        <InfoPlayeurModal
          playeurClick={playeurClick}
          setShowModal2={setShowModal2}
        />
      )}
    </div>
  );
}
