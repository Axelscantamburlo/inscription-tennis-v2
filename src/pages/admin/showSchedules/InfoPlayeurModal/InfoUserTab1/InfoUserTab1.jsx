import React, { useState, useEffect } from "react";
// FUNCTIONS
import { convertLevelToWord } from "../../../../../functions/convertLevelToWord";

export default function InfoUserTab1({ infoPlayeurClick }) {
  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };
  return (
    <>
      {infoPlayeurClick.map((user, index) => {
        const {
          name,
          email,
          formule,
          birthDay,
          level,
          phone,
          priceToPay,
          sexe,
        } = user;
        return (
          <div key={index} className="tab-container">
            <h2>Nom: {name.toUpperCase()}</h2>
            <h2>Sexe: {sexe}</h2>
            <h2>Date de naissance: {formatDate(birthDay)}</h2>
            <h2>Niveau: {convertLevelToWord(level)}</h2>
            <h2>Tel: {phone}</h2>
            <h2>Email: {email}</h2>
            {/* <h2>Formule: {formule}</h2> */}
            </div>
        );
      })}
    </>
  );
}
