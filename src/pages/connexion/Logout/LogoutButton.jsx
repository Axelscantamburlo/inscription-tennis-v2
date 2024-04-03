import React, { useState } from "react";
// Icons
import { IoSettingsOutline } from "react-icons/io5";
// COMPONENTS
import ConfirmLogoutModal from "./ConfirmLogoutModal/ConfirmLogoutModal";
import ConfirmDeleteAccountModal from "./ConfirmDeleteAccountModal/ConfirmDeleteAccountModal";

const LogoutButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [openModal1, setOpenModal1] = useState(false)
  const [openModal2, setOpenModal2] = useState(false)
  return (
    <div className="logout-container" onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}    >
      <IoSettingsOutline
        className="settings-icon"
        
      />
      {isHovered && (
        <div className="logout-box">
          <button className="logout-button" onClick={() => setOpenModal1(true)}>Déconnexion</button>
          <button className="logout-button" onClick={() => setOpenModal2(true)}>Supprimer le compte</button>
        </div>
      )}
      {openModal1 && <ConfirmLogoutModal setOpenModal1={setOpenModal1}/>}
      {openModal2 && <ConfirmDeleteAccountModal setOpenModal2={setOpenModal2}/>}
    </div>
  );
};

export default LogoutButton;
