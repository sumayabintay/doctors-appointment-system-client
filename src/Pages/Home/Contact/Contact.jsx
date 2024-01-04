import React from 'react'
import './Contact.css'

export default function Contact() {
    return (
        <div className='mt-16 contact text-center'>
            <div className='text-center pt-20'>
                <h2 className='text-xl text-info font-bold uppercase'>Contact Us</h2>
                <h3 className='text-xl text-white'>Stay connected with us</h3>
            </div>
            <div className='pt-5 pb-20'>
                <form>
                    <input type="text" placeholder="Name" className="input input-bordered input-md w-full max-w-xs block mx-auto mb-4" />
                    <input type="email" placeholder="Email Address" className="input input-bordered input-md w-full max-w-xs block mx-auto mb-4" />
                    <textarea placeholder="Your Message" className="textarea w-full max-w-xs block mx-auto mb-5" />
                    <button className='btn btn-primary text-white rounded-none'>Submit</button>
                </form>
            </div>
        </div>
    )
}
