import React from 'react'
import doctor1 from '../../../assets/images/doctor1.jpg'
import doctor2 from '../../../assets/images/doctor2.jpg'
import doctor3 from '../../../assets/images/doctor3.jpg'
import doctor4 from '../../../assets/images/doctor4.jpg'
import Doctor from './Doctor'

export default function Doctors() {
    const doctorsData = [
        {
            id: 1,
            name: 'Dr. Md. Shofiqul Islam',
            tag: 'Fluoride Specialist',
            des: 'Lorem ipsum dolor sit amet consectetur',
            img: doctor1
        },
        {
            id: 2,
            name: 'Dr. Michel Jorden',
            tag: 'Caveti Specialist',
            des: 'Lorem ipsum dolor sit amet consectetur',
            img: doctor2
        },
        {
            id: 3,
            name: 'Dr. Hasinatul Zannat',
            tag: 'Fluoride Specialist',
            des: 'Lorem ipsum dolor sit amet consectetur',
            img: doctor3
        },
        {
            id: 4,
            name: 'Dr. Md. Momin Khan',
            tag: 'Caveti Specialist',
            des: 'Lorem ipsum dolor sit amet consectetur',
            img: doctor4
        }
    ]
    return (
        <div className='mt-16'>
            <div className='text-center'>
                <h2 className='text-xl text-primary font-bold uppercase'>Our Doctors</h2>
                <h3 className='text-xl text-secondary'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, aspernatur</h3>
            </div>
            <div className='grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-6'>
                {
                    doctorsData.map(doctor => <Doctor
                        key={doctor.id}
                        doctor = {doctor}
                    />)
                }
            </div>
        </div>
    )
}
