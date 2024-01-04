import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'

export default function CheckoutFrom({booking}) {
    const [cardError, setCardError] = useState('')
    const [clientSecret, setClientSecret] = useState("");
    const stripe = useStripe();
    const elements = useElements()
    const {price, email, patient} = booking;

    useEffect(() => {
        fetch("http://localhost:5000/create-payment-intent", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            authorization: `bearer ${localStorage.getItem('accessToken')}`
        },
          body: JSON.stringify({ price }),
        })
          .then((res) => res.json())
          .then((data) => setClientSecret(data));
      }, [price]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)
        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log(error)
            setCardError(error.message)
        }

        else {
            setCardError('')
        }
        const {paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patient,
                        email: email
                    }
                }
            }
        )

        if(confirmError){
            setCardError(confirmError.message);
            return
        }

        console.log('paymentIntent',paymentIntent)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '20px',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-primary mt-5' type="submit" disabled={!stripe || clientSecret}>
                    Pay
                </button>
            </form>
            <p className="text-red-700"> {cardError} </p>
        </>
    )
}
