import React from "react";

export default function InputFields({ scheduleCreate, handleInputChange }) {

    const {day, startHour, endHour, level, numberOfPlaces, playedForm, educator} = scheduleCreate
  const inputFields = [
    { name: "day", type: "select", value: day, options: ["Lundi", "Mardi", 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'], label: 'Jour :' },
    { name: "startHour", type: "time", value: startHour, label: 'Début :' },
    { name: "endHour", type: "time", value: endHour, label: 'Fin :' },
    { name: "level", type: "select", value: level, options: ["Baby Tennis",'Mini Tennis', "Violet", "Rouge", "Orange", "Vert", "Jaune 1", 'Jaune 2', 'Jaune 3', 'Jaune 4', 'Adulte niveau 1', 'Adulte Niveau 2', 'Adulte niveau 3',  'Adulte niveau 4',  'Adulte niveau 5' ], label: 'Niveau :' },
    { name: "numberOfPlaces", type: "number", value: numberOfPlaces, min: 1, max: 20, label: 'Nombre de places :' },
    { name: "playedForm", type: "select", value: playedForm, options: ["Classique", "Forme Jouée"], label: 'Formule :' },
    { name: "educator", type: "text", value: educator, label: 'Enseignant :' }
  ];

 

  return (
    <div className="inputs-container">
      
      {inputFields.map((field, index) => {
        const {name, type, value, options, label, min, max} = field
        return(
          <div className="inputs" key={index}>
          <label>{label}</label>
          {type === 'select' ? (
                <select name={name} value={value} onChange={ handleInputChange}>
                {options.map((option, index) => (
                    <option key={option} value={name === 'level' || name === 'playedForm' ? index : option}>{option}</option>
                ))}
            </select>
          ) : type === 'time' ? (
            <input type="time" value={value} name={name} onChange={handleInputChange} />
          ) : type === 'number' ? (
            <input type="number" value={value} min={min} max={max} name={name} onChange={handleInputChange} />
          ) : (
            <input type="text" value={value} name={name} onChange={handleInputChange} />
          )}
        </div>
        )
      })}
    </div>
  );
}