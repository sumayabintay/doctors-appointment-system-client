import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import Loading from '../../Shared/Loading/Loading'
import Drug from './Drug'

export default function Durgs() {
    const [showModal,setShowModal] = useState(false)
    console.log(showModal);
    const { data: drug = [], refetch, isLoading } = useQuery({
        queryKey: ['drug'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/drugs')
            const data = await res.json()
            return data
        }
    })
    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            <section className='mt-16'>
                <h3 className='text-center text-xl text-primary font-semibold'>Available Medichine</h3>
                <p className='text-center mt-2'>Please select Medichine</p>
                <div className='grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-6'>
                    {
                        drug.map(drug => <Drug
                            key={drug._id}
                            drug={drug}
                            showModal={showModal}
                            setShowModal={setShowModal}
                        />)
                    }
                </div>
            </section>
            <section>
                {
                //     showModal && <div>
                //     <input type="checkbox" id="bookingModal" className="modal-toggle" />
                //     <div className="modal">
                //         <div className="modal-box relative">
                //             <label htmlFor="bookingModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                //             {/* <h3 className="text-lg font-bold text-primary">{name}</h3> */}
                //             <h1>11111111111111</h1>
                //         </div>
                //     </div>
                // </div>
                }
            </section>
        </div>
    )
}
