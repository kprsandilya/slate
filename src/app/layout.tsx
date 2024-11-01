import "~/styles/globals.css";
import { getSession } from "next-auth/react"
import Providers from "src/app/providers/provider"
import { type Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import Header from "./login"

export const metadata: Metadata = {
  title: "Slate",
  description: "Novel Parsing Application",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await getSession()

    return (
        <html lang="en" className={`${GeistSans.variable}`}>
            <body>
                <Providers session={session}>
                    <Header/>
                    {children}
                </Providers>
            </body>
        </html>
    )
}
