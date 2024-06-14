

export const findPriceToPay = (playerInscriptions, level) => {
  const l = level || playerInscriptions[0].level || null;
  const { startHour, endHour, playedForm } = playerInscriptions[0] || [];
  if (playerInscriptions.length === 0 || level === null) {
    return "0/Pas inscrit";
  } else if (l === "0") {
    return "130/50min par semaine";
  } else if (l === "1") {
    return playerInscriptions.length === 1 ? "175/1h par semaine" : "280/2x 1h par semaine";
  } else if (["2", "3"].includes(l)) {
    return playerInscriptions.length === 1 ? "180/1h par semaine" : "325/2x 1h par semaine";
  } else if (["4", "5"].includes(l)) {
    if (playerInscriptions.length === 1) {
      return "180/1h par semaine";
    } else if (playerInscriptions.length === 2 && playedForm === "0" && playerInscriptions[1].playedForm === "0") {
      return "325/2x 1h par semaine";
    } else if (playerInscriptions.length === 2 && (playedForm === "1" || playerInscriptions[1].playedForm === "1")) {
      return "285/Forme jouée 2h par semaine";
    }
  }
  
  else if (["6", "7", "8", "9"].includes(l)) {
    if (playerInscriptions.length === 1) {
      return "190/1h par semaine";
    } else if (playerInscriptions.length === 2 && playedForm === "0" && playerInscriptions[1].playedForm === "0") {
      return "335/2x 1h par semaine";
    } else if (playerInscriptions.length === 2 && (playedForm === "1" || playerInscriptions[1].playedForm === "1")) {
      return "300/Forme jouée 2h par semaine";
    } else {
      return "450/Forme jouée 3h par semaine";
    }
  } else if (["10", "11"].includes(l)) {
    return "280/1h par semaine";
  } else if (l === "12") {
    return convertHoursToMinutes(startHour, endHour) === 60 ? "280/1h par semaine" : "330/1h30 par semaine";
  } else if (l === "13" || l === "14") {
    return "330/1h30 par semaine";
  }  else return 'Erreur/Erreur'
};

const convertHoursToMinutes = (startHour, endHour) => {
  const [hour1, minute1] = startHour.split(":").map(Number);
  const [hour2, minute2] = endHour.split(":").map(Number);
  return hour2 * 60 + minute2 - (hour1 * 60 + minute1);
};

