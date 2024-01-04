import React from 'react'

export default function Service({service}) {
    const {name, des, img} = service
    return (
        <div className="card bg-base-100 drop-shadow-md">
            <figure className="px-10 pt-10">
                <img src={img} alt=''/>
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title"> {name} </h2>
                <p>{des}</p>
            </div>
        </div>
    )
}
