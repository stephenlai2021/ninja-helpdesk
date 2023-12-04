"use server";

/* mongodb */
import Ticket from "@/models/ticket";

/* next */
import { revalidatePath } from "next/cache";
import { redirect, notFound } from "next/navigation";

export async function getTickets() {
  try {
    const tickets = await Ticket.find().sort({ _id: "desc" });
    return tickets;
  } catch (error) {
    console.log("Error: ", error);
  }
}

export async function getTicket(id) {
  try {
    const ticket = await Ticket.findById(id);
    console.log("ticket | server action: ", ticket);
    return ticket;
  } catch (error) {
    console.log("Error: ", error);
  }
}

export async function addTicket(ticket) {
  console.log("ticket | server action: ", ticket);
  return ticket;
}

export async function addTicketFormData(formData) {
  const title = formData.get("title");
  const body = formData.get("body");
  const priority = formData.get("priority");
  console.log("title: ", title);
  console.log("body: ", body);
  console.log("priority: ", priority);

  await Ticket.create({
    title,
    body,
    priority,
    user_email: "stephenlaitest@gmail.com",
  });
  console.log("ticket created successfully!");
  revalidatePath("/tickets");
  redirect("/tickets");
}

export async function deleteTicket(id) {
  await Ticket.findByIdAndDelete(id);
  console.log("Ticket deteted successfully!");
  revalidatePath("/tickets");
  redirect("/tickets")
}
