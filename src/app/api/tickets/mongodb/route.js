/* next */
import { NextResponse } from 'next/server'

/* mongodb */
import Ticket from '@/models/ticket'

export async function GET() {
  try {
    const tickets = await Ticket.find();

    return NextResponse.json({ tickets }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const ticket = await req.json()
    console.log('ticket | api route ', ticket)
    
    await Ticket.create(ticket)
    return NextResponse.json({ message: 'Ticket created' }, { status: 201 })
  }
  catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 })
  }
}