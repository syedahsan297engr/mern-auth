import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { getDownloadURL, getStorage } from 'firebase/storage'
import { app } from '../firebase'
import { ref, uploadBytesResumable } from 'firebase/storage'
import { useDispatch } from 'react-redux'
import { updateUserFailure, updateUserStart, updateUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOut } from '../redux/user/userSlice' 

const Profile = () => {
  const dispatch = useDispatch();
  const {currentUser, loading, error} = useSelector(state => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [ImageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if(image) {
      handleImageUpload(image);
    }
  }, [image]);
  //console.log(image);

  const handleImageUpload = async (image) => {
    //save this in firebase
    const storage = getStorage(app);
    const FileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, FileName)
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
        //console.log('Upload is ' + progress + '% done')
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      //console.log(data);
      if(data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      } else {
        dispatch(updateUserSuccess(data));
        setUpdateSuccess(true);
      }
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  }

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if(data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  }

  const handleSignout = async () => {
    try {
      await fetch('/api/auth/signout')
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='font-semibold text-3xl text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="file" ref={fileRef} hidden accept='image/*' onChange={(e)=>setImage(e.target.files[0])}/>
        <img src={formData.profilePicture || currentUser.profilePicture} alt="profile" className='h-24 w-24 object-cover self-center rounded-full cursor-pointer mt-2' onClick={() => fileRef.current.click()}/>
        <p className='text-sm self-center'>
          {ImageError && <span className='text-red-700'>Error Uploading Image : Size must be less than 2 Mb</span>}
          {!ImageError && imagePercent > 0 && imagePercent < 100 ? (
            <span className='text-slate-700'>Uploading : {imagePercent}%</span>
          ) : (
            imagePercent === 100 && !ImageError && <span className='text-green-700'>Image uploaded successfully</span>
          )}
        </p>
        <input type="text" id='username' placeholder='Username' className='bg-slate-100 rounded-lg p-3' defaultValue={currentUser.username}  onChange={handleChange}/>
        <input type="email" id='email' placeholder='email' className='bg-slate-100 rounded-lg p-3' defaultValue={currentUser.email} onChange={handleChange}/>
        <input type="password" id='password' placeholder='password' className='bg-slate-100 rounded-lg p-3'  onChange={handleChange}/>
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...': 'Update'}</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteAccount} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignout} className='text-red-700 cursor-pointer'>Log out</span>
      </div>
      <p className='text-red-700 mt-5'>{error && "Something went wrong!"}</p>
      <p className='text-green-700 mt-5'>{updateSuccess && "Update Successful!"}</p>
    </div>
  )
}

export default Profile