"use client"

import { signIn } from "next-auth/react";
import { FaDiscord } from "react-icons/fa";

export default function SignIn() {
  return (
    <div className="text-center">
      <h1 className="mt-8 text-xl font-bold">Sign In to Slate</h1>
      <p className="mx-auto max-w-md text-slate-400">
        If you do not already have an account, one will automatically be made
        for you.
      </p>
      <button onClick={() => signIn("discord", { callbackUrl: "/" })} className="mt-8">
        <div className = "flex flex-row">
            <FaDiscord className="mr-2 text-xl" /> Sign in with Discord
        </div>
      </button>
    </div>
  );
}