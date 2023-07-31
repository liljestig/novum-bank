import { createContext, useReducer } from 'react'

export const TxnsContext = createContext()

export const txnsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TXNS': 
      return {
        txns: action.payload
      }
    case 'CREATE_TXN':
      return {
        txns: [action.payload, ...state.txns]
      }
    case 'DELETE_TXN':
      return {
        txns: state.txns.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const TxnsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(txnsReducer, {
    txns: null
  })

  return (
    <TxnsContext.Provider value={{...state, dispatch}}>
      { children }
    </TxnsContext.Provider>
  )
}