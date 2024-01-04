import React, { useState } from 'react'
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner'
import AvailableAppointment from '../AvailableAppointment/AvailableAppointment'

export default function Appointment() {
    const [selectedDate, setSelectedDate] = useState(new Date())
  return (
    <div>
        <AppointmentBanner 
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
        />
        <AvailableAppointment 
            selectedDate={selectedDate}
        />
    </div>
  )
}
