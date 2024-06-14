export const findFormule = (level) => {
  const FORMULES = [
    {
      formules: [
        `1h par semaine - ${
          level == "1" ? "175€" : level === "6" ? "190€" : "180€"
        } + adhésion`,
        `2 x 1h par semaine - ${
          level == "1" ? "280€" : level === "6" ? "335€" : "325€"
        } + adhésion`,
      ],
      levels: ["1", "2", "3", "6"],
    },{
      formules: [
        '1h par semaine - 180€ + adhésion',
        '2 x 1h par semaine - 325€ + adhésion',
        `Forme jouée 2h par semaine - 285€ + adhésion`,
        
      ],
      levels: ["4", "5"],
    },
    {
      formules: [
        "1h par semaine - 190€ + adhésion",
        "2 x 1h par semaine - 335€ + adhésion",
        "Forme jouée 2h par semaine - 300€ + adhésion",
        "Forme jouée 3h par semaine - 450€ + adhésion",
      ],
      levels: ["7", "8", "9"],
    },

    {
      formules: ["50min par semaine - 130€ + adhésion"],
      levels: ["0"],
    },
    {
      formules: ["1h par semaine - 280€ + adhésion"],
      levels: ["10", "11"],
    },
    {
      formules: ["1h par semaine - 280€", "1h30 par semaine - 330€ + adhésion"],
      levels: ["12"],
    },
    {
      formules: ["1h30 par semaine - 330€ + adhésion"],
      levels: ["13", "14"],
    },
  ];
  return FORMULES.find((f) => f.levels.includes(level));
};
