import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react'
import { useLoaderData } from 'react-router-dom'
import CheckoutFrom from './CheckoutFrom';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

export default function Payment() {
  const booking = useLoaderData()
  const { treatment, price, appointmentDate, slot } = booking
  return (
    <div>
      <div className='mt-6 px-6 text-2xl font-bold pb-6'> Payment for {treatment} </div>

      <div className="overflow-x-auto px-6 py-6">
        <h3 className='text-2xl'>Please Pay <strong> ${price} </strong> for your appointment on {appointmentDate} at {slot}</h3>
        <div className='w-50 my-12'>
          <Elements stripe={stripePromise}>
            <CheckoutFrom
              booking = {booking}
            />
          </Elements>
        </div>
      </div>
    </div>
  )
}
