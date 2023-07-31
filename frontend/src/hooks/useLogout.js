import { useAuthContext } from './useAuthContext'
import { useTxnsContext } from './useTxnsContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchTxns } = useTxnsContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchTxns({ type: 'SET_TXNS', payload: null })
  }

  return { logout }
}