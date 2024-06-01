import React, { useState } from "react";
import CreateSchedules from "../CreateSchedules";
import CreateTest from "../CreateTest/CreateTest";

const NavbarTabs2 = () => {
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
        {activeTab === "schedules" && <CreateSchedules />}
        {activeTab === "test-schedules" && <CreateTest />}
      </div>
    </div>
  );
};

export default NavbarTabs2;
