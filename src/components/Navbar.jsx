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
        as='image'
        placeholder='blur'
        quality={100}
      />
      <h1>Dojo Helpdesk</h1>
      <Link href="/">Dashboard</Link>
      <Link href="/tickets" className="mr-auto">Tickets</Link>
      {user && <span>Haudy, {user?.email || partner} !</span>}
      {user && <LogoutButton />}
    </nav>
  )
}