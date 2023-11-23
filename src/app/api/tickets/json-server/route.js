import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("http://localhost:4000/tickets", {
    next: {
      revalidate: 0 // disable cache, force fetch database every time
      // revalidate: 60, // 每隔 60 秒 fetch json-server
    },
  });
  const tickets = await res.json()

  return NextResponse.json(tickets, { status: 200 })
}

export async function POST(request) {
  const ticket = await request.json()

  const res = await fetch('http://localhost:4000/tickets', {
    method: 'POST',
    headers: 'Content-Type: application/json',
    body: JSON.Stringify(ticket)
  })
  const newTicket = res.json()
  
  return NextResponse.json(newTicket, { status: 201 })
}