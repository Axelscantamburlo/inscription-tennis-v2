import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// DATA
import { INPUTS_DATA } from '../../../data/inputsData';
// FIREBASE
import { auth, db } from '../../../config/firebase-config'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';




export default function CreateAccount() {

    const navigate = useNavigate()

    const [registerInfo, setRegisterInfo] = useState({
        email: '',
        password: ''
    })
    const { email, password } = registerInfo

    const handleInputChange = (e) => {
        const { value, name } = e.target
        setRegisterInfo({ ...registerInfo, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
       try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
         await setDoc(doc(db, "users", res.user.uid), {
            email,
            playeurInfo: [],
            playeurNames: []
        })
        


        navigate("/inscrire-un-joueur")
       } catch (err) {
        if(err.code === 'auth/invalid-email') {
            console.log('email invalide');
        }
        if(err.code === 'auth/email-already-in-use') {
            console.log('Email déjà utilisé');
        }
       }

    }

    return (
        <>
        <div className='login-container'>
            <div className="box">
            <h1>Se connecter</h1>  

              <form onSubmit={handleSubmit}>

                <div className="inputs">
                  
          {INPUTS_DATA.map(input => {
              const { id, label, type, maxLength, className } = input
              return (
                  <div className='row' key={id}>
                      <label>{label}</label>
                      <input type={type} name={id} id={id} className={className} maxLength={maxLength} autoComplete='off' onChange={handleInputChange} />
                  </div>
              )
          })}

                </div>
                {/* {error && <span>Wrong Email or Password</span>} */}
                <button type="submit" className="submit-btn">Valider</button>
              </form>

          </div>
        </div>
    </>
    );
}
