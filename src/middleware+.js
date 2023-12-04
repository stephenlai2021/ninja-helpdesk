import { NextResponse } from "next/server";

// export async function handleSupabaseAuthMiddleware(req) {
//   const supabase = await createSupabaseServerClient();
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();
//   console.log("user session | middle: ", session?.user);

//   if (req.page.name === "/" && (!session || !session?.user))
//     return NextResponse.redirect("/login");
//   if (
//     (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signup") &&
//     session?.user
//   )
//     return NextResponse.redirect("/");
//   return NextResponse.next();
// }

/* supabase */
import createSupabaseServerClient from '@/config/supabase-server'
export async function handleSupabaseUserSessionMiddleware(req, res) {
  const supabase = await createSupabaseServerClient({ req, res })
  await supabase.auth.getSession()
  return NextResponse.next()
}

/* clerk */
// import { authMiddleware, redirectToSignIn  } from '@clerk/nextjs';
// export default authMiddleware({
//   publicRoutes: ["/(auth)/sign-in", "/(auth)/sign-up", "/"],
//   ignoredRoutes: ["/((?!api|trpc))(_next.*|.+\.[\w]+$)", "/(auth)/sign-in", "/(auth)/sign-up"]
// });
// export const config = {
//   matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
// };

/* nextauth */
// import { getServerSession } from "next-auth";
// import { withAuth, default } from "next-auth/middleware"
// export default withAuth({
//   pages: {
//     login: '/(auth)/login',
//     signup: '/(auth)/signup'
//   }
// })
// export const config = { matcher: ["/"] }
