import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import './Swiper.css'
import 'swiper/css/navigation';


const API_URL = 'https://restaurant-beckend.adaptable.app'

export default function Slider() {
  const [cities, setCities] = useState([])
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
 
  return (
    <div className='swiper-container'>
    
      <Swiper
        slidesPerView={3}
        navigation={true}
        loop={true}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        {cities.map(item => (
          <SwiperSlide className='styleslide' key={item.id}>
            <Link to={`/city/${item.id}`}>
              <div className='picture-wrapper'>
              <img className='picture' src={item.imgUrl} alt="" />
              <p className='picturetext'>{item.name}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}

      </Swiper>
    </div>
  );
}
