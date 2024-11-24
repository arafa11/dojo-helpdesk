import { notFound } from 'next/navigation'

export const dynamicParams = true // default is true (if false 404 if 'id' doesn't exist)

// [{id: '1'}, {id: '2'}, {id: '3'}]
export async function generateStaticParams(params) {
  const res = await fetch('http://localhost:5000/tickets')
  const tickets = await res.json()
  return tickets.map((ticket) => ({ id: ticket.id }))
}

async function getTicket(id) {
  const res = await fetch(`http://localhost:5000/tickets/${id}`, {
    next: {
      revalidate: 60,
    },
  })
  if (!res.ok) {
    notFound()
  }
  return res.json()
}

export default async function TicketDetails({ params }) {
  const id = params.id
  const ticket = await getTicket(id)
  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  )
}
