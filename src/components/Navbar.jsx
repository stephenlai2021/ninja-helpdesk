import Link from "next/link";
import Image from "next/image";
import Logo from "./dojo-logo.png";
import LogoutButton from "./LogoutButton";

/* clerk */
// import { ClerkProvider, auth, currentUser } from "@clerk/nextjs";

/* next-auth */
import { getServerSession } from "next-auth";

/* supabase */
import createSupabaseServerClient from "@/config/supabase-server";

/* components */
import DarkModeButton from "./DarkmodeButton";

// export default async function Navbar({ user }) {
export default async function Navbar() {
  /* clerk */
  // const user = await currentUser()
  // console.log('user | navbar: ', user._User)

  /* nextauth */
  const session = await getServerSession();
  console.log("session | navbar: ", session);
  const user = session?.user;

  /* supabase */
  // const supabase = await createSupabaseServerClient()
  // const { data: { session } } = await supabase.auth.getSession();
  // const user = session?.user

  return (
    <nav>
      <Image
        src={Logo}
        className="pl-4"
        alt="Dojo Helpdesk logo"
        width={70}
        placeholder="blur"
        quality={100}
      />
      <Link href="/">
        <h1 className="max-[370px]:hidden">Dojo Helpdesk</h1>
        {/* <h1 className="">Dojo Helpdesk</h1> */}
      </Link>
      <Link href="/tickets" className="mr-auto max-[450px]:hidden">
        Tickets
      </Link>

      {/* supabase */}
      {/* {user && <span>{user?.email}</span>}
      {user && <LogoutButton />} */}

      {/* clerk */}
      {/* {user && <LogoutButton />} */}

      {/* nextauth */}
      <div className="flex max-[450px]:ml-auto">
        <div className="flex items-center">
          <DarkModeButton />
          <Image
            src={
              user?.image ||
              "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
            }
            className="mr-1"
            alt="user logo"
            width={20}
            height={20}
            quality={100}
          />
        </div>
        {user && (
          <span className="flex items-center max-[650px]:hidden">
            {user?.email}
          </span>
        )}
        {user && <LogoutButton />}
      </div>
    </nav>
  );
}
