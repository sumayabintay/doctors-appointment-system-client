import React, { useContext } from 'react'
import { format } from 'date-fns';
import { AuthContext } from '../../../context/AuthProvider';
import { toast } from 'react-hot-toast';

export default function BookingModal({ treatment, selectedDate, setTreatment, refetch }) {
    const { name, slots, price } = treatment;
    const { user } = useContext(AuthContext)
    const date = format(selectedDate, 'PP')
    const handleBooking = e => {
        e.preventDefault();
        const form = e.target;
        const slot = form.slot.value
        const name = form.name.value
        const phone = form.phone.value
        const email = form.email.value

        const booking = {
            appointmentDate: date,
            treatment: treatment.name,
            patient: name,
            slot,
            email,
            phone,
            price
        }

        // TODO: Send data to the server
        // and once data is saved then close the modal
        // and display success toast

        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    setTreatment(null)
                    toast.success('Booking Confrimed')
                    refetch()
                }
                else{
                    toast.error(data.message)
                }
                
            })
    }
    return (
        <>
            <input type="checkbox" id="bookingModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="bookingModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold text-primary">{name}</h3>
                    <form onSubmit={handleBooking} className='grid gap-5 grid-cols-1 mt-5'>
                        <input type="text" value={date} disabled className="input w-full input-bordered" />
                        <select name='slot' className="select select-bordered w-full">
                            {
                                slots.map((slot, i) => <option
                                    value={slot}
                                    key={i}
                                >{slot}</option>)
                            }
                        </select>
                        <input name='name' type="text" defaultValue={user?.displayName} disabled className="input w-full input-bordered" />
                        <input name='email' type="email" defaultValue={user?.email} disabled className="input w-full input-bordered" />
                        <input name='phone' type="text" placeholder="Phone Number" className="input w-full input-bordered" pattern="01\d{9}" title="Phone number should start with 01 and have a length of 11 digits" />
                        {
                            user?.email ?
                                <input className='btn btn-primary bg-gradient-to-r from-secondary to-primary text-white mt-3 w-full' type="submit" value="Submit" />
                                :
                                <p className='text-center'>Please login first for booking</p>
                        }
                    </form>
                </div>
            </div>
        </>
    )
}
