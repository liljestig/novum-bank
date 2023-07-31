import { TxnsContext } from '../context/TxnContext'
import { useContext } from 'react'

export const useTxnsContext = () => {
  const context = useContext(TxnsContext)

  if (!context) {
    throw Error('useTxnsContext must be used inside an TxnsContextProvider')
  }

  return context
}