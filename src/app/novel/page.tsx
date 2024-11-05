"use client"

//https://novelpia.com/novel/308608?sid=main5_con308608

import { useSearchParams, usePathname } from 'next/navigation';
import axios from "axios"
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function HomePage() {
    const searchParams = useSearchParams();
    const [decoded, setDecoded] = useState("");
    const pathname = usePathname();
    const [title, setTitle] = useState("");
    const [done, setDone] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const link = searchParams.get('query');
        const novel = searchParams.get('title');
    
        console.log(link);
    
        if (link) {
            const decodedLink = "https://novelpia.com" + atob(link); // Decode the link
            setDecoded(decodedLink); // Set the decoded link
            setTitle(novel ?? ""); // Set the title
    
            console.log("ATTRIBUTES: " + novel + " " + decodedLink); // Log the values directly
    
            // Check for conditions to call addNovel only once
            if (novel && decodedLink && !done) {
                addNovel(novel, decodedLink); // Pass both directly
                setDone(true); // Move setDone here to ensure it only updates once
            }
        } else {
            setDecoded("NOT A VALID LINK");
            setTitle("NOT A VALID LINK");
        }
    }, [searchParams, pathname, done]); // Add 'done' to dependencies
    
    

    async function addNovel(title: string, decoded: string) {
        try {
            // Perform an HTTP GET request to your own API route
            const response = await axios.get(`/api/getChapter?title=${title}&link=${decoded}`);
            console.log("GOT RESPONSE")
            setDone(true);
            //console.log(response.data);
        } catch (error) {
            console.error("Error scraping the site:", error);
        }
    }
    

    return (
        <main className="flex min-h-screen flex-col items-center justify-center slate text-white">
            <div className="w-[1220px] centered">
                <div className="grid grid-cols-3 w-full">
                    <div className="bg-green-200 gap-4 p-4">
                        <div className="flex items-center justify-center">
                            {decoded && (
                                <>
                                    <div className="">
                                        <h2>{decoded}</h2>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="bg-green-200 gap-4 p-4 col-span-2">
                        <div className="flex items-center justify-center">
                            {title && (
                                <>
                                    <div className="">
                                        <h2>{title}</h2>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
