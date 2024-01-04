import React from 'react'
import Banner from '../Banner/Banner'
import Services from '../Services/Services'
import Doctors from '../Doctors/Doctors'
import MakeAppointment from '../MakeAppointment/MakeAppointment'
import Testimonials from '../Testimonials/Testimonials'
import Contact from '../Contact/Contact'

export default function Home() {
  return (
    <div>
      <Banner />
      <Services />
      <Doctors />
      <MakeAppointment />
      <Testimonials />
      <Contact />
    </div>
  )
}
