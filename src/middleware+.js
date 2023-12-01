import { NextResponse } from 'next/server'

/* nextjs */
// export function middleware(request) {
//   return NextResponse.json({ message: 'Haudy, partner !' })
// }

/* supabase */
// import createSupabaseServerClient from '@/config/supabase-server'
// export async function middleware(req, res) {
//   const res = NextResponse.next()
//   const supabase = await createSupabaseServerClient({ req, res })
//   await supabase.auth.getSession()
//   return res
// }

/* clerk */
// import { authMiddleware, redirectToSignIn  } from '@clerk/nextjs';
// export default authMiddleware({
//   publicRoutes: ["/(auth)/sign-in", "/(auth)/sign-up", "/"],
//   ignoredRoutes: ["/((?!api|trpc))(_next.*|.+\.[\w]+$)", "/(auth)/sign-in", "/(auth)/sign-up"]
// }); 
// export const config = {
//   matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
// };

/* next-auth */
// import { withAuth } from "next-auth/middleware"
// export default withAuth(
//   function middleware (req) {
//   },
//   {
//     callbacks: {
//       authorized: ({ req, token }) => {
//         if (
//           req.nextUrl.pathname.startsWith('/') &&
//           token === null
//         ) {
//           return false
//         }
//         return true
//       }
//     }
//   }
// )