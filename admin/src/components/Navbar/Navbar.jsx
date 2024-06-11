import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';

// Navbar Component
const Navbar = () => {

  {/* Displays company logo and profile icon of the user */}

  return (
    <div className='navbar'>
        <img className='logo' src={assets.logo} alt="" />
        <img className='profile' src={assets.profile_image} alt="" />
    </div>
  );
}

export default Navbar;