export const convertLevelToWord = (level) => {
    const levelMap = {
      0: "Baby",
      1: "Mini",
      2: "Violet",
      3: "Rouge",
      4: "Orange",
      5: "Vert",
      6: 'Jaune 1',
      7: 'Jaune 2',
      8: 'Jaune 3',
      9: 'Jaune 4',
      10: 'Adulte Niveau 1',
      11: 'Adulte Niveau 2',
      12: 'Adulte Niveau 3',
      13: 'Adulte Niveau 4',
      14: 'Adulte Niveau 5',
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

export const convertLevelToColor = (level) => {
  const levelMap = {
    0: "white",
  1: 'var(--grey-color)',
   2: "magenta",
   3: "red",
   4: "orange",
   5: "green",
   6: "yellow",
   7: "yellow",
   8: "yellow",
   9: "yellow",
   10: 'yellowgreen',
   11: 'yellowgreen',
   12: 'yellowgreen',
   13: 'yellowgreen',
   14: 'yellowgreen',
  }

  return levelMap[level] || 'transparent'
}