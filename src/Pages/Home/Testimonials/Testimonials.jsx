import React from 'react'
import quote from '../../../assets/icons/quote.svg'
import people1 from '../../../assets/images/people1.png'
import people2 from '../../../assets/images/people2.png'
import people3 from '../../../assets/images/people3.png'
import Testimonial from './Testimonial'

export default function Testimonials() {
    const testimonialsData = [
        {
            _id: 1,
            name: 'Winson Herry',
            location: 'California',
            reviews: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            img: people1
        },
        {
            _id: 2,
            name: 'Winson Herry',
            location: 'California',
            reviews: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            img: people2
        },
        {
            _id: 3,
            name: 'Winson Herry',
            location: 'California',
            reviews: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            img: people3
        },
    ]
    return (
        <section className='mt-16'>
            <div className='text-center'>
                <h2 className='text-xl text-primary font-bold uppercase'>Testimonial</h2>
                <h3 className='text-xl text-secondary'>What Our Patients Says</h3>
            </div>
            <div className='grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6'>
                {
                    testimonialsData.map(testimonial => <Testimonial
                        key={testimonial._id}
                        testimonial={testimonial}
                    />)
                }
            </div>
        </section>
    )
}
