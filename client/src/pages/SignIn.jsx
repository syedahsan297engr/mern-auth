import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../Components/OAuth';

const SignIn = () => {
  const [formData, setFormData] = useState({}); 
  const {loading, error} = useSelector((state) => state.user); //this .user is the name of the slice
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //avoid refreshing
    //now send this form data to backend
    try {
      dispatch(signInStart());
      const res = await fetch (`/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'> SignIn </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="email" placeholder='email' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
        <input type="password" placeholder='password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
        <button disabled = {loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don&#39;t have an account?</p>
        <Link to='/sign-up' className='text-blue-500'>
          <span className='text-blue-500'>sign up</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>
        {error ? error.message || "Something went wrong!" : "" }
      </p>
    </div>
  )
}

export default SignIn