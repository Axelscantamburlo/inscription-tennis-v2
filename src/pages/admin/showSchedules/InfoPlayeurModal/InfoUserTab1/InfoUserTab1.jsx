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
          adress
        } = user;
        return (
          <div key={index} className="tab-container">
            <h2><span>Nom :</span> {name.toUpperCase()}</h2>
            <h2><span>Civilité :</span>  {sexe}</h2>
            <h2><span>Nationalité :</span> {nationality}</h2>
            <h2><span>Date de naissance :</span>  {formatDate(birthDay)}</h2>
            <h2><span>Niveau :</span> {convertLevelToWord(level)}</h2>
            <h2><span>Tel :</span> {phone}</h2>
            <h2><span>Email :</span> {email}</h2>
            <h2><span>Profession :</span> {job}</h2>
            <h2><span>Adresse postale :</span> {adress}</h2>
            {/* <h2>Formule: {formule}</h2> */}
            </div>
        );
      })}
    </>
  );
}
