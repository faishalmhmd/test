import React from 'react'
import Navbar from '../component/navbar'
import { useEffect,useContext } from 'react'
import { context } from '../context/context'
import { useNavigate } from 'react-router-dom'
import useGetCheck from '../hooks/useGetCheck'
import axios from 'axios'
import url from '../static/url'

export default function Home() {
    const { isLoggedIn,tokenAuth,setTokenAuth } = useContext(context)
    const navigate = useNavigate()
    const { data,error,isLoading } = useGetCheck()

    useEffect(() => {
        if (isLoggedIn == false) {
            navigate('/login')
        }
    },[])

    const redirect = () => {
        navigate('/Add')
    }

    const deleteTask = (id) => {
        axios.delete(`${url}/checklist/${id}`,tokenAuth)
            .then(res => {
                console.log(res)
                // if (res.status == 200) {
                //     Swal.fire({
                //         title: 'Berhasil',
                //         text: 'Penambahan Task Berhasil',
                //         icon: 'success',
                //         confirmButtonText: 'Cool',
                //         customClass: {
                //             confirmButton: 'bg-blue-500 text-white hover:bg-blue-700'
                //         }
                //     })
                // }
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <>
            <Navbar />
            <div className="p-10">
                <div onClick={redirect} className='bg-green-500 py-2 px-4 rounded text-white font-bold my-2'>Tambah Task</div>
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left">ID</th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-left">Action</th>
                        </tr>
                    </thead>
                    {/*  */}
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
                                    <td className="px-4 py-2">{item.checklistCompletionStatus ? 'Beres' : 'Tidak Beres'}</td>
                                    <td className='flex'>
                                        <div className="bg-red-400 px-3 py-1 rounded text-white font-semibold" onClick={() => { deleteTask(item.id) }}>Delete</div>
                                        <div className="">Update</div>
                                        <div className="">Status</div>
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
