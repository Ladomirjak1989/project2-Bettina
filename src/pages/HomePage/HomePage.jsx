import { useState, useEffect } from 'react';
import Swiper from '../../components/Swiper/Swiper';
import SearchBar from '../../components/SearchBar/SearchBar';
import './HomePage.css';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [yelpData, setYelpData] = useState(null);
  const [userCity, setUserCity] = useState(null)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseLocation = await fetch('https://ipapi.co/json/');
        const locationData = await responseLocation.json();
        const userCity = locationData.city;
        setUserCity(userCity);

        const serverUrl = 'https://project-2-back-end2.adaptable.app';
        const params = new URLSearchParams({
          location: userCity,
        });

        const response = await fetch(`${serverUrl}/?${params}`);
        const data = await response.json();

        // Sort the restaurants by rating
        const sortedData = data.businesses.sort((a, b) => b.rating - a.rating);

        setYelpData(sortedData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <SearchBar />
      <div>
        <h2 className='swiper-title'>
          Explore places to eat
        </h2>
      </div>
      <Swiper />
      <div className='home-title-container'>
        <h2 className='home-title'>
          Food and Drink
        </h2>
        <p className='home-subtitle'>
          Dig into the best restaurants and bars, street food, and culinary hotspots around the world. Who's hungry?
        </p>
      </div>
      <div className='home-container'>
        {isLoading ? (
          <div className="loading-indicator">Loading...</div>
        ) : (
          <div className='restaurants-display-grid'>
            {yelpData && yelpData.map((business, index) => (
              business.image_url && (
                <Link key={index} to={`/restaurants/${business.id}`} className='home-page-link'>

                  <div key={index} className='home-page-container'>

                    <img src={business.image_url} alt='Restaurant' />
                    <p className='business-name'>{business.name}</p>
                    <div className='city-res-stars'>
                      <ReactStars
                        isHalf={true}
                        value={business.rating}
                        activeColor='#ffd700'
                        edit={false}
                        count={5}
                        size={24}
                      />
                      <p>{business.rating}</p>
                    </div>
                  </div>
                </Link>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;