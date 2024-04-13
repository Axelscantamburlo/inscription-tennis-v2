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



export const convertLevelToColor = (level) => {
  const levelMap = {
    0: "white",
  1: 'var(--grey-color)',
   2: "#FB62F6",
   3: "#EF3E36",
   4: "#FF7F11",
   5: "#379634",
   6: "yellow",
   7: "yellow",
   8: "yellow",
   9: "yellow",
   10: '#FFD400',
   11: '#FFE66D',
   12: '#FFE66D',
   13: '#FFE66D',
   14: '#FFE66D',
  }

  return levelMap[level] || 'transparent'
}