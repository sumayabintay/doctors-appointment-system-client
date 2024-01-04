
import { format } from 'date-fns';
import AppointmentOption from './AppointmentOption';
import BookingModal from '../BookingModal/BookingModal';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Loading from '../../Shared/Loading/Loading';

export default function AvailableAppointment({selectedDate}) {
    const [treatment, setTreatment] = useState(null)
    const date = format(selectedDate, 'PP')

    const {data: availableService = [], refetch, isLoading} = useQuery({
        queryKey: ['appointmentOptions', date],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/appointmentOptions?date=${date}`)
            const data = await res.json()
            return data
        }
    })
    if(isLoading){
        return <Loading />
    }
  return (
    <section className='mt-16'>
        <h3 className='text-center text-xl text-primary font-semibold'>Available Services on: <span className='text-info font-bold'>{format(selectedDate, 'PP')}</span></h3>
        <p className='text-center mt-2'>Please select a service</p>
        <div  className='grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6'>
            {
                availableService.map(appointmentOption => <AppointmentOption 
                    key={appointmentOption._id}
                    appointmentOption = {appointmentOption}
                    setTreatment = {setTreatment}
                />)
            }
        </div>
        {   
            treatment &&
            <BookingModal
            setTreatment = {setTreatment}
            selectedDate = {selectedDate}
            treatment={treatment}
            refetch = {refetch}
        />}
    </section>
  )
}
