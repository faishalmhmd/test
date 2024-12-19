import React from 'react'
import Navbar from '../component/navbar'
import Swal from 'sweetalert2'
import { useEffect,useContext,useState } from 'react'
import { context } from '../context/context'
import { useNavigate,useParams } from 'react-router-dom'
import url from '../static/url'
import axios from 'axios'
// import useGetCheck from '../hooks/useGetCheck'

export default function Update() {
    const { tokenAuth,isLoggedIn } = useContext(context)
    const { id,taskId } = useParams()
    const navigate = useNavigate()
    const [task,setTask] = useState('')
    const [data,setData] = useState('')

    useEffect(() => {
        getDetailTask()
    },[])

    const getDetailTask = () => {
        axios.get(`${url}/checklist/${id}/item/${taskId}`,tokenAuth)
            .then(res => {
                setData(res.data.data)
                setTask(res.data.data.name)
                console.log(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const updateTask = () => {
        axios.put(`${url}/checklist/${id}/item/rename/${taskId}`,{
            itemName: data.name
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
            })
        navigate(`/detail/${id}`)
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <>
            <Navbar />
            <div className="p-10 w-75">
                <div>
                    <label htmlFor="task" className="block text-sm font-medium text-gray-600">Sub Task</label>
                    <div className="">
                        Task Sebelumnya : {task}
                    </div>
                    <input
                        type="task"
                        id="task"
                        name="task"
                        value={data.name}
                        onChange={(e) => setData((prevState) => ({
                            ...prevState,
                            name: e.target.value
                        }))}
                        required
                        className=" px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="">
                    <button
                        type="submit"
                        onClick={updateTask}
                        className=" py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 px-5"
                    >
                        Update
                    </button>
                </div>
            </div>
        </>
    )
}
