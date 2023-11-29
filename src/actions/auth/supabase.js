"use server"

import createSupabaseServerClient from "@/config/supabase-server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(formData) {
  // const credentails = Object.fromEntries(formData)
  // console.log('user credentials: ', credentails)  
  // delete credentails.$ACTION_ID_cb04af0ce13c81400533c345b60c96783456a1f9
  // console.log("filtered credentials: ", credentails);

  const email = formData.get('email')
  const password = formData.get('password')
  console.log('email: ', email)
  console.log('password: ', password)

  const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.log("login error: ", error.message);
    }
    if (!error) {
      revalidatePath('/')
      redirect("/");
    }
}

export async function signUp(formData) {
  // const credentails = Object.fromEntries(formData)
  // console.log('user credentials: ', credentails)  
  // delete credentails.$ACTION_ID_cb04af0ce13c81400533c345b60c96783456a1f9
  // console.log("filtered credentials: ", credentails);

  const email = formData.get('email')
  const password = formData.get('password')
  console.log('email: ', email)
  console.log('password: ', password)

  const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.log("login error: ", error.message);
    }
    if (!error) {
      revalidatePath('/')
      redirect("/");
    }
}