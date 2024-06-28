import React from 'react'
import {useSelector} from 'react-redux'

const Profile = () => {
  const {currentUser} = useSelector(state => state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='font-semibold text-3xl text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img src={currentUser.profilePicture} alt="profile" className='h-24 w-24 object-cover self-center rounded-full cursor-pointer mt-2'/>
        <input type="text" id='username' placeholder='Username' className='bg-slate-100 rounded-lg p-3' defaultValue={currentUser.username}/>
        <input type="email" id='email' placeholder='email' className='bg-slate-100 rounded-lg p-3' defaultValue={currentUser.email}/>
        <input type="password" id='password' placeholder='password' className='bg-slate-100 rounded-lg p-3' />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Log out</span>
      </div>
    </div>
  )
}

export default Profile