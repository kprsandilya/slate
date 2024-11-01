"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';

function encrypt(name: string) {
  return btoa(name); // Mock encryption (use actual encryption as needed)
}

export default function HomePage() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const encryptedValue = encrypt(inputValue);
    router.push(`/parse?query=${encodeURIComponent(encryptedValue)}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Enter Your Link
        </h1>
        <div className="flex items-center justify-center">
          <form className="text-slate-50" onSubmit={handleSubmit}>
            <label className="text-slate-50">
              <input
                name="query"
                className="text-blue-300"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button type="submit">Submit</button>
            </label>
          </form>
        </div>
      </div>
    </main>
  );
}
