import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function AddDurgs() {

    const { handleSubmit, register, formState: { errors } } = useForm();
    const imageHostkey = process.env.REACT_APP_Imgbb_Key

    const navigate = useNavigate()

    const handleAddDurgs = data => {
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
            if(imgData.success){
                const drug = {
                    name: data.name,
                    price: data.price,
                    date: data.date,
                    stock: data.stock,
                    image: imgData.data.url
                }

                // Save Durgs Collection to database
                fetch('http://localhost:5000/drugs', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(drug)
                })
                .then(res => res.json())
                .then(result => {
                    console.log(result)
                    toast.success(`${data.name} is Added Successfully`)
                    navigate('/dashboard/managedrugs')
                })
            }
        })
    }

    return (
        <div>
            <div className='mt-6 px-6 text-2xl font-bold pb-6'>Add  Drugs</div>
            <div className="overflow-x-auto w-96 shadow-md bg-white p-9 rounded-lg ml-6">
                <form onSubmit={handleSubmit(handleAddDurgs)}>
                    <div className="form-control w-full max-w-xs mx-auto mb-3">
                        <label className="label"> <span className="label-text">Name</span> </label>
                        <input
                            placeholder='Drug Name'
                            type="name"
                            {...register("name", { required: "Name Is Required" })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-rose-500' role="alert">{errors.name?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs mx-auto mb-3">
                        <label className="label"> <span className="label-text">Price</span> </label>
                        <input
                            placeholder='Drug Price'
                            type='price'
                            {...register("price", { required: "Drug Price is Require" })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.price && <p className='text-rose-500' role="alert">{errors.price?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs mx-auto mb-3">
                        <label className="label"> <span className="label-text">Expire Date</span> </label>
                        <input
                            placeholder='Expire Date'
                            type='date'
                            {...register("date", { required: "Date is Require" })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.date && <p className='text-rose-500' role="alert">{errors.date?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs mx-auto mb-3">
                        <label className="label"> <span className="label-text">Stock</span> </label>
                        <input
                            placeholder='Stock'
                            type='text'
                            {...register("stock", { required: "Stock is Require" })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.stock && <p className='text-rose-500' role="alert">{errors.stock?.message}</p>}
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
                    <input className='btn btn-primary w-full mx-auto mt-2 mb-2 text-white' value="Add Drugs" type="submit" />
                </form>
            </div>
        </div>
    )
}
