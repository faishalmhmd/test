import { useState,useEffect,useContext } from 'react'
import axios from 'axios'
import url from '../static/url'
import { context } from '../context/context'

const useGetCheck = () => {
    const [data,setData] = useState(null)
    const [isLoading,setIsLoading] = useState(true)
    const [error,setError] = useState(null)
    const { tokenAuth } = useContext(context)

    useEffect(() => {
        axios.get(`${url}/checklist`,tokenAuth)
            .then(res => {
                setData(res.data.data)
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
    })

    return { data,isLoading,error }
}

export default useGetCheck
