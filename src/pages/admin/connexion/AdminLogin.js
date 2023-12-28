import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// FIREBASE
import {collection, getDocs} from 'firebase/firestore'
import { db } from '../../../config/firebase-config'

export default function AdminLogin() {
const navigate = useNavigate()

  const [adminKeys, setAdminKeys] = useState([])
  const getAdminKeys = async () => {
    const dataArr = []
    const querySnapShot = await getDocs(collection(db, "admin"));
    querySnapShot.forEach((doc) => {
      dataArr.push(doc.data())
    })
    setAdminKeys(dataArr)

  }
useEffect(() => {
  getAdminKeys()
}, [])
  
const [adminInfo, setAdminInfo] = useState({
  name: '',
  key: ''
})

const handleInputChange = e => {
  const {value, name} = e.target
  setAdminInfo({...adminInfo, [name]: value})
}
const handleSubmit = (e) => {
  e.preventDefault();

  const admin = adminKeys.find((admin) => {
    return admin.name === adminInfo.name &&   admin.key === adminInfo.key;
  });

  if (admin) {
    // Les valeurs correspondent, vous pouvez effectuer l'action souhaitée
    navigate('/admin/tableaux-joueurs')
  } else {
    // Les valeurs ne correspondent pas, affichez une erreur
    console.log("Erreur de connexion. Veuillez vérifier vos informations.");
  }
};   
  return (
    <div className="register-container">
    <div className="reponsive-container">
        <h1>Créer un Compte</h1>
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="inputs">
                    <input type="text" name="name" placeholder='nom' onChange={handleInputChange}/>
                    <input type="text" name="key" placeholder='key' onChange={handleInputChange}/>
                </div>
                <button type="submit" className="submit-btn">Valider</button>
            </form>
        </div>
    </div>
</div>
  )
}


// name: Scantamburlo Alain     key: 4frd34GZr