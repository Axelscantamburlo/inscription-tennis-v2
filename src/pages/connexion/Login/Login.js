import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// FIREBASE
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../config/firebase-config';

export default function Login() {

  const navigate = useNavigate()

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const {email, password} = loginInfo

    const handleInputChange = (e) => {
        const {value, name} = e.target
        setLoginInfo({...loginInfo, [name]: value})
    }

    const handleSubmit = async (e) => {
      e.preventDefault()

      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;


        navigate("/inscrire-un-joueur")
        
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    
    }

  
    return (
        <>
            <div className='login-container'>
              <div className="responsive-container">
                <h1>Se connecter</h1>
                <div className="form-container">
    
                  <form onSubmit={handleSubmit}>
    
                    <div className="inputs">
                      <div className="row">
                        <label htmlFor="email">Email</label>
                        <input type="email" autoComplete='off' name='email' onChange={handleInputChange} />
                      </div>
                      <div className="row">
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" name="password" onChange={handleInputChange}/>
                      </div>
    
                    </div>
                    {/* {error && <span>Wrong Email or Password</span>} */}
                    <button type="submit" className="submit-btn">Valider</button>
                  </form>
    
                </div>
              </div>
            </div>
        </>
      );
}
