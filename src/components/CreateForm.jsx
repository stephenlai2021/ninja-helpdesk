"use client";

import { addTicket } from "@/actions/tickets/json-server";
// import { addTicketFormData } from "@/actions/tickets/json-server";
// import { addTicketFormData } from "@/actions/tickets/supabase";
import { addTicketFormData } from "@/actions/tickets/firebase";
// import { addTicketFormData } from "@/actions/tickets/appwrite";

/* components */
import SubmitButton from "./SubmitButton";

export default function CreateForm() {
  return (
    <form action={addTicketFormData} className="w-1/2">
      <label>
        <span>Title:</span>
        <input
          required
          type="text"          
          name="title"
        />
      </label>
      <label>
        <span>Body:</span>
        <textarea
          required
          type="text"
          name="body"
        />
      </label>
      <label>
        <span>Priority:</span>
        <select name="priority">
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </label>
      <SubmitButton />
    </form>
  );
}
