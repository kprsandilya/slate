"use client"

import { useSession, signIn, signOut } from "next-auth/react";

const Header = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  console.log("SESSION" + session)

  return (
    <div className="">
      <header className="flex justify-between items-center gradient-slate p-4 bg-gray-800 text-white outline outline-2 outline-cyan-500">
      <div className="w-[1220px] centered">
        <div className="text-2xl justify-start flex flex-row justify-between gap-8">
          <h1 className="">My Application</h1>
          <h1 className="">My Application</h1>
        </div>
          <div className="flex items-end">
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
        </div>
      </header>
    </div>
  );
};

export default Header;
