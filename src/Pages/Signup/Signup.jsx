import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider';
import { toast } from 'react-hot-toast';
import useToken from '../../hooks/useHooks';

export default function Signup() {

    const { handleSubmit, register, formState: { errors } } = useForm();
    const { createUser, updateUser } = useContext(AuthContext)

    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [token] = useToken (createdUserEmail)
    const nevigate = useNavigate()

    if(token) {
        nevigate('/')
    }
    
    const [signUpError, setSingUpError] = useState('')
    const handleSignup = (data) => {
        console.log(data)
        setSingUpError('')
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user)
                toast("User Created Successfully")
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email)
                    })
                    .catch(err => console.log(err))
            })
            .catch(error => {
                console.log(error)
                setSingUpError(error.message)
            })
    }

    const saveUser = (name, email) => {
        const user = { name, email };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log('User Crete' ,data)
                setCreatedUserEmail(email)
            })
    }




    return (
        <div className='h-[800px] flex justify-center items-center '>
            <div className='w-96 shadow-md p-9 rounded-lg'>
                <h2 className='text-2xl text-center mb-5'>Sign UP</h2>
                <form onSubmit={handleSubmit(handleSignup)}>
                    <div className="form-control w-full max-w-xs mx-auto mb-3">
                        <label className="label"> <span className="label-text">Name</span> </label>
                        <input
                            type="name"
                            {...register("name", {
                                required: "Name Is Required",
                                pattern: /^[A-Za-z\s]+$/
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-rose-500' role="alert">{errors.name?.message}</p>}
                        {errors?.name?.type === "pattern" && (
                            <p>Alphabetical characters only</p>
                        )}
                    </div>
                    <div className="form-control w-full max-w-xs mx-auto mb-3">
                        <label className="label"> <span className="label-text">Email</span> </label>
                        <input
                            type='email'
                            {...register("email", { required: "Email Is Required" })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-rose-500' role="alert">{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs mx-auto mb-3">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            {...register("password", {
                                required: "Password Is Required",
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                                minLength: { value: 8, message: "Password must be 8 characters" }
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-rose-500' role="alert">{errors.password?.message}</p>}
                        {errors?.password?.type === "pattern" && (
                            <p>Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character</p>
                        )}
                    </div>
                    <input className='btn btn-primary w-full mx-auto mt-2 mb-2 text-white' value="SIGN UP" type="submit" />
                    <div>
                        {
                            signUpError && <p className='text-rose-500'> {signUpError} </p>
                        }
                    </div>
                </form>
                <p>Already Have an Account <Link className='text-primary' to="/login">Please Login</Link></p>
                {/* <div className="divider mb-5">OR</div>
                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button> */}
            </div>
        </div>
    )
}
