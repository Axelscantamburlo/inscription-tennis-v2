import React, { useState } from "react";
import ShowAllUsers from "../ShowAllUsers";
import ShowAllCommentary from "../ShowAllCommentary/ShowAllCommentary";

const NavbarTabs = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="nav-bar-tabs-container">
      <nav>
        <ul>
          <li
            style={{
              cursor: "pointer",
              fontWeight: activeTab === "users" ? "bold" : "normal",
            }}
            onClick={() => setActiveTab("users")}
          >
            Inscrits
          </li>
          <li
            style={{
              cursor: "pointer",
              fontWeight: activeTab === "commentary" ? "bold" : "normal",
            }}
            onClick={() => setActiveTab("commentary")}
          >
            Souhaits
          </li>
        </ul>
      </nav>
      <div>
        {activeTab === "users" && <ShowAllUsers />}
        {activeTab === "commentary" && <ShowAllCommentary />}
      </div>
    </div>
  );
};

export default NavbarTabs;
