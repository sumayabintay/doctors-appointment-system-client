import React, { useState } from 'react'

export default function Drug({ drug, setShowModal }) {
  const { name, image, price, stock, date } = drug

  return (
    <div className="card bg-base-100 drop-shadow-md rounded-none">
      <img src={image} alt="Drug" />
      <div className="card-body items-center text-center">
        <h2 className="card-title"> Medichine Name:  {name} </h2>
        <p> Medichine Price: ${price} </p>
        <p> Availabel Stock {stock} </p>
        <p> Expire {date} </p>
        <button
          className="btn btn-primary"
          onClick={()=>setShowModal(true)}
        >Buy Medichine
        </button>
      </div>
    </div>
  )
}
