export  const getPlayeurInscription = (loadedData, playeur) =>  {
const playeurInscriptions = loadedData.filter((data) =>
    data.usersRegisted.includes(playeur)
  );
  return playeurInscriptions
}

export  const findPriceToPay = (playeurInscriptions, level) => {
    if(level === '0') {
        return "127€"
    } else {
        return "281€"
    }
}
