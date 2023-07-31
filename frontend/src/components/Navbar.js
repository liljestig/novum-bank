import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const navigate = useNavigate();

  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div className="container">
        <div id="left-header">
          <nav>
            <Link to="/">
              <strong>Novum Bank</strong>
            </Link>
          </nav>
        </div>
        <div id="mid-header">
          {user && (
            <div>
              <nav>
                <Link to="/deposit">
                  <strong>Deposit</strong>
                </Link>
                <Link to="/withdraw">
                  <strong>Withdraw</strong>
                </Link>
                <Link to="/transfer">
                  <strong>Transfer</strong>
                </Link>
              </nav>
            </div>
          )}
        </div>
        <div id="right-header">
          {user && (
            <div>
              <nav>
                <span><strong>{user.email}</strong></span>
                <button onClick={handleClick}>Log out</button>
              </nav>
            </div>
          )}
          {!user && (
            <div>
              <nav>
                <button onClick={() => navigate("/login")}>Login</button>
                <button onClick={() => navigate("/signup")}>Signup</button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar