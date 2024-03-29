import React from "react";

export default function InputFields({ scheduleCreate, handleInputChange }) {

    const {day, startHour, endHour, level, numberOfPlaces, playedForm, educator} = scheduleCreate
  const inputFields = [
    { name: "day", type: "select", value: day, options: ["Lundi", "Mardi", 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'], label: 'Jour :' },
    { name: "startHour", type: "time", value: startHour, label: 'Début :' },
    { name: "endHour", type: "time", value: endHour, label: 'Fin :' },
    { name: "level", type: "select", value: level, options: ["Blanc", "Violet", "Rouge", "Orange", "Vert", "Jaune"], label: 'Niveau :' },
    { name: "numberOfPlaces", type: "number", value: numberOfPlaces, min: 1, label: 'Nombre de places :' },
    { name: "playedForm", type: "select", value: playedForm, options: ["Classique", "Forme Jouée"], label: 'Formule :' },
    { name: "educator", type: "text", value: educator, label: 'Enseignant :' }
  ];

  const handleLevelChange = (e) => {
    const selectedIndex = e.target.value;
    handleInputChange({ target: { name: 'level', value: selectedIndex } });
};
  

  return (
    <div className="inputs-container">
      {inputFields.map(field => (
        <div className="inputs">
          <label>{field.label}</label>
          {field.type === 'select' ? (
                <select name={field.name} value={field.value} onChange={ handleInputChange}>
                {field.options.map((option, index) => (
                    <option key={option} value={field.name === 'level' ? index : option}>{option}</option>
                ))}
            </select>
          ) : field.type === 'time' ? (
            <input type="time" value={field.value} name={field.name} onChange={handleInputChange} />
          ) : field.type === 'number' ? (
            <input type="number" value={field.value} min={field.min} name={field.name} onChange={handleInputChange} />
          ) : (
            <input type="text" value={field.value} name={field.name} onChange={handleInputChange} />
          )}
        </div>
      ))}
    </div>
  );
}