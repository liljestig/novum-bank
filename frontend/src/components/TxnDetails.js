// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const TxnDetails = ({ txn }) => {

  return (
    <div className="txn-details">
      <h4>{txn.type}</h4>
      <p><strong>Amount: </strong>SGD ${txn.amount}</p>
      <p>{txn.message}</p>
      <p>{formatDistanceToNow(new Date(txn.createdAt), { addSuffix: true })}</p>
    </div>
  )
}

export default TxnDetails