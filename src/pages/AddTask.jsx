import React from 'react'
import Navbar from '../component/navbar'
import Swal from 'sweetalert2'
import { useEffect,useContext,useState } from 'react'
import { context } from '../context/context'
import { useNavigate,useParams } from 'react-router-dom'
import url from '../static/url'
import axios from 'axios'
// import useGetCheck from '../hooks/useGetCheck'

export default function Add() {
    const { tokenAuth,isLoggedIn } = useContext(context)
    const [task,setTask] = useState('')
    const { id } = useParams()
    const navigate = useNavigate()
    // const { data,error,isLoading } = useGetCheck()

    useEffect(() => {
        console.log(isLoggedIn)
        console.log(tokenAuth)
        console.log(id)
    },[])

    const addTask = () => {
        axios.post(`${url}/checklist/${id}/item`,{
            itemName: task
        },tokenAuth)
            .then(res => {
                if (res.status == 200) {
                    Swal.fire({
                        title: 'Berhasil',
                        text: 'Penambahan Task Berhasil',
                        icon: 'success',
                        confirmButtonText: 'Cool',
                        customClass: {
                            confirmButton: 'bg-blue-500 text-white hover:bg-blue-700'
                        }
                    })
                }
                navigate(`/detail/${id}`)
            })
            .catch(err => {
                console.log(err)
            })
    }



    return (
        <>
            <Navbar />
            <div className="p-10 w-50">
                <div>
                    <label htmlFor="task" className="block text-sm font-medium text-gray-600">Sub Task</label>
                    <input
                        type="task"
                        id="task"
                        name="task"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        required
                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="">
                    <button
                        type="submit"
                        onClick={addTask}
                        className="w-full py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Add Sub Task
                    </button>
                </div>
            </div>
        </>
    )
}
