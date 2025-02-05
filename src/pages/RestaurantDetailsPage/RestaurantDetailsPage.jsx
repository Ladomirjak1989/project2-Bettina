import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import ReactStars from "react-rating-stars-component"
import SearchBar from '../../components/SearchBar/SearchBar';
import './RestaurantDetailsPage.css'
import { CgWebsite } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import DatePickerForm from '../../components/DatePickerForm/DatePickerForm';
import { IoIosCheckmarkCircle } from "react-icons/io";

const days = ['Sunday', 'Monday', 'Thuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const RestaurantDetailsPage = () => {
  const [isPopUpOpen, setPopUpOpen] = useState(false)
  const { restaurantId } = useParams()
  const [restaurant, setRestaurant] = useState(null)
  const navigate = useNavigate();

  

  const options = {
    method: 'GET',
    url: `http://localhost:5002/restaurants/${restaurantId}`,

    headers: {
      // 'Authorization': 'Bearer etUZ3WYi8nfnjU2OB6SqQsFsA91R0-tThuzbgOaeaC2zcTWjt4a26Owz317kieHFNgh9cvLwKwPbFxMlpTh1KDxZihtNOlsfPonbbKNB2Dx7KkylY3DgRCe9VlgaZnYx'
      'Authorization': 'Bearer JXXHOVlHRLEajOQgflKqOCXi4a5xBGiPf4CkE9lvYELjPUDqVT7MTnTG5lasLKpbHM-Ex1DcMvwc-EZzEhxc-pBaDqyKYV2Txp6nQ8FHwQxeq78kUxTjNRWKiPMnZnYx'
    },

  }
  const getDetailsRestaurants = async () => {
    const response = await axios.request(options);
    setRestaurant(response.data)
   
  };
  const handleReserve = (formData) => {
    if (formData.date && formData.persons) { setPopUpOpen(true) }
  }

  useEffect(() => {
    getDetailsRestaurants()

  }, [])
  useEffect(() => {
    if (isPopUpOpen) {
      setTimeout(() => {
        setPopUpOpen(false)
      }, 7000)
    }
  }, [isPopUpOpen])

  const ratingChanged = (newRating) => {
  }

  if (!restaurant) {
    return <h2>Loading</h2>
  }
  // Generate a random integer between min (inclusive) and max (inclusive)
  function getRandomInt() {
    return Math.floor(Math.random() * (30 - 5 + 1)) + 5;
  }

  return (
    <div>
      <SearchBar />

      <div className='rest-page-container'>
        <div className='rest-details-button-cont'>
          <button className='rest-details-btn' onClick={() => navigate(-1)}>Go Back</button>
        </div>
        <div className='reservation-title'>
          <h2>Make your reservation:</h2>
        </div>
        <div className='message-wrapper'>
          <DatePickerForm onSubmit={handleReserve} />
          {isPopUpOpen && <div className='message'>
            <IoIosCheckmarkCircle />Successful reservation</div>}
        </div>


        <div className='rest-details-wrapper'>
          <div className='rest-photo'>
            <img className='rest-details-photo' src={restaurant.image_url} alt="" />
          </div>
          <div className='rest-details-container'>
            <div className='details-wrapper'>
              <h4>Details</h4>
              <h2 className='rest-details-subtitle'>{restaurant.name}</h2>

              <a className='rest-menu' href={`${restaurant.attributes?.menu_url}`}>Menu</a>
              <p>Price: {getRandomInt()} <span>&#8364;</span></p>
              {restaurant.is_closed ? (<p className='rest-open'>Open</p>) : (<p className='rest-close'>Closed</p>)}

              <div className='rest-details-stars'>
                <p>Rating:</p>
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
              <ul className='rest-list'><p>Cuisine:</p>{restaurant.categories.map(item => (<li key={item.alias}>{item.title}</li>))}</ul>
              <div className='open-days'> <p>Open days:</p> {restaurant.hours[0].open.map(item => (
                <div className='rest-start-close' key={item.day}>
                  <p>{days[item.day]}</p>
                  <div >
                    <p>Start:{item.start.slice(0, 2)}:{item.start.slice(-2)}</p>
                    <p>Close:{item.end.slice(0, 2)}:{item.end.slice(-2)}</p>
                    {item.is_overnight && <p>Working</p>}
                  </div>
                </div>
              ))}</div>
            </div>
            <div>
              <div className='rest-info'>
                <h4>Location and contact</h4>
                <p><FaLocationDot /> {restaurant.location.address1}</p>
                <p><MdEmail /> <a href='mailto:restaurant@gmail.com'>restaurant@gmail.com</a> </p>
                <p><FaPhoneVolume /> <a href={`tel:${restaurant.phone}`}>{restaurant.display_phone}</a></p>
                <p> <CgWebsite /><a href={`${restaurant.url}`}>website</a></p>

                <div className='map'>
                  <iframe
                    // src={'https://maps.googleapis.com/maps/api/js?libraries=geometry&key=AIzaSyAv82eqKbZOaEU4RyRYOFBs0Tz7tlOEM4Y'}
                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d338.3397555421225!2d151.21314029242754!3d-33.85956641319514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae67d5541c77%3A0x8af817cc7e3857d7!2sAria%20Restaurant%20Sydney!5e0!3m2!1ses!2smx!4v1578622220577!5m2!1ses!2smx'
                    // src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d338.3397555421225!2d${restaurant?.coordinates?.longitude}!3d${restaurant?.coordinates?.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae67d5541c77%3A0x8af817cc7e3857d7!2sAria%20Restaurant%20${'Amsterdam'}!5e0!3m2!1ses!2smx!4v1578622220577!5m2!1ses!2smx`}
                    //  src = {`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d338.3397555421225!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae67d5541c77%3A0x8af817cc7e3857d7!2s${street}%20${addressnumber},%20${postalcode},%20${city},%20${region},%20${country}`}
                    width="350" height="270" style={{ "border": 0 }} allowFullScreen="" loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade">
                  </iframe>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default RestaurantDetailsPage