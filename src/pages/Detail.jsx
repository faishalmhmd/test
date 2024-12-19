import React from 'react'
import Navbar from '../component/navbar'
import Swal from 'sweetalert2'
import { useEffect,useContext,useState } from 'react'
import { context } from '../context/context'
import { useNavigate,Link } from 'react-router-dom'
import url from '../static/url'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import useGetTask from '../hooks/useGetTask'

export default function Detail() {
    const { tokenAuth,isLoggedIn } = useContext(context)
    const { id } = useParams()
    const [task,setTask] = useState('')

    const navigate = useNavigate()
    const { data,error,isLoading,getData } = useGetTask(id)


    const deleteTask = (params) => {
        axios.delete(`${url}/checklist/${id}/item/${params.id}`,tokenAuth)
            .then(res => {
                if (res.status == 200) {
                    Swal.fire({
                        title: 'Berhasil',
                        text: 'Penghapusan Data Berhasil',
                        icon: 'success',
                        confirmButtonText: 'Cool',
                        customClass: {
                            confirmButton: 'bg-blue-500 text-white hover:bg-blue-700'
                        }
                    })
                }
                getData()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const sovleTask = params => {
        axios.put(`${url}/checklist/${id}/item/${params}`,{
            checlistId: id,
            checklistItemId: params
        },tokenAuth)
            .then(res => {
                if (res.status == 200) {
                    Swal.fire({
                        title: 'Berhasil',
                        text: 'Perubahan Status Task Data Berhasil',
                        icon: 'success',
                        confirmButtonText: 'Cool',
                        customClass: {
                            confirmButton: 'bg-blue-500 text-white hover:bg-blue-700'
                        }
                    })
                }
                getData()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const redirect = () => {
        navigate('/add-task')
    }

    return (
        <>
            <Navbar />
            <div className="p-10">
                <Link to={`add-task/${id}`} className='bg-green-500 py-2 px-4 rounded text-white font-bold my-2'>Tambah Task</Link>
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left">ID</th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-left">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="3" className="px-4 py-2 text-center">
                                    Loading...
                                </td>
                            </tr>
                        ) : (
                            data.map((item,index) => (
                                <tr key={index} className="border-t">
                                    <td className="px-4 py-2">{item.id}</td>
                                    <td className="px-4 py-2">{item.name}</td>
                                    <td className="px-4 py-2">{item.itemCompletionStatus ? 'Beres' : 'Tidak Beres'}
                                        <input
                                            type="checkbox"
                                            className='mx-2'
                                            checked={item.itemCompletionStatus}
                                            onChange={() => sovleTask(item.id)}
                                        />

                                    </td>
                                    <td className='flex gap-2'>
                                        <div className="bg-red-400 px-3 py-1 rounded text-white font-semibold" onClick={() => { deleteTask(item) }}>Delete</div>
                                        <Link to={`update-task/${item.id}`} className="bg-yellow-400 px-3 py-1 rounded text-white font-semibold">Update</Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}
