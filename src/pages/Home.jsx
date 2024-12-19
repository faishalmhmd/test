import React from 'react'
import Navbar from '../component/navbar'
import { useEffect,useContext } from 'react'
import { context } from '../context/context'
import { useNavigate,Link } from 'react-router-dom'
import useGetCheck from '../hooks/useGetCheck'
import axios from 'axios'
import url from '../static/url'
import Swal from 'sweetalert2'

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
        navigate('/add')
    }

    const deleteTask = (id) => {
        axios.delete(`${url}/checklist/${id}`,tokenAuth)
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
            })
            .catch(err => {
                console.log(err)
            })
    }



    const detailTask = (id) => {
        navigate('/detail',{ state: { id } })
    }
    return (
        <>
            <Navbar />
            <div className="p-10">
                <div onClick={redirect} className='bg-green-500 py-2 px-4 rounded text-white font-bold my-2 w-44 text-center'>Tambah Task</div>

                <div className="grid grid-cols-4 gap-5">

                    {isLoading ? (
                        <div className="">
                            Loading
                        </div>
                    ) : (
                        data.map((item,index) => (
                            <Link to={`detail/${item.id}`} className="bg-yellow-200 p-10 rounded-lg" key={index}>
                                <div className="font-bold text-xl">{item.name}</div>
                                <div className="">
                                    {item.items.map((attr,attrIndex) => (
                                        <div
                                            className={`py-1 ${attr.itemCompletionStatus ? 'line-through' : ''}`}
                                            key={attrIndex}
                                        >
                                            {attr.name}
                                        </div>
                                    ))}
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}
