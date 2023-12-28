import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ThankYouPage() {
  const navigate = useNavigate()
  return (
    <div className='thank-you-page-container'>
      <h2>Thank you !!</h2>
      <button onClick={() => navigate('/inscrire-un-joueur')}>C'est noté !</button>
    </div>
  )
}
