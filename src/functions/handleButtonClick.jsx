import ErrorMessage from "../data/ErrorMessage";

export const handleButtonClick = (
  buttonClicked,
  selectedSchedule,
  setOpenModal,
  setErrorMessage,
  navigate,
  path,
) => {
  if (
    selectedSchedule !== null &&
    selectedSchedule.usersRegisted.length < selectedSchedule.numberOfPlaces
  ) {
    if (buttonClicked === 1) {
   
      // lorsque le bouton Suivant est cliqué
      return navigate(path);
    } else if (buttonClicked === 2) {
      // lorsque le bouton Valider est cliqué
      return setOpenModal(true);
    }
  } else if (selectedSchedule == null) {
    return setErrorMessage("Veuillez sélectionner un créneau");
  } else {
    return setErrorMessage("Plus de places disponibles");
  }
};
