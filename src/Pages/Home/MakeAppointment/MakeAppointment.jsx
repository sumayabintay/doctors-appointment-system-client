import React from 'react'
import doctor from '../../../assets/images/doctor.png'
import './MakeAppointment.css'

export default function MakeAppointment() {
    return (
        <section className='appoinment mt-32'>
            <div className="hero">
                <div className="hero-content p-0 flex-col lg:flex-row">
                    <img src={doctor} className="lg:w-1/2 hidden md:block -mt-36" alt=''/>
                    <div className='text-white m-5'>
                        <h2 className='text-xl text-info font-bold mb-2'>Appointment</h2>
                        <h5 className="text-xl font-bold">Make an appointment Today</h5>
                        <p className="py-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                        <button className="btn btn-primary rounded-none text-white">Get Start</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
