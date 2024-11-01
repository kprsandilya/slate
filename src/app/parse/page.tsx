"use client"

//https://novelpia.com/novel/308608?sid=main5_con308608

import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import axios from "axios"
import { useState, useEffect } from "react";
import { load } from "cheerio"

export default function HomePage() {
    const searchParams = useSearchParams();
    const[decoded, setDecoded] = useState("");
    const link = searchParams.get('query');

    useEffect(() => {
        const link = searchParams.get('query');
        
        if (link) {
            setDecoded(atob(link)); // Decode the link and set the state
        } else {
            setDecoded("NOT A VALID LINK");
        }

        scrapeSite(decoded)

    }, [searchParams]); // Dependency array to rerun effect when searchParams changes

    async function scrapeSite(link: string) {
        console.log(link)
        // perform an HTTP GET request to the target page
        const response = await axios.get(link)
        // get the HTML from the server response
        // and log it
        const html = response.data

        const data = load(html)

        console.log(data)
      }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Your Link
            </h1>
            <div className="flex items-center justify-center">
                <h2>{decoded}</h2>
            </div>
        </div>
        </main>
    );
}
