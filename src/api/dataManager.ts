import axios from 'axios'
import { useState, useEffect } from 'react'
import { BACKEND_URL } from '../../endpoints.config.ts'

// Definición de las funciones para manejar las operaciones CRUD.

// Usé generics para que las funciones sean reutilizables con diferentes tipos de datos
// Cuando se llame a la función (usando import { get, post, patch, remove } from './api/dataManager.ts')
// se debe especificar el tipo de dato que se espera (por ejemplo, get<TipoAnomalia>("tipo_anomalia"))

// get function:
function get<T>(url: string) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    fetchAll()
  }, [])
  const fetchAll = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/${url}`)
      setData(response.data.data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
      console.log('Data request completed')
    }
  }
  return { data, loading, error }
}

// getOne function:
function getOne<T>(url: string) {
  const [data, setData] = useState<T>()
  useEffect(() => {
    fetchOne()
  }, [])
  async function fetchOne() {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/${url}`)
      setData(response.data.data)
    } catch (err: any) {
      console.error(err.message)
    } finally {
      console.log('Data request completed')
    }
  }
  return { data }
}

// post function:
async function post<T>(url: string, data: T) {
  try {
    await axios.post(`${BACKEND_URL}/api/${url}`, data)
  } catch (err: any) {
  } finally {
    console.log('Post request completed')
  }
}

// update function:
async function patch<T>(url: string, data: T) {
  try {
    await axios.patch(`${BACKEND_URL}/api/${url}`, data)
  } catch (err: any) {
  } finally {
    console.log('Patch request completed')
  }
}

// delete function:
async function remove(url: string) {
  try {
    await axios.delete(`${BACKEND_URL}/api/${url}`)
  } catch (err: any) {
    console.log(err.message)
  } finally {
    console.log('Delete request completed')
  }
}

// Exportamos las funciones para usarlas en otros archivos
export { get, getOne, post, patch, remove }
