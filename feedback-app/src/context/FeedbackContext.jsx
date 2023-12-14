import { createContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [feedbacks, setFeedbacks] = useState([
    { id: 1, rating: 9, text: 'Great service!' },
  ])

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedbacks([...feedbacks, newFeedback])
  }

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      setFeedbacks(feedbacks.filter((feedback) => feedback.id !== id))
    }
  }

  const editFeedback = (item, bool = true) => {
    setFeedbackEdit({ item, edit: bool })
  }

  const updateFeedback = (id, newItem) => {
    setFeedbacks(
      feedbacks.map((item) => (item.id === id ? { ...item, ...newItem } : item))
    )
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedbacks,
        feedbackEdit,
        addFeedback,
        deleteFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
