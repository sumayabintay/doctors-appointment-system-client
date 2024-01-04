import chair from '../../../assets/images/chair.png'
import { DayPicker } from 'react-day-picker'

export default function AppointmentBanner({selectedDate, setSelectedDate}) {
  return (
    <header>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse justify-between">
                    <img src={chair} className="lg:w-1/2 rounded-lg shadow-2xl" alt='' />
                    <div>
                        <DayPicker
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={{ before: new Date() }}
                        />
                    </div>
                </div>
            </div>
        </header>
  )
}
