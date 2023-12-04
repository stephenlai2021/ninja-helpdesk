import "./globals.css";
import { Rubik } from "next/font/google";

/* context */
import { CounterContextProvider } from "@/context/counter";

/* clerk */
import { ClerkProvider } from "@clerk/nextjs";

/* next-auth */
import SessionProvider from "@/components/SessionProvider"; // for client components

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "Ninja Helpdesk",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* suppressHydrationWarning={true} is used to suppress Extra attributes from the server: cz-shortcut-listen */}
      <body className={rubik.className} suppressHydrationWarning={true}>
        <CounterContextProvider>{children}</CounterContextProvider>
      </body>
    </html>
  );
}
