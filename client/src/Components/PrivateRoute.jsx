import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {
    const {currentUser} = useSelector((state) => state.user)
    return currentUser ? <Outlet /> : <Navigate to='/sign-in'/>
    /* Outlet means show whatever is inside that privateroute component, in our case seee that app.jsx profile is wrappeed within this private route */

}

export default PrivateRoute