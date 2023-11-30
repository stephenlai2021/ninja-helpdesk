import { NextResponse } from 'next/server'

/* supabase */
import createSupabaseServerClient from '@/config/supabase-server'

/* clerk */
import { authMiddleware, redirectToSignIn  } from '@clerk/nextjs';

/* supabase */
// export async function middleware(req, res) {
//   const res = NextResponse.next()
//   const supabase = await createSupabaseServerClient({ req, res })
//   await supabase.auth.getSession()
//   return res
// }

/* clerk */
export default authMiddleware({
  publicRoutes: ["/(auth)/sign-in", "/(auth)/sign-up", "/"],
  ignoredRoutes: ["/((?!api|trpc))(_next.*|.+\.[\w]+$)", "/(auth)/sign-in", "/(auth)/sign-up"],
  // debug: true,
  // afterAuth(auth, req, evt) {
  //   if (!auth.userId && !auth.isPublicRoute) {
  //     return redirectToSignIn({ returnBackUrl: req.url });
  //   }
  //   if(auth.userId && !auth.orgId && req.nextUrl.pathname !== "/"){
  //     const orgSelection = new URL('/', req.url)
  //     return NextResponse.redirect(orgSelection)
  //   }
  // }
}); 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};