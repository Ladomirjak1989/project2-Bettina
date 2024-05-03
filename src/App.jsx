import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar/NavBar"
import HomePage from './pages/HomePage/HomePage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import AboutPage from './pages/AboutPage/AboutPage'
import CityPage from './pages/CityPage/CityPage'
import CityDetails from './pages/CityDetails/CityDetails'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import RestaurantDetailsPage from './pages/RestaurantDetailsPage/RestaurantDetailsPage'
import CityRestaurantsPage from './pages/CityRestaurantsPage/CityRestaurantsPage'
import Footer from './components/Footer/Footer'
import BlogDetailsPage from './pages/BlogPage/BlogDetailsPage/'
import SingleBlogPage from './pages/BlogPage/SingleBlogPage'
 

function App() {
  const [user, setUser] = useState(null)
 
  return (
    <>
      <div className="App">
        <header>
          
          <Navbar user={user} onLogOut={setUser}/>
         
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />

       
          {/* { !user &&  */}

          <><Route path="/city" element={<CityPage user={user} />} />
            <Route path="/city/:cityId" element={<CityDetails />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/restaurants/:restaurantId" element={<RestaurantDetailsPage />} />
            <Route path="/cities/:cityName/restaurants" element={<CityRestaurantsPage user={user} />} />
            <Route path="/blogs" element={<BlogDetailsPage user={user}/>}></Route>
            <Route path="/blogs/:blogId" element={<SingleBlogPage />}></Route>
          </>
          {/* } */}

          <Route path="/login" element={<LoginPage handlerUser={setUser} />} />
          <Route path="/register" element={<RegisterPage handlerUser={setUser} />} />

          <Route path="*" element={<NotFoundPage />} />

        </Routes>
        <Footer/>

      </div>

    </>
  )
}

export default App
