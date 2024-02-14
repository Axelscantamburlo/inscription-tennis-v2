

export const handleButtonClick = (buttonClicked, selectedSchedule, setShowModal, navigate, path) => {
    if (selectedSchedule !== null && selectedSchedule.usersRegisted.length < selectedSchedule.numberOfPlaces) {
      if (buttonClicked === 1 ) {
        // lorsque le bouton Suivant est cliqué
        navigate(path);
      } else if (buttonClicked === 2) {
        // lorsque le bouton Valider est cliqué
        setShowModal();
      }
    } else {
      console.log("Choisissez un créneau / plus de places");
    }
  };