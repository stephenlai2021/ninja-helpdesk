"use client"

import { useTransition } from 'react'
// import { deleteTicket } from '@/actions/tickets/supabase'
import { deleteTicket } from '@/actions/tickets/mongodb'
// import { deleteTicket } from '@/actions/tickets/firebase'
// import { deleteTicket } from '@/actions/tickets/appwrite'

// icons & UI
import { TiDelete } from 'react-icons/ti'

export default function DeleteButton({ id }) {
  let [isPending, startTransition] = useTransition()

  return (
    <button 
      className="btn-primary" 
      onClick={() => startTransition(() => deleteTicket(id))}
      disabled={isPending}
    >
      {isPending && (
        <>
          <TiDelete />
          Deleting....
        </>
      )}
      {!isPending && (
        <>
          <TiDelete />
          Delete Ticket
        </>
      )}
    </button>
  )
}