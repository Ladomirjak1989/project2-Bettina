import React from 'react'
import './NotFoundPage.css'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className='cont-404'>
      <div className='notfound-text' >
        <h2 className='notfound-title'>404 - Page Not Found!</h2>
      <p className='notfound-subtitle'>Sorry, the page you are looking for could not be found.(((</p>
      <button className='btn-style-404' onClick={() => navigate("/")}>GO HOME</button>
      </div>
      </div>
    
  )
}
export default NotFoundPage
