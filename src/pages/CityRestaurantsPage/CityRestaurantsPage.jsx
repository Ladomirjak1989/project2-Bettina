import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import './CityRestaurantsPage.css'
import ReactStars from "react-rating-stars-component"
import SearchBar from '../../components/SearchBar/SearchBar';
import SortedRestaurants from '../../components/SortedRestaurants/SortedRestaurants';

const CityRestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([])
  const { cityName } = useParams()
  const navigate = useNavigate()

  const options = {
    method: 'GET',
    url: 'https://project-2-back-end2.adaptable.app',
    params: {
      location: cityName
    },
    headers: {
      // 'Authorization': 'Bearer etUZ3WYi8nfnjU2OB6SqQsFsA91R0-tThuzbgOaeaC2zcTWjt4a26Owz317kieHFNgh9cvLwKwPbFxMlpTh1KDxZihtNOlsfPonbbKNB2Dx7KkylY3DgRCe9VlgaZnYx'
      'Authorization': 'Bearer etUZ3WYi8nfnjU2OB6SqQsFsA91R0-tThuzbgOaeaC2zcTWjt4a26Owz317kieHFNgh9cvLwKwPbFxMlpTh1KDxZihtNOlsfPonbbKNB2Dx7KkylY3DgRCe9VlgaZnYx'
    },

  }

  const getAllRestaurants = async () => {
    try {
      const response = await axios.request(options);
     
      setRestaurants(response.data.businesses)

    } catch (error) {
      console.log(error)
      navigate('/not-found')
    }
};

  
useEffect(() => {
    getAllRestaurants()
  }, [])

  const ratingChanged = (newRating) => {
   
  };
  if (!restaurants.length) {
    return <h2>Loading</h2>

  }
  return (
    <div className='city-rest-searchbar'>
      <SearchBar />
      <div>
        <button className='city-rest-button' onClick={() => navigate(-1)}>Go Back</button>
      </div>
      <SortedRestaurants restaurants={restaurants} setRestaurants={setRestaurants} />

      <div className='city-rest-container'>
        <div className='city-rest-wrapper'>
          <ul className='city-rest-list-style'>
            {
              restaurants.map((restaurant) => (
                <li className='city-rest-item-style' key={restaurant.id}>

                  <img className='city-rest-photo' src={restaurant.image_url} alt="" />
                  <div>
                    <h4 className='city-rest-subtitle'>{restaurant.name}</h4>

                    <div className='city-res-stars'>
                      <ReactStars
                        isHalf={true}
                        value={restaurant.rating}
                        activeColor="#ffd700"
                        count={5}
                        onChange={ratingChanged}
                        size={24}

                      />
                      <p>{restaurant.rating}</p>
                    </div>

                    {restaurant.is_closed ? (<p className='city-rest-open'>Open</p>) : (<p className='city-rest-close'>Closed</p>)}
                    <p>{restaurant.price}</p>
                    {<h3>Reviews count: {restaurant.review_count}</h3>}
                    <div className='city-rest-btn'>
                      <Link to={`/restaurants/${restaurant.id}`}>
                        Show more details
                      </Link>

                    </div>

                  </div>

                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CityRestaurantsPage