import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [balance, setBalance] = useState(1000)
  const {signup, error, isLoading, show} = useSignup()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(name, email, password, balance)
    
  }

  return (
    show ? (
      <form className="signup">
        <h3>Signup</h3>
        
        <label>Name:</label>
        <input 
          type="text" 
          onChange={(e) => setName(e.target.value)} 
          value={name} 
        />
        <label>Email address:</label>
        <input 
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email} 
        />
        <label>Password:</label>
        <input 
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password} 
        />
        <label>Initial deposit:</label>
        <input 
          type="number" 
          onChange={(e) => setBalance(e.target.value)} 
          value={balance} 
        />

        <button disabled={isLoading} onClick={handleSubmit} type="button">Signup</button>
        {error && <div className="error">{error}</div>}
      </form>
    ):(
      <form className="signup">
        <h3>Create Account</h3>
        <p>Account <strong>{name}</strong> created successfully.</p>
        <button disabled={isLoading} onClick={() => navigate("/login")} type="button">Go to Login</button>
        {error && <div className="error">{error}</div>}
      </form>
    )
  )
}

export default Signup