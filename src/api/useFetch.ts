import { useState, useEffect } from 'react'

export function useFetch<T>(params: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`/api${params}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data)
      })
      .finally(() => {
        setLoading(false)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  return { data, loading }
}
