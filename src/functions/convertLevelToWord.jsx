export const convertLevelToWord = (level) => {
    const levelMap = {
      0: "Blanc",
      1: "Violet",
      2: "Rouge",
      3: "Orange",
      4: "Vert",
      5: "Jaune",
    };

    return levelMap[level] || "Inconnu";
  };

export const convertFormuleToWord = formule => {
  const formuleMap = {
    0: "Classique",
    1: "Forme jouée"
  };

  return formuleMap[formule] || "Inconnu";
}