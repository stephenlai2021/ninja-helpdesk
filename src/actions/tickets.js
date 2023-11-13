"use server";

import { notFound } from "next/navigation";

export async function getTickets() {
  await new Promise(resolve => setTimeout(resolve, 3000))

  const res = await fetch("http://localhost:4000/tickets", {
    next: {
      // revalidate: 0 // disable cache, force fetch database every time
      revalidate: 60, // 每隔 60 秒 fetch json-server
    },
  });

  return res.json();
}

export async function getTicket(id) {
  await new Promise(resolve => setTimeout(resolve, 3000))

  const res = await fetch("http://localhost:4000/tickets/" + id, {
    next: {
      revalidate: 60, // disable cache, force fetch database every time
    },
  });

  if (!res.ok) notFound();  

  return res.json();
}
