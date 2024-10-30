"use client"

import { useSession, signIn, signOut } from "next-auth/react";

const Header = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  console.log("SESSION" + session)

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-2xl">My Application</h1>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : session ? (
          <>
            <span>Signed in as {session.user?.email}</span>
            <button onClick={() => signOut()} className="ml-4 p-2 bg-red-500 rounded">Sign Out</button>
          </>
        ) : (
          <button onClick={() => signIn()} className="p-2 bg-green-500 rounded">Sign In</button>
        )}
      </div>
    </header>
  );
};

export default Header;
