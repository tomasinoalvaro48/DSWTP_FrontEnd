import { useState, useEffect } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../../endpoints.config.ts'

// Define the get and post functions to interact with the API

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
async function post<T = unknown>(url: string, data: T) {
  try {
    await axios.post(`${BACKEND_URL}/api/${url}`, data)
  } catch (err: any) {
  } finally {
    console.log('Post request completed', data)
  }
}

// Exportamos las funciones para usarlas en otros archivos
export { get, post }
