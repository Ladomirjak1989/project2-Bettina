import React from 'react'
import { Link } from 'react-router-dom';
import './NavBar.css';
import { useState, useEffect } from 'react';
import Slogan from '../Slogan/Slogan';


// import { GiHamburgerMenu } from "react-icons/gi";
// import { RxCross2 } from "react-icons/rx";
// import PopUpBurgerMenu from './PopUpBurgerMenu';
import Logo from "../../assets/logo.png";


const navBarConfig = [{
  link: '/',
  title: 'Home'
},
{
  link: '/blogs',
  title: 'Blogs',
}, {
  link: '/about',
  title: 'About',
}, {
  link: '/city',
  title: 'City',
},
{
  link: '/login',
  title: 'Login',
}]

const Navbar = ({user, onLogOut}) => {
  return (
    <div>
      <nav className='nav'>

        <Link className='' to='/'>
          <img className='logo-style' src={Logo} alt="logo" />
        </Link>
        <h1 className='title'>FlavorFinds</h1>
        <Link to='/'></Link>
        <ul className='nav-list'>
          {navBarConfig.map(item => (
            <li key={item.title}>
              { (item.title !== 'Login') ? ( <Link to={item.link}>{item.title}</Link>): 
              (!user ? <Link to={item.link}>{item.title} 
              </Link>:<button className='logout-style' onClick={()=>onLogOut(null)}>LogOut</button>)
               }
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Navbar