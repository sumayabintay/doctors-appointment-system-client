import React from 'react'

export default function AppointmentOption({ appointmentOption, setTreatment }) {
    const { name, price, slots } = appointmentOption
    return (
        <div className="card bg-base-100 drop-shadow-md rounded-none">
            <div className="card-body">
                <h2 className="text-xl font-bold text-center text-primary"> {name} </h2>
                <p className='text-center'>{slots.length > 0 ? slots[0] : 'Try Another day'}</p>
                <p className='text-center'>{slots.length} {slots.length > 1 ? 'Spaces' : 'Sapce'} Available</p>
                <p className='text-center'> ${price} </p>
                <div className="card-actions justify-center">
                    <label
                        disabled = {slots.length === 0}
                        onClick={()=> setTreatment(appointmentOption)}
                        htmlFor="bookingModal"
                        className="btn btn-primary rounded-none text-white"
                    >Book Appointment</label>
                </div>
            </div>
        </div>
    )
}
