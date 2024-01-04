import React from 'react'
import { Link } from 'react-router-dom'

export default function Doctor({ doctor }) {
    const { name, image, specialty } = doctor
    return (
        <div className="card bg-base-100 drop-shadow-md rounded-none">
                <img src={image} alt="Doctor" />
            <div className="card-body items-center text-center">
                <h2 className="card-title"> {name} </h2>
                <p> {specialty} </p>
                    <Link to="/appointment"><button className="btn btn-primary">Book Appiontment</button></Link>
            </div>
        </div>
    )
}
