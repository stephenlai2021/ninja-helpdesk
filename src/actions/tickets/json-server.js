"use server";

import { notFound, redirect } from "next/navigation";

export async function getTickets() {
  // await new Promise(resolve => setTimeout(resolve, 3000))

  const res = await fetch("http://localhost:4000/tickets", {
    next: {
      revalidate: 0
    }
  });

  return res.json();
}

export async function getTicket(id) {
  // await new Promise(resolve => setTimeout(resolve, 3000))

  const res = await fetch("http://localhost:4000/tickets/" + id);

  if (!res.ok) notFound();
  return res.json();
}

export async function addTicket(ticket) {
  const res = await fetch("http://localhost:4000/tickets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ticket),
  });

  if (!res.ok) {
    console.log('cannot create ticket!')
    return { status: 'fail' }
  }
  
  return { status: 'ok' }

}
export async function addTicketFormData(formData) {
  const ticket = Object.fromEntries(formData)
  const res = await fetch("http://localhost:4000/tickets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...ticket,
      user_email: "test123@gmail.com"
    }),
  });
  redirect('/tickets')  
}