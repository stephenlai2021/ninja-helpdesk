import createSupabaseServerClient from "@/config/supabase-server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("ninja-helpdesk")
    .select()
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ message: "Error", err }, { status: 500 });
  return NextResponse.json(data, { status: 200 });
}

export async function POST(request) {
  const ticket = await request.json();
  const supabase = await createSupabaseServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  
  const { data, error } = await supabase
    .from("ninja-helpdesk-tickets")
    .insert({
      ...ticket,
      user_email: session.user.email,
    })
    .select()
    .single();

  if (error)  return NextResponse.json({ message: "Error", err }, { status: 500 });
  return NextResponse.json({ data, error }, { status: 500 });
}
