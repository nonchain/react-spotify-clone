import React, { Fragment, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { close, menu, logo } from '../assets';
import { links } from '../assets/constants';

const NavLinks = ({ handelClick }) => (
  links.map(item => (
    <NavLink className='my-4 flex gap-3 items-center group' key={item.name} to={item.to}
      onClick={() => handelClick && handelClick()}>
      <img src={item.icon} alt="" className='w-6 h-6' />
      <p className='text-sm text-gray-200 font-medium group-hover:font-semibold group-hover:text-white'>
        {item.name}
      </p>
    </NavLink>
  ))
)

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Fragment>
      <div className='py-8 px-5 w-[320px] bg-primary-100 flex-col hidden md:flex'>
        <div className='mb-8 w-full h-14 flex gap-4 items-center justify-center'>
          <img src={logo} alt="Logo" className='w-12 h-12' />
          <h2 className='text-2xl text-white font-semibold'>Revex</h2>
        </div>

        <NavLinks />
      </div>

      {/* MOBILE MENU */}
      <div className='block md:hidden fixed top-4 right-4 z-10'>
        {
          isMenuOpen ?
            <img src={close} alt="close" className='cursor-pointer' onClick={() => setIsMenuOpen(false)} />
            :
            <img src={menu} alt="menu" className='cursor-pointer' onClick={() => setIsMenuOpen(true)} />
        }
      </div>
      <div className={`py-6 px-5 w-2/3 h-screen absolute top-0 bg-primary-100/80 backdrop-blur-lg smooth-transition z-10 md:hidden ${isMenuOpen ? 'left-0' : '-left-full'}`}>
      <div className='mb-8 w-full h-14 flex gap-4 items-center justify-center'>
          <img src={logo} alt="Logo" className='w-12 h-12' />
          <h2 className='text-2xl text-white font-semibold'>Revex</h2>
        </div>

        <NavLinks />
      </div>
    </Fragment>
  )
}

export default Sidebar