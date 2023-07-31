import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'

const WithdrawForm = () => {
  const [amount, setAmount] = useState(0)
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

    const withdraw = {amount}

    const backend_url = 'http://' + 
    process.env.REACT_APP_BACKEND_HOST + ':' +         
    process.env.REACT_APP_BACKEND_PORT

    const response = await fetch(backend_url + '/api/account/withdraw', {
      method: 'PATCH',
      body: JSON.stringify(withdraw),
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
      console.log('a withdraw was made', json)
    }
  }

  return (
    show ? (
      <form className="withdraw">
        <h3>Make a Withdraw</h3>

        <label>Amount:</label>
        <input
          type="number"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
        />

        <button onClick={handleSubmit} type="button">Confirm</button>
        {error && <div className="error">{error}</div>}
      </form>
    ):(
      <form className="signup">
        <h3>Make a Withdraw</h3>
        <p>Withdraw of <strong>SGD ${amount}</strong> was successful.</p>
        <button disabled={isLoading} onClick={() => navigate("/")} type="button">Continue</button>
        {error && <div className="error">{error}</div>}
      </form>
    )
  )
}

export default WithdrawForm