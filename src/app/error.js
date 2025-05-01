'use client' // Error components must be Client Components
 
export default function Error({ reset }) {
 
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