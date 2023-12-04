"use client";

// import { addTicket } from "@/actions/tickets/json-server";
import { addTicketFormData } from "@/actions/tickets/mongodb";
// import { addTicket } from "@/actions/tickets/mongodb";
// import { addTicketFormData } from "@/actions/tickets/json-server";
// import { addTicketFormData } from "@/actions/tickets/supabase";
// import { addTicketFormData } from "@/actions/tickets/firebase";
// import { addTicketFormData } from "@/actions/tickets/appwrite";

/* react */
import { useState } from 'react'

/* next */
import { useRouter } from 'next/navigation'

/* components */
import SubmitButton from "./SubmitButton";

/* formData + server action */
export default function CreateForm() {
  return (
    <>
      <form action={addTicketFormData} className="w-1/2">
        <label>
          <span>Title:</span>
          <input required type="text" name="title" />
        </label>
        <label>
          <span>Body:</span>
          <textarea required type="text" name="body" />
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
        {/* <button type="submit">Submit</button> */}
      </form>
    </>
  );
}

/* hooks + api route */
// export default function CreateForm() {
//   const [title, setTitle] = useState("");
//   const [body, setBody] = useState("");
//   const [priority, setPriority] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const router = useRouter()

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)

//     const newTicket = { title, body, priority, user_email: 'test123@gmail.com' }

//     /* api route */
//     const res = await fetch('/api/tickets/mongodb', {
//       method: "POST",
//       headers: {"Content-Type": "application/json"},
//       body: JSON.stringify(newTicket),
//     })

//     if (res.status === 201) {
//       router.refresh()
//       router.push('/tickets')
//     }

//     /* server action */
//     // try {
//     //   const ticket = addTicket(newTicket)
//     //   console.log('ticket | create form: ', ticket)
//     //   router.refresh()
//     //   router.push('/tickets')
//     // }
//     // catch (error) {
//     //   console.log('Error: ', error)
//     // }
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit} className="w-1/2">
//         <label>
//           <span>Title:</span>
//           <input
//             required
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </label>
//         <label>
//           <span>Body:</span>
//           <textarea
//             required
//             type="text"
//             value={body}
//             onChange={(e) => setBody(e.target.value)}
//           />
//         </label>
//         <label>
//           <span>Priority:</span>
//           <select
//             value={priority}
//             onChange={(e) => setPriority(e.target.value)}
//           >
//             <option value="low">Low Priority</option>
//             <option value="medium">Medium Priority</option>
//             <option value="high">High Priority</option>
//           </select>
//         </label>
//         <button className="btn-primary" disabled={isLoading}>
//           {isLoading && <span>Adding...</span>}
//           {!isLoading && <span>Add Ticket</span>}
//         </button>
//       </form>
//     </>
//   );
// }
