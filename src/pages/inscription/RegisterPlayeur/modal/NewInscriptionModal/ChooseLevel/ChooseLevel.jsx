import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { setPlayeurInfo } from "../../../../../../redux/actions";

export default function ChooseLevel({ birthDay }) {
  console.log(birthDay);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [levelToPropose, setLevelToPropose] = useState([]);
console.log(levelToPropose);
  const levelInFonctionOfAge = {
    2018: "2",
    2017: "3",
    2016: "4",
    2015: "5",
  };
  const getLevels = (birthYear) => {
    if (birthYear === 2021) {
      return [{ text: "Baby Tennis", level: "0" }];
    } else if (birthYear === 2020 || birthYear === 2019) {
      return [{ text: "Mini Tennis", level: "1" }];
    } else if (birthYear <= 2018 && birthYear >= 2015) {
      return [
        { text: "Débutant", level: levelInFonctionOfAge[birthDay] },
        { text: "Violet", level: "2" },
        { text: "Rouge", level: "3" },
        { text: "Orange", level: "4" },
        { text: "Vert", level: "5" },
        {
          text: "Vous avez un doute sur votre niveau et vous n'avez pas de classement.",
          level: "Galaxie",
        },
      ];
    } else if (birthYear <= 2014 && birthYear >= 2007) {
      return [
        { text: "Débutant", level: "6" },
        {
          text: "Jaune 1 (jeu sur terrain orange avec balles adaptées)",
          level: "6",
        },
        {
          text: "Jaune 2 (jeu sur grand terrain avec balles vertes)",
          level: "7",
        },
        {
          text: "Jaune 3 (jeu sur terrain normal avec balles dures)",
          level: "8",
        },
        {
          text: "Jaune 4 (jeu sur terrain normal avec balles dures, classé entre 30/3 et 30/1 ou niveau)",
          level: "9",
        },
        {
          text: "Vous avez un doute sur votre niveau et vous n'avez pas de classement.",
          level: "Jaune",
        },
      ];
    } else if (birthYear <= 2006) {
      return [
        { text: "Adulte Niveau 1 (débutant, jamais joué)", level: "10" },
        { text: "Adulte Niveau 2 (NC à 30/4 ou niveau)", level: "11" },
        { text: "Adulte Niveau 3 (30/3 à 30/1 ou niveau)", level: "12" },
        { text: "Adulte Niveau 4 (30 à 15/4 ou niveau)", level: "13" },
        { text: "Adulte Niveau 5", level: "14" },
        {
          text: "Vous avez un doute sur votre niveau et vous n'avez pas de classement.",
          level: "Adulte",
        },
      ];
    } else {
      return [];
    }
  };

  useEffect(() => {
    setLevelToPropose(getLevels(birthDay));
  }, [birthDay]);

  const [levelChoose, setLevelChoose] = useState("");

  const handleSubmit = () => {
    dispatch(setPlayeurInfo({ level: levelChoose }));
    if (
      levelChoose !== "Adulte" &&
      levelChoose !== "Jaune" &&
      levelChoose !== "Galaxie"
    ) {
      return navigate("inscription");
    } else {
      return navigate("choisir-un-test");
    }
  };

  const [isSelected, setIsSelected] = useState(null);

  return (
    <div className="choose-level-container">
      <h2>Indiquez nous votre niveau</h2>
      {levelToPropose.length === 0 && (
        <h2>
          Malheureusement, votre date de naissance ne correspond pas aux
          critères d'âge requis pour l'inscription.
        </h2>
      )}
      {levelToPropose?.map((level, index) => {
        return (
          <div
            className="levels"
            onClick={() => {
              setLevelChoose(level.level);
              setIsSelected(index);
            }}
            key={index}
          >
            <div
              style={{
                backgroundColor: isSelected === index ? "yellow" : "#f6ae2d",
              }}
            >
              <h3>{level.text}</h3>
            </div>
          </div>
        );
      })}
      <button onClick={handleSubmit} type="submit" className="submit-btn">
        Valider
      </button>
    </div>
  );
}
