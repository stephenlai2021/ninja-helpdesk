"use server";

import { Client, Databases, Permission, Role } from "appwrite";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

/* create appwrite instance */
const client = new Client();
const databases = new Databases(client);
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6554cd8e0fc2083334b6");

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
    notFound();
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

export async function addTicketFormData(formData) {
  const ticket = Object.entries(formData);
  console.log("ticket:", ticket);

  delete ticket.$ACTION_ID_03acda53bf9a11717f791aaf7589ef1207793a80;
  console.log("filtered ticket: ", ticket);

  try {
    const res = await databases.createDocument(
      "6559c1f61971f0447dbe",
      "6559ca511dc0f0ae8d5f",
      {
        ...ticket,
        user_email: "test123@gmail.com",
      },
      // [
      //   Permission.read(Role.any()), 
      //   Permission.create(Role.any()), 
      //   Permission.update(Role.any()), 
      //   Permission.delete(Role.any()), 
      // ]
    );
    console.log("add ticket res: ", res);
    revalidatePath("/tickets");
    redirect("/tickets");
  } catch (error) {
    console.log('create ticket error: ', error)
    throw new Error("Could not add the new ticket.");
  }
}

export async function deleteTicket(id) {
  try {
    await databases.deleteDocument(
      "6559c1f61971f0447dbe",
      "6559ca511dc0f0ae8d5f",
      id,
      // [
      //   Permission.read(Role.any()), 
      //   Permission.create(Role.any()), 
      //   Permission.update(Role.any()), 
      //   Permission.delete(Role.any()), 
      // ]
    );
    revalidatePath("/tickets");
    redirect("/tickets");
  } catch (error) {
    throw new Error("Could not delete the ticket.");
  }
}
