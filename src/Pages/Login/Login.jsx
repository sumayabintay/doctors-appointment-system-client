import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider'
import useToken from '../../hooks/useHooks'

export default function Login() {

  const { register, formState: { errors }, handleSubmit } = useForm()
  const {signIn} = useContext(AuthContext)
  const [loginError, setLoginError] = useState('')

  const [loginUserEmail, setLoginUserEmail] = useState('')
  const [token] = useToken(loginUserEmail)
  //private Route
  const location = useLocation()
  const navigate = useNavigate()

  const from = location.state?.from?.pathname || '/';
  if(token){
    navigate(from, {replace: true})
  }

  const submitLogin = (data) => {
    console.log(data)
    setLoginError('')
    signIn(data.email, data.password)
    .then(result => {
      const user = result.user
      console.log(user)
      setLoginUserEmail(data.email)
      
    })
    .catch(error => {
      console.log(error.message)
      setLoginError(error.message)
    })
  }

  return (
    <div className='h-[800px] flex justify-center items-center'>
      <div className='w-96 shadow-md p-9 rounded-lg'>
        <h2 className='text-2xl text-center mb-5'>Login</h2>
        <form onSubmit={handleSubmit(submitLogin)}>
          <div className="form-control w-full max-w-xs mx-auto mb-3">
            <label className="label"> <span className="label-text">Email</span> </label>
            <input
              type="email"
              {...register("email", { required: "Email Address is required" })}
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
                required: "Password is required",
                minLength: {value: 8, message: "Password must be 8 characters"}
            })}
              className="input input-bordered w-full max-w-xs" />
              {errors.password && <p className='text-rose-500' role="alert">{errors.password?.message}</p>}
            <label className="label"> <span className="label-text">Forget Password</span> </label>
          </div>
          <input className='btn btn-primary w-full mx-auto mt-2 mb-2 text-white' value="LOGIN" type="submit" />
          <div>
            {
              loginError && <p className='text-rose-500'> {loginError} </p>
            }
          </div>
        </form>
        <p>New to Doctors Portal? <Link className='text-primary' to="/signUp">Create new account</Link></p>
        {/* <div className="divider mb-5">OR</div>
        <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button> */}
      </div>
    </div>
  )
}
