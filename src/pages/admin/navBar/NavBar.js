import React from 'react'
import { NavLink } from 'react-router-dom'
import StopInscriptionButton from '../StopInscription/StopInscriptionButton';

export default function NavBar({toggleClassName}) {

    const tabBar = [
        {
            link: '/admin/tableaux-joueurs',
            style: 1,
            text: 'Voir les tableaux'
        },
        {
            link: '/admin/ajouter-un-creneau',
            style: 2,
            text: 'Ajouter un créneau'
        },
        {
            link: '/admin/liste-joueurs',
            style: 3,
            text: 'Liste joueurs'
        },

    ]

    // li style
    const getLiStyle = (className) => {
        if (toggleClassName === className) {
          return { color: 'white'};
        } else {
          return { color: 'var(--background-color)' };
        }
      };    
  return (
    <div className='nav-bar-container no-print'>
        <ul>
            {tabBar.map((tab, index) => {
                const {link, style, text} = tab
                return(
                    <NavLink to={link} key={index}>
                        <li style={getLiStyle(style)}>{text}</li>
                    </NavLink>
                )
            })}
        </ul>
        <StopInscriptionButton />

    </div>
  )
}
