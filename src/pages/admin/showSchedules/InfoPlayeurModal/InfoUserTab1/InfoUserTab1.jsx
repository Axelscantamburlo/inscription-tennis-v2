import React, { useState, useEffect } from "react";
// FUNCTIONS
import { convertLevelToWord } from "../../../../../functions/convertLevelToWord";

export default function InfoUserTab1({ infoPlayeurClick }) {
  const formatDate = (date) => {
    console.log(date);
    if (date) {
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    } else return "Pas renseigné";
  };
  return (
    <>
      {infoPlayeurClick?.length === 0 && <h2>Pas d'informations</h2>}
      {infoPlayeurClick?.map((user, index) => {
        const {
          name,
          email,
          birthDay,
          level,
          phone,
          sexe,
          job,
          nationality,
          adress,
        } = user;
        return (
          <div key={index} className="tab-container">
            <h2 style={{ textTransform: "uppercase" }}>
              <span>Nom :</span> {name || "Pas renseigné"}
            </h2>
            <h2>
              <span>Civilité :</span> {sexe || "Pas renseigné"}
            </h2>
            <h2>
              <span>Nationalité :</span> {nationality || "Pas renseigné"}
            </h2>
            <h2>
              <span>Date de naissance :</span>{" "}
              {birthDay ? formatDate(birthDay) : "Pas renseigné"}
            </h2>
            <h2>
              <span>Niveau :</span>{" "}
              {level ? convertLevelToWord(level) : "Pas renseigné"}
            </h2>
            <h2>
              <span>Tel :</span> {phone || "Pas renseigné"}
            </h2>
            <h2>
              <span>Email :</span> {email || "Pas renseigné"}
            </h2>
            <h2>
              <span>Profession :</span> {job || "Pas renseigné"}
            </h2>
            <h2>
              <span>Adresse postale :</span> {adress || "Pas renseigné"}
            </h2>
          </div>
        );
      })}
    </>
  );
}
