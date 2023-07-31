import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import TxnDetails from "../components/TxnDetails"

const Home = () => {
  const [txns, setTxns] = useState(null)
  const {user} = useAuthContext()
  const [balance, setBalance] = useState('')
  const [now, setNow] = useState('')
  
  useEffect(() => {
    const fetchTxns = async () => {
      const backend_url = 'http://' + 
        process.env.REACT_APP_BACKEND_HOST + ':' +         
        process.env.REACT_APP_BACKEND_PORT
      
      const response = await fetch(backend_url + '/api/transactions', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        setTxns(json)
      }
    }

    const fetchBal = async () => {

      const backend_url = 'http://' + 
        process.env.REACT_APP_BACKEND_HOST + ':' +         
        process.env.REACT_APP_BACKEND_PORT

      const response = await fetch(backend_url + '/api/account/balance', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
        console.log(json.balance.toFixed(2))
        setBalance(json.balance.toFixed(2))
      }      
    }

    fetchTxns()
    fetchBal()
    const date = new Date()
    setNow(date.toString())
  }, [user])

  return (
    <div className="home">
      <div>
        {txns && txns.map(txn => (
          <TxnDetails txn={txn} key={txn._id} />
        ))}
      </div>
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <h3>Account Balance</h3>
                <h2>SGD ${balance}</h2>
                <p>{now}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home