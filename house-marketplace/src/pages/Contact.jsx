import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import { getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'

const Contact = () => {
  const [message, setMessage] = useState('')
  const [landLord, setLandLord] = useState(null)
  //eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams()

  const params = useParams()

  const onChange = (e) => {
    setMessage(e.target.value)
  }

  useEffect(() => {
    const getLandLord = async () => {
      const docRef = doc(db, 'users', params.landlordId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setLandLord(docSnap.data())
      } else {
        toast.error('Landlord not found')
      }
    }
    getLandLord()
  }, [params.landlordId])

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Contact LandLord</p>
      </header>

      {landLord !== null && (
        <main>
          <div className='contactLandlord'>
            <p className='landlordName'>{landLord?.name}</p>
          </div>
          <form className='messageForm'>
            <div className='messageDiv'>
              <label htmlFor='message' className='messageLagel'>
                Message
              </label>
              <textarea
                className='textarea'
                name='message'
                id='message'
                rows='10'
                value={message}
                onChange={onChange}
              ></textarea>
            </div>

            <a
              href={`mailto:${landLord.email}?Subject=${searchParams.get(
                'listingName'
              )}&body=${message}`}
            >
              <button type='button' className='primaryButton'>
                Send Message
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  )
}

export default Contact
