"use client"

//https://novelpia.com/novel/308608?sid=main5_con308608

import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import axios from "axios"
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { load } from "cheerio"

export default function HomePage() {
    const searchParams = useSearchParams();
    const [decoded, setDecoded] = useState("");
    const [title, setTitle] = useState("");
    const [img, setImg] = useState("");
    const [first_chapter, setFirst] = useState(0);

    const router = useRouter();

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
        try {
            // Perform an HTTP GET request to your own API route
            const response = await axios.get(`/api/scrape?link=${encodeURIComponent(link)}`);
            console.log(response.data);
            setTitle(response.data.title);
            setImg(response.data.img);
            setFirst(response.data.first_chapter);
        } catch (error) {
            console.error("Error scraping the site:", error);
        }
    }

    function switchPage() {
        const firstChapterPath = btoa("/viewer/" + first_chapter);
        const searchParams = new URLSearchParams({
            query: firstChapterPath,
            title: title, // Add any other parameters here
        });
    
        const encoded: string = "/novel?" + searchParams.toString();
        router.push(encoded);
    }
    

    return (
        <main className="flex min-h-screen flex-col items-center justify-center gradient-t3 text-white">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
                <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                    Your Link
                </h1>
                <div className="flex items-center justify-center">
                    <h2>{decoded}</h2>
                </div>
                <div className="flex flex-col items-center justify-center">
                    {title && (
                        <div className="flex flex-col items-center">
                            <h2>{title}</h2>
                            <button className="mt-4" onClick={switchPage}>
                                Click here to continue processing if correct
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
