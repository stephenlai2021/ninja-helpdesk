"use client";

/* react */
import { useState } from "react";

/* next */
import Link from "next/link";
import { useRouter } from "next/navigation";

/* nextauth */
import { signIn } from "next-auth/react";

export default function NextAuthLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidEmail = (email) => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(email);
    };

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res.error) {
      setError("Invalid Credentials");
      return;
    }

    router.push("/");
  };

  return (
    <div className="grid place-items-center">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold mt-4">Log in</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 px-0">
          <input
            className="w-[250px] m-0"
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
          <input
            className="w-full m-0"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2 w-full">
            Login
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
        </form>
        <button
          className="bg-slate-700 text-white font-bold cursor-pointer px-6 py-2 w-full flex justify-center"
          onClick={() => signIn("github", { callbackUrl: "/" })}
        >
          Sign In with Github
        </button>
        <Link className="text-sm flex justify-end mt-2" href={"/signup"}>
          Don't have an account? <span className="underline ml-1">Sign up</span>
        </Link>
      </div>
    </div>
  );
}
