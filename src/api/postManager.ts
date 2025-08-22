import { useState, useEffect } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../../endpoints.config.ts'

export function postManager<T = unknown>(url: string) {
  const [post, setPost] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/${url}`)
      console.log(response.data.data)
      setPost(response.data.data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { error, post, loading }
}
