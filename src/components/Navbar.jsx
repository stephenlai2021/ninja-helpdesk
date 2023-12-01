import Link from 'next/link'
import Image from 'next/image'
import Logo from './dojo-logo.png'
import LogoutButton from './LogoutButton'

/* clerk */
// import { ClerkProvider, auth, currentUser } from "@clerk/nextjs";

/* next-auth */
import { getServerSession } from "next-auth";

export default async function Navbar({ user }) {
// export default async function Navbar() {
  /* clerk */
  // const user = await currentUser()
  // console.log('user | navbar: ', user._User)

  /* next-auth */
  // const session = await getServerSession();
  // console.log("session | navbar: ", session);
  // const user = session?.user
  // console.log("user | navbar: ", session?.user);

  return (
    <nav>
      <Image
        src={Logo}
        className='pl-4'
        alt='Dojo Helpdesk logo'
        width={70}
        placeholder='blur'
        quality={100}
      />
      <h1>Dojo Helpdesk</h1>
      <Link href="/">Dashboard</Link>
      <Link href="/tickets" className="mr-auto">Tickets</Link>

      {/* supabase */}
      {/* {user && <span>{user?.email}</span>}
      {user && <LogoutButton />} */}

      {/* clerk */}
      {/* {user && <LogoutButton />} */}
      
      {/* next-auth */}
      {/* <Image 
        src={user?.image || "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"}
        className='pr-'
        alt="user logo"
        width={30}
        height={30}
        quality={100}
        /> */}
      {user && <span>{user?.email}</span>}
      {user && <LogoutButton />}
    </nav>
  )
}