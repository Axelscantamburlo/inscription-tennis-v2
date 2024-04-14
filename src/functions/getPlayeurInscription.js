export const getPlayeurInscription = (loadedData, playeur) => {
  const playeurInscriptions = loadedData.filter((data) =>
    data.usersRegisted.includes(playeur)
  );
  return playeurInscriptions;
};

export const findPriceToPay = (playerInscriptions, level) => {
  const l = level || playerInscriptions[0].level || null;
  const { startHour, endHour, playedForm } = playerInscriptions[0] || [];
  if (playerInscriptions.length === 0 || level === null) {
    return "0";
  } else if (l === "0") {
    return "127";
  } else if (l === "1") {
    return playerInscriptions.length === 1 ? "170" : "276";
  } else if (["2", "3", "4", "5"].includes(l)) {
    return playerInscriptions.length === 1 ? "175" : "319";
  } else if (["6", "7", "8", "9"].includes(l)) {
    if (playerInscriptions.length === 1) {
      return "185";
    } else if (playerInscriptions.length === 2 && playedForm === "0") {
      return "329";
    } else if (playerInscriptions.length === 2 && playedForm === "1") {
      return "291";
    } else {
      return "445";
    }
  } else if (["10", "11"].includes(l)) {
    return "270";
  } else if (l === "12") {
    return convertHoursToMinutes(startHour, endHour) === 60 ? "270" : "317";
  } else if (l === "13") {
    return "317";
  }
};

const convertHoursToMinutes = (startHour, endHour) => {
  const [hour1, minute1] = startHour.split(":").map(Number);
  const [hour2, minute2] = endHour.split(":").map(Number);
  return hour2 * 60 + minute2 - (hour1 * 60 + minute1);
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
