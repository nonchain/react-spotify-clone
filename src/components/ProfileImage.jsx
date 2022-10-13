import React from 'react';
import profile from '../assets/profile.png';

const ProfileImage = () => {
  return (
    <div className={`p-1 w-12 md:w-14 border border-white rounded-full lg:w-16 cursor-pointer`}>
      <img src={profile} alt="profile" 
      className={`w-full h-full object-cover overflow-hidden rounded-full`}/>
    </div>
  )
}

export default ProfileImage