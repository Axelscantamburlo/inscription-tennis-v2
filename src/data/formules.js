export const findFormule = (level) => {
  const FORMULES = [
    {
      formules: [
        `1h par semaine - ${
          level == "1" ? "170€" : level === "6" ? "185€" : "175€"
        }`,
        `2 x 1h par semaine - ${
          level == "1" ? "276€" : level === "6" ? "329€" : "319€"
        }`,
      ],
      levels: ["1", "2", "3", "4", "5", "6"],
    },
    {
      formules: [
        "1h par semaine - 185€",
        "2 x 1h par semaine - 329€",
        "Forme jouée 2h par semaine - 291€",
        "Forme jouée 3h par semaine - 445€",
      ],
      levels: ["7", "8", "9"],
    },

    {
      formules: ["50min par semaine - 127€"],
      levels: ["0"],
    },
    {
      formules: ["1h par semaine - 270€"],
      levels: ["10", "11"],
    },
    {
      formules: ["1h par semaine - 270€", "1h30 par semaine - 317€"],
      levels: ["12"],
    },
    {
      formules: ["1h30 par semaine - 317€"],
      levels: ["13", "14"],
    },
  ];
  return FORMULES.find((f) => f.levels.includes(level));
};

// 0: "Baby",
//       1: "Mini",
//       2: "Violet",
//       3: "Rouge",
//       4: "Orange",
//       5: "Vert",
//       6: 'Jaune 1',
//       7: 'Jaune 2',
//       8: 'Jaune 3',
//       9: 'Jaune 4',
//       10: 'Adulte Niveau 1',
//       11: 'Adulte Niveau 2',
//       12: 'Adulte Niveau 3',
//       13: 'Adulte Niveau 4',
//       14: 'Adulte Niveau 5',
