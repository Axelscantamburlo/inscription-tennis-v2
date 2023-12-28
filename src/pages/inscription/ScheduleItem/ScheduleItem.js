import React from 'react'

// REDUX
import { useDispatch, useSelector } from 'react-redux'
import { selectSchedule, setPlayeurInfo } from '../../../redux/actions'

export default function ScheduleItem({schedule, path}) {

  const dispatch = useDispatch()

  const {day, startHour, endHour, numberOfPlaces, usersRegisted, uid} = schedule
  
  
  const handleChooseSchedule = () => {
    dispatch(selectSchedule(schedule, path));
  };



  return (
    <div className='schedule-item-container'>
          <h2>{day} de {startHour} à {endHour}</h2>
        <div className='progress-bar'>
              <div
                className='progress-bar-fill'
                style={{ width: `${(usersRegisted.length / numberOfPlaces) * 100}%` }}
              ></div>
            </div>
            <button onClick={() => handleChooseSchedule()}>Choisir cette heure</button>
    </div>
  )
}
