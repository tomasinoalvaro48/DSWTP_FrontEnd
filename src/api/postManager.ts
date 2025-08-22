import { useState, useEffect } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../../endpoints.config.ts'
import { useNavigate } from 'react-router'

// Define the get and post functions to interact with the API
// These functions will be used to fetch and post data to the backend
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// get function:
function get<T = unknown>(url: string) {
  const [post, setPost] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/${url}`)
      setPost(response.data.data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { error, post, loading }
}

// post function:
function post<T = unknown>(url: string, data: T, rout: string) {
  const [post, setPost] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    addPosts()
  }, [])

  const addPosts = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/${url}`, data)
      setPost(response.data.data)
    } catch (err: any) {
      setError(err.message)
      await sleep(10000)
    } finally {
      setLoading(false)
      console.log('Post request completed', data)
      navigate(`${rout}`)
    }
  }
  return { error, post, loading }
}
export { get, post }
