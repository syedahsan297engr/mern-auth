import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Header from './Components/Header'
import PrivateRoute from './Components/PrivateRoute'

const App = () => {
  return (
    <BrowserRouter>
      {/* Add header here so that it will be on every page */}
      <Header />
      <Routes>
        <Route element = {<PrivateRoute/>}>
          <Route path='/' element = {<Home />}/>
        </Route>
        <Route element = {<PrivateRoute/>}>
          <Route path='/about' element = {<About />}/>
        </Route>
        <Route element = {<PrivateRoute/>}>
          <Route path='/profile' element = {<Profile />}/>
        </Route>
        <Route path='/sign-in' element = {<SignIn />}/>
        <Route path='/sign-up' element = {<SignUp />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App