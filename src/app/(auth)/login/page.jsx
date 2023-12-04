"use client";

/* react */
import { useState, useEffect } from "react";

/* next */
import { useRouter } from "next/navigation";

/* context */
import { CounterContext } from "@/context/counter";
import { useContext } from "react";

/* jotai */
import { atom, useAtom } from "jotai";

/* zustand */
import useCountStore from "@/stores/zustand/count";

/* next-auth */
import { signIn } from "next-auth/react";

/* supabase */
import createSupabaseClient from "@/config/supabase-client";
import { login } from "@/actions/auth/supabase";

/* firebase */
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "@/config/firebase";

/* components */
import AuthForm from "@/components/AuthForm";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  /* zustand */
  // const { count, dec, inc } = useCountStore()

  /* jotai - Not working !!! */
  // const counter = atom(0);
  // const [count, setCounter] = useAtom(counter);
  // const inc = () => setCounter(prev => prev + 1);
  // const dec = () => setCounter(counter => counter - 1);
  
  /* context */
  const { appState, incrementCounter, decrementCounter } = useContext(CounterContext)

  const handleSubmitFirebase = async (e, email, password) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("signin user: ", user);
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log("error code: ", error.code);
      console.log("error message: ", error.message);
      setError(error.message);
    }
  };

  const handleSubmitSupabase = async (e, email, password) => {
    e.preventDefault();
    setError("");

    const supabase = await createSupabaseClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setError(error.message);
    if (!error) {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <main className="">
      {/* supabase */}
      {/* <h2 className="text-center">Login</h2> */}

      {/* zustand */}
      {/* <div className="flex">
        <span className="flex items-center">{count}</span>
        <button onClick={inc}>one up</button>
        <button onClick={dec}>one down</button>
      </div> */}

      {/* context */}
      <div className="flex">
        <span className="flex items-center">{appState.counter}</span>
        <button onClick={incrementCounter}>increment</button>
        <button onClick={decrementCounter}>decrement</button>
      </div>

      {/* jotai - Not working !!! */}
      {/* <h2>Jotai</h2>
      <div className="flex">
        <span className="flex items-center">{count}</span>
        <button onClick={inc}>one up</button>
        <button onClick={dec}>one down</button>
      </div> */}

      <AuthForm handleSubmit={handleSubmitSupabase} auth="Log in" />
      {error && <div className="error">{error}</div>}

      {/* nextauth + mongodb */}
      {/* <LoginForm /> */}

      {/* supabase formdata */}
      {/* <form action={login}>
        <label>
          <span>Email:</span>
          <input
            type="email"
            name="email"
            required
          />
        </label>
        <label>
          <span>Password:</span>
          <input
            type="password"
            name="password"
            required
          />
        </label>
        <button className="btn-primary">Submit</button>
      </form> */}

      {/* firebase */}
      {/* <AuthForm handleSubmit={handleSubmitFirebase} /> */}
      {/* {error && <div className="error">{error}</div>} */}

      {/* next-auth */}
      {/* <div className="my-[32px] bg-[#0d1116] py-[20px] px-[32px] flex justify-center max-w-[250px] mx-auto">
        <div className="min-w-[230px] borde flex flex-col">
          <button
            className="bg-[#24292f] py-[12px] px-[]16px] mb-[10px] rounded-[10px]"
            onClick={() => signIn("github", { callbackUrl: "/" })}
          >
            <img
              loading="lazy"
              height="24"
              width="24"
              id="provider-logo-dark"
              src="https://authjs.dev/img/providers/github.svg"
            />
            <span className="text-[18px]">Sign in with Github</span>
          </button>
          <button
            className="bg-[#24292f] py-[12px] px-[]16px] mb-[10px] rounded-[10px]"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            <img
              loading="lazy"
              height="24"
              width="24"
              id="provider-logo-dark"
              src="https://authjs.dev/img/providers/google.svg"
            />
            <span className="text-[18px]">Sign in with Google</span>
          </button>
        </div>
      </div> */}
    </main>
  );
}
