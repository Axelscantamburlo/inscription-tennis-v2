import React, { useState, useEffect } from "react";

const FilterSchedules = ({ handleFilterData, loadedData }) => {
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    handleFilterData(sortSchedules(sortBy));
  }, [sortBy, handleFilterData]);

  const sortSchedules = (sortBy) => {
    return loadedData?.slice().sort((a, b) => {
      if (sortBy === "level") {
        const numbersArray = Array.from({ length: 15 }, (_, index) =>
          index.toString()
        );
        return numbersArray.indexOf(a.level) - numbersArray.indexOf(b.level);
      } else if (sortBy === "day") {
        const daysOrder = [
          "Lundi",
          "Mardi",
          "Mercredi",
          "Jeudi",
          "Vendredi",
          "Samedi",
          "Dimanche",
        ];
        return daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day);
      } else if (sortBy === "numberOfPlaces") {
        return a.numberOfPlaces - b.numberOfPlaces;
      } else if (sortBy === "formule") {
        return a.formule - b.formule;
      }
      return 0;
    });
  };

  return (
    <div className="inputs">
      <select
        style={{ marginTop: "70px" }}
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="">Trier par :</option>
        <option value="level">Niveau</option>
        <option value="day">Jour</option>
        <option value="numberOfPlaces">Nombre de places</option>
        <option value="formule">Formule</option>
      </select>
    </div>
  );
};

export default FilterSchedules;
