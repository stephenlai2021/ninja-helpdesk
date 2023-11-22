"use server"

import { Client, Databases } from "appwrite";
import { notFound } from "next/navigation";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6554cd8e0fc2083334b6");

export async function getTickets() {
  const databases = new Databases(client);

  const res = await databases.listDocuments(
    "6559c1f61971f0447dbe",
    "6559ca511dc0f0ae8d5f"
  );
  const tickets = res.documents;

  return tickets;
}

export async function getTicket(id) {
  const databases = new Databases(client);

  const res = await databases.getDocument(
    "6559c1f61971f0447dbe",
    "6559ca511dc0f0ae8d5f",
    id
  );
  
  // return res;
  if (!res.ok) notFound();
  return res;
}
