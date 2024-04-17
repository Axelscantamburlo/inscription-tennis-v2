import React from 'react';
import { useNavigate } from 'react-router-dom';


const NotFoundPage = () => {
  const navigate = useNavigate()
  const userKey = localStorage.getItem('user')


  return (
    <div className='not-found-page-container'>
      <div className="content">
      <h1>Erreur 404</h1>
      <p>Désolé, la page que vous recherchez est introuvable.</p>
      <button onClick={() => userKey ? navigate('/inscrire-un-joueur') : navigate('/')} >C'est noté</button>
      </div>
    </div>
  );
};


export default NotFoundPage;