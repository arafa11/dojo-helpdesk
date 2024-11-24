import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <main className="text-center">
      <h2 className="text-3xl">There was a problem</h2>
      <p>We could not find the Ticket you're looking for</p>
      <p>
        Go back to the <Link href={'/tickets'}>Tickets</Link>
      </p>
    </main>
  )
}
