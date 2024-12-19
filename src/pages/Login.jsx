import React,{ useState } from 'react'
import url from '../static/url'
import { context } from '../context/context'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useContext } from 'react'

export default function Login() {
    const navigate = useNavigate()
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const { isLoggedIn,setIsLoggedIn,setTokenAuth } = useContext(context)

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post(`${url}/login`,{
            username: username,
            password: password
        })
            .then(res => {
                console.log(res.data.data.token)
                if (res.status == 200) {
                    Swal.fire({
                        title: 'Berhasil',
                        text: 'Anda Berhasil Login',
                        icon: 'success',
                        confirmButtonText: 'Cool',
                        customClass: {
                            confirmButton: 'bg-blue-500 text-white hover:bg-blue-700'
                        }
                    })
                }
                const config = {
                    headers: {
                        'Authorization': `Bearer ${res.data.data.token}`
                    }
                }
                setIsLoggedIn(true)
                setTokenAuth(config)
                navigate('/')
            }
            )
            .catch(err => {
                if (err.response.data.statusCode == 401) {
                    Swal.fire({
                        title: 'Gagal',
                        text: 'Maaf Username / Password Anda Salah',
                        icon: 'error',
                        confirmButtonText: 'Cool',
                        customClass: {
                            confirmButton: 'bg-blue-500 text-white hover:bg-blue-700'
                        }
                    })
                }
            })

    }



    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-700">Sign In</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
                        <input
                            type="username"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="">
                        <button
                            type="submit"
                            className="w-full py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
                <p className="mt-4 text-sm text-center text-gray-600">
                    Don't have an account?{' '}
                    <a href="register" className="text-blue-500 hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    )
}
