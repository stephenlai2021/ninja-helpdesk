"use server";

import { Client, Databases } from "appwrite";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/* create appwrite instance */
const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6554cd8e0fc2083334b6");
const databases = new Databases(client);

export async function getTickets() {
  // const databases = new Databases(client);

  try {
    const res = await databases.listDocuments(
      "6559c1f61971f0447dbe",
      "6559ca511dc0f0ae8d5f"
    );
    const tickets = res.documents;

    return tickets;
  } catch (error) {
    console.log(error);
  }
}

export async function getTicket(id) {
  // const databases = new Databases(client);

  try {
    const res = await databases.getDocument(
      "6559c1f61971f0447dbe",
      "6559ca511dc0f0ae8d5f",
      id
    );
    return res;
  } catch (error) {
    console.log(error);
  }
  /* res = {
      title: 'Sam Altman just got fired by Open AI 😮',
      body: 'blah blah blah',
      priority: 'high',
      '$id': '6559cadc114c36e03e1c',
      '$createdAt': '2023-11-19T08:44:12.071+00:00',
      '$updatedAt': '2023-11-19T11:25:21.143+00:00',
      '$permissions': [],
      '$databaseId': '6559c1f61971f0447dbe',
      '$collectionId': '6559ca511dc0f0ae8d5f'
     }
  */
}

export async function deleteTicket(id) {
  try {
    const res = await databases.deleteDocument(
      "6559c1f61971f0447dbe",
      "6559ca511dc0f0ae8d5f",
      id
    );
    revalidatePath("/tickets");
    redirect("/tickets");
  } catch (error) {
    throw new Error("Could not delete the ticket.");
  }
}
