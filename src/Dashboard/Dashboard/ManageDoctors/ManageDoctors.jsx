import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import ConfirmationModal from '../../../Pages/Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../../Pages/Shared/Loading/Loading';
import { toast } from 'react-hot-toast';

export default function ManageDoctors() {

    const [deleteDoctor, setDeleteDoctor] = useState(null)

    const closeModal = () => {
        setDeleteDoctor(null)
    }

    const handleDeleteDocotr = doctor => {
        fetch(`http://localhost:5000/doctors/${doctor._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
        })
            .then(res => res.json())
            .then(data => {
                if(data.deletedCount > 0){
                    refetch()
                    toast.success(`Doctor ${doctor.name} Deleted Successfully`)
                }
            })
    }


    const { data: doctors, isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/doctors', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            }
            catch (error) {
            }
        }
    })

    if(isLoading) {
        <Loading />
    }

    return (
        <div>
            <div className='mt-6 px-6 text-2xl font-bold pb-6'>Manage Doctors {doctors?.length} </div>
            <div className="overflow-x-auto px-6 py-6">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Serial No.</th>
                            <th>Picture</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors?.map((doctor, i) =>
                                <tr
                                    key={doctor._id}
                                >
                                    <th> {i + 1} </th>
                                    <td><div className="avatar">
                                        <div className="w-16 rounded-full">
                                            <img src={doctor.image} alt='' />
                                        </div>
                                    </div></td>
                                    <td> {doctor.name} </td>
                                    <td> {doctor.email} </td>
                                    <td> {doctor.specialty} </td>
                                    <td>
                                        <label onClick={() => setDeleteDoctor(doctor)} htmlFor="confirmation-modal" className="btn btn-error btn-sm">Delete</label>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
                {
                    deleteDoctor && <ConfirmationModal
                        title={`Are You Sure you want to delete`}
                        message={`If you delete ${deleteDoctor.name}. It Can't be recover`}
                        successAction={handleDeleteDocotr}
                        successButtonName="Delete"
                        modalData={deleteDoctor}
                        closeModal={closeModal}
                    >

                    </ConfirmationModal>
                }
            </div>
        </div>
    )
}
