// import NextAuth from "next-auth";
// import GitHubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";

// export const authOptions = {
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID ?? "",
//       clientSecret: process.env.GITHUB_SECRET ?? "",
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET_2
//     }),
//   ],
//   pages: {
//     login: '/(auth)/login',
//     signup: '/(auth)/signup'
//   }
// };
// export const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/user";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            }
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/(auth)/login"
  },
  // callbacks: {
  //   async signIn({ user, account }) {
  //     if (account?.provider === "credentials") {
  //       return true;
  //     }
  //     if (account?.provider === "github") {
  //       try {
  //         const existingUser = await User.findOne({ email: user.email });
  //         if (!existingUser) {
  //           const newUser = new User({
  //             email: user.email,
  //           });

  //           await newUser.save();
  //           return true;
  //         }
  //         return true;
  //       } catch (err) {
  //         console.log("Error saving user", err);
  //         return false;
  //       }
  //     }
  //   },
  // },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
