import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './CityPage.css'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import SearchBar from '../../components/SearchBar/SearchBar'

const API_URL = 'https://restaurant-beckend.adaptable.app'

const CityPage = ({user}) => {
  const [cities, setCities] = useState([])
  const navigate = useNavigate();
  // const params = useParams()

  const getAllCities = () => {
    axios
      .get(`${API_URL}/city`)
      // /${params.dishes} (all 'category' change to the 'params.dishes')
      .then((response) => setCities(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllCities()

  }, [])
 if(!user){
  return <Navigate to='/login'/>;
 }
  return (

    <div className='all-cities'>
      <SearchBar />
      <div>
        <button className='city-btn-style' onClick={() => navigate(-1)}>Go Back</button>
      </div>
      <div>
        <h2>Top 10 best cities in the world: </h2>
        <ul className='all-cities-list'>
          {cities.map((city) => (
            <li key={city.id}>

              <img src={city.imgUrl} alt={city.name} />
              <h4>{city.name}</h4>
              <p>{city.country}</p>
              <div>
                <Link className='all-cities-link' to={`/city/${city.id}`}>
                  Show more information
                </Link>
              </div>
            </li>
          )
          )}
        </ul>
      </div>
    </div>
  )
}

export default CityPage