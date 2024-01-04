import React, { useContext } from 'react'
import { useRouteError } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthProvider'

export default function DisplayError() {

    const {logOut} = useContext(AuthContext)
    const error = useRouteError()

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err))
    }
  return (
    <div>
        <p className='text-center text-red-800'>Something went wrong</p>
        <p className='text-center text-red-800'> {error.statusText  || error.message} </p>
        <h4 className='text-3xl'>Please <button onClick={handleLogOut}>Sign Out</button> and log back in </h4>
    </div>
  )
}
