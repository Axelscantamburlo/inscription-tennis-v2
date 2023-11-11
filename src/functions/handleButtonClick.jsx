
export const handleButtonClick = (buttonClicked, selectedSchedule, setShowModal, navigate, path, formule) => {
    if (selectedSchedule !== null && selectedSchedule.usersRegisted.length < selectedSchedule.numberOfPlaces) {
      if (buttonClicked === 1 ) {
        // lorsque le bouton Suivant est cliqué
        navigate(path, {state: {formule: formule}});
      } else if (buttonClicked === 2) {
        // lorsque le bouton Valider est cliqué
        setShowModal(true);
      }
    } else {
      console.log("Choisissez un créneau / plus de places");
    }
  };