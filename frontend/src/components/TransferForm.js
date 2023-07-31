import { useState } from 'react'
import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate } from 'react-router-dom'

const TransferForm = () => {
  const [email, setEmail] = useState('')
  const [amount, setAmount] = useState(0)
  const [message, setMessage] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [show, setShow] = useState(true)
  const {user} = useAuthContext()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    setError(null)
    setShow(true)

    const transfer = {email, amount, message}

    const backend_url = 'http://' + 
    process.env.REACT_APP_BACKEND_HOST + ':' +         
    process.env.REACT_APP_BACKEND_PORT

    const response = await fetch(backend_url + '/api/account/transfer', {
      method: 'PATCH',
      body: JSON.stringify(transfer),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      setIsLoading(false)      
      setShow(false)
      console.log('a transfer was made', json)
    }
  }

  return (
    show ? (
      <form className="transfer">
        <h3>Make a Transfer</h3>

        <label>Email address:</label>
        <input 
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email} 
        />

        <label>Amount:</label>
        <input
          type="number"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
        />

        <label>Message:</label>
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />

        <button onClick={handleSubmit} type="button">Confirm</button>
        {error && <div className="error">{error}</div>}
      </form>
    ):(
      <form className="signup">
        <h3>Make a Transfer</h3>
        <p>Transfer of <strong>SGD ${amount}</strong> to <strong>{email}</strong> was successful.</p>
        <button disabled={isLoading} onClick={() => navigate("/")} type="button">Continue</button>
        {error && <div className="error">{error}</div>}
      </form>
    )
  )
}

export default TransferForm