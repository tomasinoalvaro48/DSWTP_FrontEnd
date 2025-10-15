import axios from 'axios'
import { useState, useEffect } from 'react'
import { BACKEND_URL } from '../../endpoints.config.ts'

// Definición de las funciones para manejar las operaciones CRUD.

// Usé generics para que las funciones sean reutilizables con diferentes tipos de datos
// Cuando se llame a la función (usando import { get, post, patch, remove } from './api/dataManager.ts')
// se debe especificar el tipo de dato que se espera (por ejemplo, get<TipoAnomalia>("tipo_anomalia"))

// Controlador global de recargas
/*
let reloadListeners: (() => void)[] = [];

export function triggerReload() {
  reloadListeners.forEach(listener => listener());
}


function get<T>(url: string, config?: object) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAll = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${BACKEND_URL}/api/${url}`, config)
      setData(response.data.data)
      setError(null)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
      console.log('Data request completed')
    }
  }

  useEffect(() => {
    fetchAll()

    // suscribirse a las recargas globales
    const listener = () => fetchAll()
    reloadListeners.push(listener)

    // limpieza al desmontar
    return () => {
      reloadListeners = reloadListeners.filter(l => l !== listener)
    }
  }, [url]) // se recarga también si cambia la URL

  return { data, loading, error }
}
*/

// get function:
function get<T>(url: string, config?: object) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    fetchAll()
  }, [])
  const fetchAll = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/${url}`, config)
      setData(response.data.data)
    } catch (err: any) {
      setError(err.message)
      console.error(err.message)
    } finally {
      setLoading(false)
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
/*

async function patch<T>(url: string, data: T, config?: object) {
  try {
    await axios.patch(`${BACKEND_URL}/api/${url}`, data, config)
    triggerReload() // 🔄 notifica a todos los get()
  } catch (err: any) {
    console.error(err)
  } finally {
    console.log('Patch request completed')
  }
}

async function post<T>(url: string, data: T, config?: object) {
  try {
    await axios.post(`${BACKEND_URL}/api/${url}`, data, config)
    triggerReload() // 🔄
  } catch (err: any) {
    console.error(err)
  } finally {
    console.log('Post request completed')
  }
}

async function remove(url: string) {
  try {
    await axios.delete(`${BACKEND_URL}/api/${url}`)
    triggerReload() // 🔄
  } catch (err: any) {
    console.error(err)
  } finally {
    console.log('Delete request completed')
  }
}


*/

// post function:
/*
async function post<T>(url: string, data: T) {
  try {
    await axios.post(`${BACKEND_URL}/api/${url}`, data)
  } catch (err: any) {
  } finally {
    console.log('Post request completed')
  }
}
*/

//post funtion + config
async function post<T>(url: string, data: T, config?: object) {
  try {
    await axios.post(`${BACKEND_URL}/api/${url}`, data, config)
  } catch (err: any) {
    console.error(err)
  } finally {
    console.log('Post request completed')
  }
}

// update function:
async function patch<T>(url: string, data: T, config?: object) {
  try {
    return await axios.patch(`${BACKEND_URL}/api/${url}`, data, config)
  } catch (err: any) {
    console.error(err.message)
    throw err
  }
}

async function postAuth(email: string, password: string) {
  try {
    const res = await axios.post(`${BACKEND_URL}/api/auth/login`, { email, password })
    return { token: res.data.token, rol: res.data.rol }
  } catch (err: any) {
    console.error(err.message)
    return
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

//Para los filter, de manera que cuando se actualice lo vuelve a cargar
function getFilter<T>(url: string, config?: object) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true) // 👈 importante: para que marque loading cuando cambie url
      setError(null)
      try {
        const response = await axios.get(`${BACKEND_URL}/api/${url}`)
        setData(response.data.data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
        console.log('Data request completed', url)
      }
    }

    fetchAll()
  }, [url])

  return { data, loading, error }
}

// Exportamos las funciones para usarlas en otros archivos
export { get, getOne, post, patch, remove, getFilter, postAuth }
