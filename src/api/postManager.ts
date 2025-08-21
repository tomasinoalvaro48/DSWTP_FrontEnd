import { useState, useEffect } from 'react'
import axios from 'axios'
import type { TipoAnomalia } from '../DTOs/TipoAnomaliaDTO.ts'

export function postManager(url: string) {
  const [post, setPost] = useState<TipoAnomalia[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await axios.get(url)
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
