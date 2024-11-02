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
            setDecoded("https://novelpia.com" + atob(link)); // Decode the link and set the state
        } else {
            setDecoded("NOT A VALID LINK");
        }
    }, [searchParams]); // Dependency array to rerun effect when searchParams changes
    

    return (
        <main className="flex min-h-screen flex-col items-center justify-center gradient-slate text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Your Link
            </h1>
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
        </main>
    );
}
