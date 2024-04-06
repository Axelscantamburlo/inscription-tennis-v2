import React from 'react';
import { useNavigate } from 'react-router-dom';
// REDUX
import { useDispatch } from 'react-redux';
import { selectSchedule } from '../../../../redux/actions';

const PreviousHourButtons = ({path, urlPath}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const navigatePreviousHour = () => {
        dispatch(selectSchedule(null, path));
        navigate(`/inscrire-un-joueur/${urlPath}`);
      };

      
 
    return (
        <button className="submit-btn previous-btn" onClick={() => navigatePreviousHour()}>
        Précédent
      </button>
    );
};

export default PreviousHourButtons;

// Third