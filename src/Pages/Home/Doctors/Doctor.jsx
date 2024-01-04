import React from 'react'

export default function Doctor({ doctor }) {
    const { name, tag, img, des } = doctor
    return (
        <div className="card bg-base-100 drop-shadow-md rounded-none">
            <figure><img src={img} alt="Shoes" /></figure>
            <div className="card-body text-center">
                <h2 className="text-center text-xl text-primary font-bold">{name} </h2>
                <p> {tag} </p>
                <p> {des} </p>
                <div className="card-actions justify-center">
                    {/* <button className="btn btn-primary w-full rounded-none text-white">View Profile</button> */}
                </div>
            </div>
        </div>
    )
}
//endrocrynologist Dr. Mahmud