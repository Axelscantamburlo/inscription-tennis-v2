import React, { useState } from 'react'
// data
import { NEW_PLAYEUR_INPUTS } from '../../../../../data/inputsData';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { setPlayeurInfo } from '../../../../../redux/actions';
import ChooseLevel from './ChooseLevel/ChooseLevel';


export default function NewInscriptionModal() {
  
  const dispatch = useDispatch();
  const [toggleModal, setToggleModal] = useState(0);
  const [registerPlayeurInfo, setRegisterPlayeurInfo] = useState({
    name: "",
    firstName: "",
    birthDay: "",
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setRegisterPlayeurInfo({ ...registerPlayeurInfo, [name]: value });
  };
console.log(registerPlayeurInfo);
  const { name, firstName, birthDay } = registerPlayeurInfo;

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanName = `${name.trim()} ${firstName.trim()}`.replace(/\s+/g, " ").toLowerCase();
    if (!name || !firstName || !birthDay) {
      setErrorMessage("Veuillez remplir tous les champs");
      return;
    }
    dispatch(setPlayeurInfo({...registerPlayeurInfo, name: cleanName}));
    setToggleModal(1);
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit}>
                  <h2>Joueur</h2>

      {NEW_PLAYEUR_INPUTS.map((input) => {
        const { id, label, type, maxLength } = input;
        return (
          <div className="inputs" key={id}>
            <label>{label}</label>
            <input
              type={type}
              name={id}
              id={id}
              maxLength={maxLength}
              autoComplete="off"
              onChange={handleInputChange}
            />
          </div>
        );
      })}
      <button type="submit" className="submit-btn">Valider</button>
    </form>
  );

  return (
    <>
      {toggleModal === 0 ? renderForm() : toggleModal === 1 ? <ChooseLevel birthDay={parseInt(birthDay.slice(0,4), 10)}/> : null}
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </>
  );
}