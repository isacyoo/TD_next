'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
 
export default function Error({ error, reset }) {
const redirect = useRouter().push
 
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => router.push('/home')
        }
      >
        Return to Home page
      </button>
    </div>
  )
}