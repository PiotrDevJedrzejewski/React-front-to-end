import FeedbackItem from './FeedbackItem'
import { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'

const FeedbackList = () => {
  const { feedbacks } = useContext(FeedbackContext)

  if (!feedbacks || feedbacks.length === 0) return <p>No feedbacks, sorry</p>

  return (
    <div className='feedback-list'>
      {feedbacks.map((item) => {
        return <FeedbackItem key={item.id} item={item} />
      })}
    </div>
  )
}

export default FeedbackList
