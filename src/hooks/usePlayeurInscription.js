import { useContext } from "react";
import { AllDataSchedules } from "../context/AllDataSchedules";

export const usePlayeurInscription = (playeur) => {
  const { loadedData } = useContext(AllDataSchedules);

  const playeurInscriptions = loadedData.filter((data) =>
    data.usersRegisted.some((user) => user.name === playeur)
  );

  return playeurInscriptions;
};
