import React, { useContext, useEffect, useState } from "react";

// COMPONENT
import NavBar from "../navBar/NavBar";
import InfoPlayeurModal from "../showSchedules/InfoPlayeurModal/InfoPlayeurModal";

// CONTEXT
import { AllDataUsers } from "../../../context/AllDataUsers";

// FUNCTIONS
import { formatDate } from "../../../functions/formatDate";
import DeletePlayeurInfoModal from "../showSchedules/InfoPlayeurModal/DeletePlayeurInfoModal/DeletePlayeurInfoModal";
import { FaTrash } from "react-icons/fa";

// DEPENDENCIE

// import * as XLSX from "xlsx";

// // ICONS
// import { RiFileDownloadLine } from "react-icons/ri";

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

  useEffect(() => {
    filterName(searchBar);
  }, [usersData]);

  const [openModal, setOpenModal] = useState(false);

  const [playeurInfo, setPlayeurInfo] = useState({});

  const currentTimestamp = new Date().getTime();
  const [showModal2, setShowModal2] = useState(false);
  const [playeurClick, setPlayeurClick] = useState("");
  return (
    <div className="show-all-users-container">
      <NavBar toggleClassName={3} />
      <div className="stats-container">
        <h3>Nombre de pré-inscriptions: {usersData.length}</h3>
        <h3>
          Nombre de paiements:{" "}
          {usersData.filter((da) => da.isPayed === true).length}{" "}
        </h3>
      </div>
      <div className="header-container">
        <div className="inputs">
          <input
            type="text"
            value={searchBar}
            onChange={(e) => filterName(e.target.value)}
            placeholder="Rechercher par nom"
          />
        </div>
        {/* <RiFileDownloadLine
          title="Télécharger le fichier excel"
          className="icon"
          onClick={downloadExcelFile}
        /> */}
      </div>

      <div className="users-container">
        {(searchBar.length >= 2 ? filteredPlayeursInfos : usersData)
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((playeurInfo, index) => {
            const { name, isPayed, dateInscription, uid } = playeurInfo;
            const limitePaiement =
              dateInscription?.seconds * 1000 +
              dateInscription?.nanoseconds / 1000000 +
              604800000;

            return (
              <div
                className="user-card"
                key={index}
                style={
                  isPayed
                    ? { border: "5px solid #2E933C" }
                    : currentTimestamp > limitePaiement
                    ? { border: "5px solid var(--red-color)" }
                    : { border: " 5px solid orange" }
                }
              >
                <div
                  onClick={() => {
                    setShowModal2(true);
                    setPlayeurClick(name);
                  }}
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
                {uid.length <= 20 && (
                  <FaTrash
                    className="bin-icon"
                    onClick={() => {
                      setOpenModal(true);
                      setPlayeurInfo(playeurInfo);
                    }}
                  />
                )}
              </div>
            );
          })}
      </div>
      {showModal2 && (
        <InfoPlayeurModal
          playeurClick={playeurClick}
          setShowModal2={setShowModal2}
        />
      )}
      {openModal && (
        <DeletePlayeurInfoModal
          setOpenModal={setOpenModal}
          playeurInfo={playeurInfo}
        />
      )}
    </div>
  );
}
