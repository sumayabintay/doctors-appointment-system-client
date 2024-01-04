
import React from 'react'
import Loading from '../../Shared/Loading/Loading'
import { useQuery } from '@tanstack/react-query'
import Doctor from './Doctor'

export default function Doctors() {
    const {data: doctor = [], refetch, isLoading} = useQuery({
        queryKey: ['doctor'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/doctors')
            const data = await res.json()
            return data
        }
    })
    if(isLoading){
        return <Loading />
    }
  return (
    <div>
        <section className='mt-16'>
        <h3 className='text-center text-xl text-primary font-semibold'>Available Doctor</h3>
        <p className='text-center mt-2'>Please select a Doctor</p>
        <div  className='grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6'>
           {
            doctor.map(doctor => <Doctor 
                key={doctor._id}
                doctor = {doctor}
            />)
           }
        </div>
    </section>
    </div>
  )
}
