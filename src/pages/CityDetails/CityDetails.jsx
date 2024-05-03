import { useParams } from 'react-router-dom'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import './CityDetails.css'
import { useNavigate, Link } from 'react-router-dom'
import SearchBar from '../../components/SearchBar/SearchBar'





const API_URL = 'https://restaurant-beckend.adaptable.app'

const CityDetails = () => {
  const navigate = useNavigate();
  //   const [isPopUpOpen, setPopUpOpen] = useState(false)
  const { cityId } = useParams()
  const [city, setCity] = useState(null)

  //   const [message, setMessage] = useState(null)
  const getOneCity = () => {
    axios
      .get(`${API_URL}/city/${cityId}`)
      .then((response) => setCity(response.data))
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getOneCity()

  }, [cityId])


  //   useEffect(() => {
  //     if (isPopUpOpen) {
  //       setTimeout(() => {
  //         setPopUpOpen(false)
  //         navigate(`/${dishes}`)
  //       }, 3000)
  //     }
  //   }, [isPopUpOpen])
  if (!city) {
    return <h2>Loading</h2>

  }
  return (

    <div className='details-page'>

      <SearchBar />
      <div >
      <button className='btn-style'  onClick={() => navigate(-1)}>Go back</button>
      </div>
      <div className='city-container'>


        <div className='page-item'>
          <div>

          </div>
          <img src={city.imgUrl} alt={city.name} />
          <h2>
            <span>Name:</span> {city.name}
          </h2>
          <p>
            <span>Latitude:</span> {city.latitude}
          </p>
          <p>
            <span>Longitude:</span> {city.longitude}
          </p>
          <p>
            <span>Country:</span> {city.country}
          </p>
          <p>
            <span>Population:</span> {city.population}
          </p>
          <p>
            <span>Description:</span> {city.description}
          </p>

          <div className='page-item-btn-wrapper'>


            
            <Link className='show-restaurants' to={`/cities/${city.name}/restaurants`}>
              Show restaurants
            </Link>
          </div>
        </div>

      </div>
    </div>

  )
}

export default CityDetails