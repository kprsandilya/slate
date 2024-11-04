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
        const novel = searchParams.get('title');

        if (link) {
            setDecoded("https://novelpia.com" + atob(link)); // Decode the link and set the state
            setTitle(novel ?? ""); // Decode the link and set the state
        } else {
            setDecoded("NOT A VALID LINK");
            setTitle("NOT A VALID LINK");
        }
    }, [searchParams]); // Dependency array to rerun effect when searchParams changes
    

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
