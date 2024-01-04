import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

export default function Allusers() {
    const [list, setList] = useState([])
    const [input, setInput] = useState('')

    const { data: users = [], refetch } = useQuery({
        queryKey: ['usrs'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users')
            const data = await res.json()
            return data;
        }
    })
    const handleMakeAdmin = id => {
        fetch(`http://localhost:5000/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    console.log(data.modifiedCount)
                    toast.success('Make admin successfulle')
                    refetch()
                }
            })
    }

    const handleMakeDoctor = id => {
        fetch(`http://localhost:5000/users/doctor/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        }) 
        .then(res => res.json())
        .then(data => {
            if (data.modifiedCount > 0) {
                console.log(data.modifiedCount)
                toast.success('Make Doctor successfulle')
                refetch()
            }
        })

    }

    const filterData = (searchInput, data) => {
        const filterData = data.filter(({ name, email }) => {
            const nameMatch = name.toLowerCase().includes(searchInput.toLowerCase());
            const emailMatch = email.toLowerCase().includes(searchInput.toLowerCase());
            return nameMatch ? nameMatch : emailMatch
        })
        setList(filterData)
    };
    useEffect(() => {
        filterData(input, users)
    }, [users, input])

    return (
        <div>
              <div className='mt-6 px-6 text-2xl font-bold flex justify-between '>
                <div>All users</div>
                <div>
                    <label htmlFor="search"></label>
                    <input className="text-sm text-gray-500 p-2" onChange={(e) => setInput(e.target.value)} type="text" id='search' placeholder='search by name or email' />
                </div>
            </div>
            <div className="overflow-x-auto px-6 py-6">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Serial No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Doctor</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list?.map((user, i) => <tr
                                key={user._id}
                            >
                                <th>{i + 1}</th>
                                <td> {user.name} </td>
                                <td>{user.email}</td>
                                <td>{user?.role !== 'admin' && <button onClick={() => handleMakeAdmin(user._id)} className='btn btn-info btn-sm'>Make Admin</button>}</td>

                                <td>
                                    {
                                        user?.role !== 'doctor' && <button
                                        onClick={() => handleMakeDoctor(user._id)}
                                        className='btn btn-primary btn-sm'
                                    >Make Doctor</button>
                                    }
                                </td>

                                <td><button className='btn btn-sm btn-error'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
