import React from 'react'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';

const OAuth = () => {
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app); //this app is from firebase.js file
      const result = await signInWithPopup(auth, provider);
      //console.log(result);
      const res = await fetch(`/api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: result.user.displayName, //in result.user we get the user details
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();
      //console.log(data);
      dispatch(signInSuccess(data));
    } catch (error) {
      console.log("could not continue with google", error);
    }
  }

  return (
    /* this type button is added bcz this button is inside form we want to keep this separate from the form, if we don't do this we get error of filling the form or whatsoever*/
    <button type='button' onClick={handleGoogleClick} className='bg-red-700 text-white rounded-xl p-3 uppercase hover:opacity-95'>
      Continue with Google
    </button>
    
  )
}

export default OAuth