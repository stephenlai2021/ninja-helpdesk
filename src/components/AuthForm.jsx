"use client";

import { useState } from "react";
import Link from "next/link";

export default function AuthForm({ handleSubmit, auth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    // <form onSubmit={(e) => handleSubmit(e, email, password)}>
    //   <label>
    //     <span>Email:</span>
    //     <input
    //       type="email"
    //       onChange={(e) => setEmail(e.target.value)}
    //       value={email}
    //       required
    //     />
    //   </label>
    //   <label>
    //     <span>Password:</span>
    //     <input
    //       type="password"
    //       onChange={(e) => setPassword(e.target.value)}
    //       value={password}
    //       required
    //     />
    //   </label>
    //   <button className="btn-primary">Submit</button>
    // </form>

    <div className="grid place-items-center">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">{auth}</h1>

        <form onSubmit={(e) => handleSubmit(e, email, password)}>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            required
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Login
          </button>

          {auth === "Log in" && (
            <Link className="text-sm mt-3 text-right" href="/signup">
              Don't have an account? <span className="underline">Sign up</span>
            </Link>
          )}
          {auth === "Sign up" && (
            <Link className="text-sm mt-3 text-right" href="/login">
              Already have an account? <span className="underline">Log in</span>
            </Link>
          )}
        </form>
      </div>
    </div>
  );
}
