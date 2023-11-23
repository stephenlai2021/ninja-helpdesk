"use client";

import { addTicket } from "@/actions/tickets/json-server";
// import { addTicketFormData } from "@/actions/tickets/json-server";
import { addTicketFormData } from "@/actions/tickets/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

/* components */
// import SubmitButton from "./SubmitButton";

export default function CreateForm() {
  // const router = useRouter();

  // const [title, setTitle] = useState("");
  // const [body, setBody] = useState("");
  // const [priority, setPriority] = useState("low");
  // const [isLoading, setIsLoading] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   const newTicket = {
  //     title,
  //     body,
  //     priority,
  //     user_email: "test123@gmail.com",
  //   };

  //   /* json-server */
  //   const { status } = await addTicket(newTicket);
  //   if (status === "ok") {
  //     router.refresh();
  //     router.push("/tickets");
  //   }

  //   /* supabase */
  //   const { data, error } = await addTicket(newTicket)
  //   if (error) console.log(error)
  //   if (data) {
  //     console.log(data)
  //     router.refresh();
  //     router.push("/tickets");
  //   }
  // };

  return (
    // <form onSubmit={handleSubmit} className="w-1/2">
    <form action={addTicketFormData} className="w-1/2">
      <label>
        <span>Title:</span>
        {/* <input
          required
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        /> */}
        <input
          required
          type="text"          
          name="title"
        />
      </label>
      <label>
        <span>Body:</span>
        {/* <textarea
          required
          type="text"
          onChange={(e) => setBody(e.target.value)}
          value={body}
        /> */}
        <textarea
          required
          type="text"
          name="body"
        />
      </label>
      <label>
        <span>Priority:</span>
        {/* <select onChange={(e) => setPriority(e.target.value)} value={priority}> */}
        <select name="priority">
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </label>
      {/* <button className="btn-primary" disabled={isLoading}> */}
      <button className="btn-primary">
        {/* {isLoading && <span>Adding...</span>}
        {!isLoading && <span>Add Ticket</span>} */}
        <span>Add Ticket</span>
      </button>
      {/* <SubmitButton /> */}
    </form>
  );
}
