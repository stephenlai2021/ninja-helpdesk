"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/* firebase */
import { firebaseDb } from "@/config/firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";

export async function getTickets() {
  let tickets = [];

  const snapshot = await getDocs(
    query(collection(firebaseDb, "tickets"), orderBy("created_at", "desc"))
  );
  snapshot.forEach((doc) => {
    // tickets = [...tickets, { id: doc.id, ...doc.data() }];
    // tickets = [{ id: doc.id, ...doc.data() }, ...tickets];
    tickets.push({ id: doc.id, ...doc.data() })
  });

  console.log("tickets: ", tickets);
  return tickets;
}

export async function getTicket(id) {
  const docSnap = await getDoc(doc(firebaseDb, "tickets", id));
  return docSnap.data();
}

export async function addTicket(ticket) {
  const docRef = await addDoc(collection(firebaseDb, "tickets"), {
    ...ticket,
    user_email: "test123@gamil.com",
    created_at: serverTimestamp(),
  });

  console.log("ticket: ", docRef.data());
  return docRef.data();
}

export async function addTicketFormData(formData) {
  const ticket = Object.fromEntries(formData);

  const docRef = await addDoc(collection(firebaseDb, "tickets"), {
    ...ticket,
    user_email: "test123@gamil.com",
    created_at: serverTimestamp(),
  });

  console.log("ticket: ", docRef);
  revalidatePath("/tickets");
  redirect("/tickets");
}

export async function deleteTicket(id) {
  await deleteDoc(doc(firebaseDb, "tickets", id));
  revalidatePath("/tickets");
  redirect("/tickets");
}
