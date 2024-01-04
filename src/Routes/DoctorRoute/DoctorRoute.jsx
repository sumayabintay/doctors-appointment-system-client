import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { Navigate, useLocation } from 'react-router-dom'
import useDoctor from '../../hooks/useDoctor'

export default function DoctorRoute({children}) {
    const {user, loading} = useContext(AuthContext)
    const [isDoctor, isDoctorLoading] = useDoctor(user?.email)
    const location = useLocation()

    if(loading ||isDoctorLoading){
        return <progress className="progress w-56"></progress>
    }

    if(user && isDoctor) {
        return children
    }
  return (
    <Navigate to="/login" state={{from: location}} replace></Navigate>
  )
}
