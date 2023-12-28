import React, {useState, useEffect} from "react";



export default function InfoUserTab1({infoUserClick}) {
  


  return (
    <div>
      {infoUserClick.map((user, index) => {
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
          <div key={index}>
            <h2>{name}</h2>
            <h2>{birthDay}</h2>
            <h2>{level}</h2>
            <h2>{phone}</h2>
            <h2>{email}</h2>
            <h2>{formule}</h2>
            <h2>{priceToPay}</h2>
            <h2>{sexe}</h2>
          </div>
        );
      })}
    </div>
  );
}
