import React, { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'

const FeedbackStats = () => {
  const { feedbacks } = useContext(FeedbackContext)

  //calculate rating avg
  let averageRating =
    feedbacks.reduce((acc, curr) => {
      return acc + curr.rating
    }, 0) / feedbacks.length

  averageRating = averageRating.toFixed(1).replace(/\.0$/, '')

  return (
    <div className='feedback-stats'>
      <h4>{feedbacks.length} Reviews</h4>
      <h4>Average Rating: {isNaN(averageRating) ? 0 : averageRating}</h4>
    </div>
  )
}

export default FeedbackStats
