import { useState,useEffect,useContext } from 'react'
import axios from 'axios'
import url from '../static/url'
import { context } from '../context/context'

const useGetCheck = id => {
    const [data,setData] = useState(null)
    const [isLoading,setIsLoading] = useState(true)
    const [error,setError] = useState(null)
    const { tokenAuth } = useContext(context)

    useEffect(() => {
        getData()
    },[])

    const getData = () => {
        axios.get(`${url}/checklist/${id}/item`,tokenAuth)
            .then(res => {
                setData(res.data.data)
                setIsLoading(false)
                console.log(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return { data,isLoading,error,getData }
}

export default useGetCheck
