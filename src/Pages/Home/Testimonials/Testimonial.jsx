import React from 'react'

export default function Testimonial({ testimonial }) {
    const { name, location, img, reviews } = testimonial
    return (
        <div className="card bg-base-100 drop-shadow-md">
            <figure className="px-10 pt-10">
                <div><img src={img} alt="Shoes" className='w-16'/></div>
                <div className=' ml-4'>
                    <h2 className="text-center text-xl text-primary font-bold">{name} </h2>
                    <p>{location}</p>
                </div>
            </figure>
            <div className="card-body -mt-2 items-center text-center">
                <p> {reviews} </p>
            </div>
        </div>
    )
}
