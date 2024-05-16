import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'

const Category = () => {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetchedListing, setLastFetchedListing] = useState(null)

  const params = useParams()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        //get refrence
        const listingsRef = collection(db, 'listings')

        //get query
        const q = query(
          listingsRef,
          where('type', '==', params.categoryName),
          orderBy('timestamp', 'desc'),
          limit(10)
        )

        // Execute query
        const querySnapshot = await getDocs(q)

        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
        setLastFetchedListing(lastVisible)

        const listings = []

        querySnapshot.forEach((doc) => {
          listings.push({ id: doc.id, ...doc.data() })
        })
        setListings(listings)
        setLoading(false)
      } catch (error) {
        console.error(error)
        toast.error('Error fetching listings')
        setLoading(false)
      }
    }
    fetchListings()
  }, [params.categoryName])

  //Pagination / Load more
  const onFetchMoreListings = async () => {
    try {
      //get refrence
      const listingsRef = collection(db, 'listings')

      //get query
      const q = query(
        listingsRef,
        where('type', '==', params.categoryName),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(10)
      )

      // Execute query
      const querySnapshot = await getDocs(q)

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
      setLastFetchedListing(lastVisible)

      const listings = []

      querySnapshot.forEach((doc) => {
        listings.push({ id: doc.id, ...doc.data() })
      })
      setListings((prevListings) => [...prevListings, ...listings])
      setLoading(false)
    } catch (error) {
      console.error(error)
      toast.error('Error fetching listings')
      setLoading(false)
    }
  }

  return (
    <div className='category'>
      <header>
        <p className='pageHeader'>
          {params.categoryName === 'rent'
            ? 'Places for rent'
            : 'Places for sale'}
        </p>
      </header>
      {loading ? (
        <Spinner />
      ) : listings && listings.length ? (
        <>
          <main>
            <ul className='categoryListings'>
              {listings.map((listing) => (
                <ListingItem
                  listing={listing}
                  id={listing.id}
                  key={listing.id}
                />
              ))}
            </ul>
          </main>

          <br />
          <br />
          {lastFetchedListing && (
            <p className='loadMore' onClick={onFetchMoreListings}>
              Load More
            </p>
          )}
        </>
      ) : (
        <p>No listings for {params.categoryName}</p>
      )}
    </div>
  )
}

export default Category
