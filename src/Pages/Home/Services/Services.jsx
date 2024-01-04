import React from 'react'

import fluoride from '../../../assets/images/fluoride.png'
import cavity from '../../../assets/images/cavity.png'
import whitening from '../../../assets/images/whitening.png'
import Service from './Service'

export default function Services() {
    const servicesData = [
        {
            id: 1,
            name: 'Fluoride Treatment',
            des: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            img: fluoride
        },
        {
            id: 2,
            name: 'Cavity Filling',
            des: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            img: cavity
        },
        {
            id: 3,
            name: 'Teeth Whitening',
            des: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            img: whitening
        },
    ]
  return (
    <div className='mt-16'>
        <div className='text-center'>
            <h2 className='text-xl text-primary font-bold uppercase'>Our Services</h2>
            <h3 className='text-xl text-secondary'>Services We Provide</h3>
        </div>
        <div className='grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6'>
            {
                servicesData.map(service => <Service
                    key={service.id}
                    service ={service}
                     />)
            }
        </div>
    </div>
  )
}
