import { useState } from 'react'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [show, setShow] = useState(true)

  const signup = async (name, email, password, balance) => {
    setIsLoading(true)
    setError(null)
    setShow(true)

    const backend_url = 'http://' + 
    process.env.REACT_APP_BACKEND_HOST + ':' +         
    process.env.REACT_APP_BACKEND_PORT

    const response = await fetch(backend_url + '/api/user/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ name, email, password, balance })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
      setShow(true)
    }
    if (response.ok) {
      // update loading state
      setIsLoading(false)      
      setShow(false)
    }
  }

  return { signup, isLoading, error, show }
}