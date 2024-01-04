import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useForm } from 'react-hook-form';
import Loading from '../../Pages/Shared/Loading/Loading';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export default function AddDoctor() {
    const { handleSubmit, register, formState: { errors } } = useForm();
const slots =[
    "08.00 AM - 12.00 PM",
    "12.00 PM - 04.00 PM",
    "04.00 PM - 08.00 PM",
    "08.00 PM - 12.00 AM"
]

    const imageHostkey = process.env.REACT_APP_Imgbb_Key

    const navigate = useNavigate()

    const { data: specialties, isLoading } = useQuery({
        queryLey: ['specialty'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/appointmentSpecialty');
            const data = await res.json();
            return data
        }
    })

    const handleAddDoctor = data => {
        const image = data.image[0];
        const formData = new FormData()
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imageHostkey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res =>res.json())
        .then(imgData => {
            if(imgData.success) {
                const doctor = {
                    name: data.name,
                    email: data.email,
                    slots:data.slots,
                    price:data.price,
                    specialty: data.specialty,
                    image: imgData.data.url
                }

                //save doctor collection to database
                fetch('http://localhost:5000/doctors', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(doctor)
                })
                .then(res => res.json())
                .then(result => {
                    console.log(result)
                    toast.success(`${data.name} is Added Successfully`)
                    navigate('/dashboard/managedoctors')
                })
            }
        })
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <div className='mt-6 px-6 text-2xl font-bold pb-6'>Add A Doctor</div>
            <div className="overflow-x-auto w-96 shadow-md bg-white p-9 rounded-lg ml-6">
                <form onSubmit={handleSubmit(handleAddDoctor)}>
                    <div className="form-control w-full max-w-xs mx-auto mb-3">
                        <label className="label"> <span className="label-text">Name</span> </label>
                        <input
                            placeholder='Enter Your Name'
                            type="name"
                            {...register("name", { required: "Name Is Required" })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-rose-500' role="alert">{errors.name?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs mx-auto mb-3">
                        <label className="label"> <span className="label-text">Email</span> </label>
                        <input
                            placeholder='Enter Your Email'
                            type='email'
                            {...register("email", { required: "Email Is Required" })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-rose-500' role="alert">{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs mx-auto mb-3">
                        <label className="label">
                            <span className="label-text">Specialty</span>
                        </label>
                        <select
                            {...register('specialty')}
                            className="select select-bordered w-full max-w-xs">
                            {
                                specialties.map(specialty => <option
                                    key={specialty._id}
                                    value={specialties.name}
                                > {specialty.name} </option>)
                            }
                        </select>
                    </div>
                    <div className="form-control w-full max-w-xs mx-auto mb-3">
                        <label className="label">
                            <span className="label-text">AvailAble time</span>
                        </label>
                        <select
                            {...register('slots')}
                            className="select select-bordered w-full max-w-xs">
                            {
                                slots.map((time,i) => <option
                                    key={i}
                                    value={time}
                                > {time} </option>)
                            }
                        </select>
                    </div>
                    <div className="form-control w-full max-w-xs mx-auto mb-3">
                        <label className="label"> <span className="label-text">Rate</span> </label>
                        <input
                            placeholder='Enter Your Rate'
                            type='number'
                            {...register("price", { required: "Rate Is Required" })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.price && <p className='text-rose-500' role="alert">{errors.price?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs mx-auto mb-3">
                        <label className="label"> <span className="label-text">Photo</span> </label>
                        <input
                            placeholder='Enter Your Name'
                            type="file"
                            {...register("image", { required: "Photo Is Required" })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.image && <p className='text-rose-500' role="alert">{errors.image?.message}</p>}
                    </div>
                    <input className='btn btn-primary w-full mx-auto mt-2 mb-2 text-white' value="Add Doctor" type="submit" />
                </form>
            </div>
        </div>
    )
}
