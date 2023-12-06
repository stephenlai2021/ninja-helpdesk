"use client";

/* react */
import { useState } from "react";

/* next */
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are necessary.");
      return;
    }      

    const validateEmail = (email) => {
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      return regex.test(email);
    }

    if (!validateEmail(email))  {
      setError('Email is invalid')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    if (res.status === 400) {
      setError("Email is already in use");
      return;
    }
    if (res.ok) router.push("/login");
    if (!res.ok) {
      console.log("User registration failed.");
      setError("User registration failed.");
      return;
    }
  };

  return (
    <div className="grid place-items-center">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold mt-4">Sign up</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 px-0">
          <input
            className="w-[250px] m-0"
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
            value={name}
            required
          />
          <input
            className="w-full m-0"
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            value={email}
            required
          />
          <input
            className="w-full m-0"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            value={password}
            required
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2 w-full">
            Register
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm flex justify-end" href={"/login"}>
            Already have an account? <span className="underline ml-1"> Log in</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
