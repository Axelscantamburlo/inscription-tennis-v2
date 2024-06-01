import React, { useState } from "react";
import ShowAllSchedules from "../ShowAllSchedules";
import ShowAllTestSchedules from "../ShowAllTestSchedules/ShowAllTestSchedules";

const NavbarTabs3 = () => {
  const [activeTab, setActiveTab] = useState("schedules");

  return (
    <div className="nav-bar-tabs-container">
      <nav>
        <ul>
          <li
            style={{
              cursor: "pointer",
              fontWeight: activeTab === "schedules" ? "bold" : "normal",
            }}
            onClick={() => setActiveTab("schedules")}
          >
            EDT
          </li>
          <li
            style={{
              cursor: "pointer",
              fontWeight: activeTab === "test-schedules" ? "bold" : "normal",
            }}
            onClick={() => setActiveTab("test-schedules")}
          >
            Tests
          </li>
        </ul>
      </nav>
      <div>
        {activeTab === "schedules" && <ShowAllSchedules />}
        {activeTab === "test-schedules" && <ShowAllTestSchedules />}
      </div>
    </div>
  );
};

export default NavbarTabs3;
