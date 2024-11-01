"use client"

//https://novelpia.com/novel/308608?sid=main5_con308608

import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import axios from "axios"
import { useState, useEffect } from "react";
import { load } from "cheerio"

export default function HomePage() {
    const searchParams = useSearchParams();
    const [decoded, setDecoded] = useState("");
    const [title, setTitle] = useState("")
    const link = searchParams.get('query');

    useEffect(() => {
        const link = searchParams.get('query');

        if (link) {
            setDecoded(atob(link)); // Decode the link and set the state
        } else {
            setDecoded("NOT A VALID LINK");
        }
    }, [searchParams]); // Dependency array to rerun effect when searchParams changes

    // Add another useEffect to scrape the site when decoded changes
    useEffect(() => {
        if (decoded && decoded !== "NOT A VALID LINK") {
            scrapeSite(decoded);
        }
    }, [decoded]); // This effect runs when `decoded` changes

    async function scrapeSite(link: string) {
        console.log("CLIENT: " + link);
        try {
            // Perform an HTTP GET request to your own API route
            const response = await axios.get(`/api/scrape?link=${encodeURIComponent(link)}`);
            setTitle(response.data.data)
        } catch (error) {
            console.error("Error scraping the site:", error);
        }
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
            <div className="flex items-center justify-center">
                {title && (
                    <div className="initialized-div">
                        <h2>{title}</h2>
                    </div>
                )}
            </div>
        </div>
        </main>
    );
}
