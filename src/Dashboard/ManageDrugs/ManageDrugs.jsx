import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import Loading from '../../Pages/Shared/Loading/Loading'
import { toast } from 'react-hot-toast'
import ConfirmationModal from '../../Pages/Shared/ConfirmationModal/ConfirmationModal'

export default function ManageDrugs() {
    const [deleteDrug, setDeleteDrug] = useState(null)

    const closeModal = () => {
        setDeleteDrug(null)
    }

    const handleDeleteDrug = drug => {
        fetch(`http://localhost:5000/drugs/${drug._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch()
                    toast.success(`Drug ${drug.name} Deleted Successfully`)
                }
            })
    }


    const { data: drugs, isLoading, refetch } = useQuery({
        queryKey: ['drugs'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/drugs', {
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

    if (isLoading) {
        <Loading />
    }
    return (
        <div>
            <div className='mt-6 px-6 text-2xl font-bold pb-6'>Manage Drugs {drugs?.length} </div>
            <div className="overflow-x-auto px-6 py-6">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Serial No.</th>
                            <th>Picture</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Expire Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            drugs?.map((drug, i) =>
                                <tr
                                    key={drug._id}
                                >
                                    <th> {i + 1} </th>
                                    <td><div className="avatar">
                                        <div className="w-16 rounded-full">
                                            <img src={drug.image} alt='' />
                                        </div>
                                    </div></td>
                                    <td> {drug.name} </td>
                                    <td> {drug.price} </td>
                                    <td> {drug.stock} </td>
                                    <td> {drug.date} </td>
                                    <td>
                                        <label onClick={() => setDeleteDrug(drug)} htmlFor="confirmation-modal" className="btn btn-error btn-sm">Delete</label>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
                {
                    deleteDrug && <ConfirmationModal
                        title={`Are You Sure you want to delete`}
                        message={`If you delete ${deleteDrug.name}. It Can't be recover`}
                        successAction={handleDeleteDrug}
                        successButtonName="Delete"
                        modalData={deleteDrug}
                        closeModal={closeModal}
                    >

                    </ConfirmationModal>
                }
            </div>
        </div>
    )
}
