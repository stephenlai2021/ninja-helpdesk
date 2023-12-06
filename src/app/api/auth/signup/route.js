/* mongodb */
import User from "@/models/user";

/* next */
import { NextResponse } from "next/server";

/* others */
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return NextResponse.json(
        { message: "Email is already in use" },
        { status: 400 }
      );

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });

    return NextResponse.json(
      { message: "User registerd succesfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
