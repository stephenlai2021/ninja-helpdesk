import Link from 'next/link'
import Image from 'next/image'
import Logo from './dojo-logo.png'
import LogoutButton from './LogoutButton'

export default function Navbar({ user }) {
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
      {user && <span>{user?.email}</span>}
      {user && <LogoutButton />}
      
      {/* next-auth */}
      {/* <Image 
        src={user.image}
        className='pr-'
        alt="user logo"
        width={30}
        height={30}
        quality={100}
      />
      {user && <LogoutButton />} */}
    </nav>
  )
}