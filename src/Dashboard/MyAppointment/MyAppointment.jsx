import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { useQuery } from '@tanstack/react-query'
import Loading from '../../Pages/Shared/Loading/Loading'
import ConfirmationModal from '../../Pages/Shared/ConfirmationModal/ConfirmationModal'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'

export default function MyAppointment() {
    const [list, setList] = useState([])
    const [input, setInput] = useState('')
    const [deleteBooking, setDeleteBooking] = useState(null)

    const closeModal = () => {
        setDeleteBooking(null)
    }

    const handleDeleteBooking = booking => {
        fetch(`http://localhost:5000/bookings?${booking._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0) {
                    refetch()
                    toast.success(`Booking Deleted Successfully`)
                }
            })
    }

    const { user } = useContext(AuthContext)
    const url = `http://localhost:5000/bookings?email=${user?.email}`

    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json()
            return data
        }
    })

    const filterData = (searchInput, data) => {
        const nameFilter = data.filter(value => {
            const patient = value?.patient?.toLowerCase();
            const searchKeywords = searchInput?.toLowerCase()?.split(' ');

            return searchKeywords.every(keyword => patient?.includes(keyword));
        });
        const numberFilter = data.filter(value => {
            const phone = value?.phone?.toString();
            return phone === searchInput?.toString()
            // const searchDigits = searchInput?.toString()?.split('');

            // return searchDigits.every(digit => phone?.includes(digit));
        });

        console.log("==>", nameFilter);
        setList(nameFilter?.length ? nameFilter : numberFilter)
    };


    useEffect(() => {
        filterData(input, bookings)
    }, [bookings, input])

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            
            <div className='mt-6 px-6 text-2xl font-bold flex justify-between '>
            <div className='mt-6 px-6 text-2xl font-bold'>My Appointment {bookings?.length}</div>
                <div>
                    <label htmlFor="search"></label>
                    <input className="text-sm text-gray-500 p-2" onChange={(e) => setInput(e.target.value)} type="text" id='search' placeholder='search by name or number' />
                </div>
            </div>
            <div className="overflow-x-auto px-6 py-6">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Serial No.</th>
                            <th>Patient Name</th>
                            <th>Treatment</th>
                            <th>Appointment Date</th>
                            <th>Slot</th>
                            <th>Phone Number</th>
                            <th>Payment</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings &&
                            list?.map((booking, i) => <tr
                                key={booking._id}
                            >
                                <th>{i + 1}</th>
                                <td> {booking.patient} </td>
                                <td>{booking.treatment}</td>
                                <td>{booking.appointmentDate}</td>
                                <td>{booking.slot}</td>
                                <td>{booking.phone}</td>
                                <td>
                                    {
                                        booking.price && !booking.paid &&
                                        <Link
                                            to={`/dashboard/payment/${booking._id}`}><button
                                                className='btn btn-sm btn-primary'
                                            >
                                                Pay Now
                                            </button></Link>
                                    }
                                    {
                                        booking.price && booking.paid && <span
                                            className='btn btn-success'
                                        >Paid</span>
                                    }
                                </td>
                                <td>
                                    <label onClick={() => setDeleteBooking(booking)} htmlFor="confirmation-modal" className="btn btn-error btn-sm">Delete</label>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
                {
                    deleteBooking && <ConfirmationModal
                        title={`Are You Sure you want to delete`}
                        message={`If you delete ${deleteBooking.name}. It Can't be recover`}
                        successAction={handleDeleteBooking}
                        successButtonName="Delete"
                        modalData={deleteBooking}
                        closeModal={closeModal}
                    ></ConfirmationModal>
                }
            </div>
        </div>
    )
}
