import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'  // Outlet to render the child elements
import {useAuthStatus} from '../hooks/useAuthStatus'
import Spinner from './Spinner'
//rafce
const PrivateRoute = () => {
     const {loggedIn,checkingStatus}=useAuthStatus()
        if(checkingStatus){
         return  <Spinner/>
        }
     

  return loggedIn ? <Outlet/> : <Navigate to='/sign-in'/> //in our case it gonna be Profile (look at App.js)
}

export default PrivateRoute
