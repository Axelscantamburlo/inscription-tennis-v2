import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../../../config/firebase-config";
import { convertLevelToWord } from "../../../../../functions/convertLevelToWord";

export default function SchedulesTestAdmin({ schedule }) {
  const { date, level, usersRegisted, numberOfPlaces } = schedule;

  // Calculer le nombre de places restantes
  const remainingPlaces = numberOfPlaces - usersRegisted.length;

  // Créer un tableau avec les éléments de usersRegisted et des cases vides
  const tableData = Array.from(usersRegisted).concat(
    Array(remainingPlaces).fill("")
  );

  console.log(tableData);
  return (
    <div className="schedule-card">
      <div className="header-card">
        <h2>{date}</h2>
        <div>
          <p>{level}</p>
        </div>
      </div>
      <table>
        <tbody style={{ backgroundColor: "var(--grey-color)" }}>
          {tableData.map((item, index) => (
            <tr key={index} style={{ height: "50px" }}>
              <td className="item" style={{ justifyContent: "center" }}>
                {item}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
