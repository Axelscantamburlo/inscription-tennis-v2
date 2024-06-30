import { useContext, useMemo } from "react";
import { AllDataSchedules } from "../context/AllDataSchedules";

export const usePlayeurInscription = (playeur) => {
  const { loadedData } = useContext(AllDataSchedules);

  const playeurInscriptions = useMemo(() => {
    return loadedData.filter((data) =>
      data.usersRegisted.some((user) => user.name.toLowerCase().trim() === playeur)
    );
  }, [loadedData, playeur]); // Ajout de dépendances pour éviter les recalculs inutiles

  return playeurInscriptions;
};
