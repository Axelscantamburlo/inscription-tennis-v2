import React, { useState, useEffect } from "react";
// FUNCTIONS
import { convertLevelToWord } from "../../../../../functions/convertLevelToWord";

export default function InfoUserTab1({ infoPlayeurClick }) {
  const formatDate = (date) => {
    if (date) {
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    } else return "Pas renseigné";
  };
  return (
    <>
      {infoPlayeurClick?.length === 0 && <h2>Pas d'informations</h2>}
      {infoPlayeurClick?.map((user, index) => {
        if (index !== 0) return null; // Ignore tous les éléments sauf le premier
        const { name, birthDay, level } = user;
        return (
          <div key={index} className="tab-container">
            <h2 style={{ textTransform: "uppercase" }}>
              <span>Nom :</span> {name || "Pas renseigné"}
            </h2>

            <h2>
              <span>Date de naissance :</span>{" "}
              {birthDay ? formatDate(birthDay) : "Pas renseigné"}
            </h2>
            <h2>
              <span>Niveau :</span>{" "}
              {level ? convertLevelToWord(level) : "Pas renseigné"}
            </h2>
          </div>
        );
      })}
    </>
  );
}
