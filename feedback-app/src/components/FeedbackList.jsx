import FeedbackItem from './FeedbackItem'
import { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'
import Spinner from './shared/Spinner'

const FeedbackList = () => {
  const { feedbacks, isLoading } = useContext(FeedbackContext)

  if (!isLoading && (!feedbacks || feedbacks.length === 0)) {
    return <p>No feedbacks, sorry</p>
  }

  if (isLoading) {
    return <Spinner />
  } else
    return (
      <div className='feedback-list'>
        {feedbacks.map((item) => {
          return <FeedbackItem key={item.id} item={item} />
        })}
      </div>
    )
}

export default FeedbackList
