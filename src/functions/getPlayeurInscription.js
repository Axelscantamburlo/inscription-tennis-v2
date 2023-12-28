export  const getPlayeurInscription = async (loadedData, playeurClick) =>  {
const playeurInscriptions = loadedData.filter((data) =>
    data.usersRegisted.includes(playeurClick)
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
