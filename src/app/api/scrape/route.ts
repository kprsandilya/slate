import axios from 'axios';
import { load } from 'cheerio';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    // Parse the URL to get the query parameters
    const url = new URL(req.url);
    //console.log(req)
    const link = url.searchParams.get('link'); // Get the 'link' query parameter

    console.log("LINK" + link)

    if (!link) {
        return NextResponse.json({ error: 'Link query parameter is required' }, { status: 400 });
    }

    try {
        const response = await axios.get(link); // Fetch the HTML from the provided link
        const html = response.data;

        //console.log(html)

        const $ = load(html); // Load the HTML into Cheerio

        // Perform your scraping here, modify the selector as needed
        const data = $("div.epnew-novel-title").text() // Replace 'your-selector' with your actual selector

        console.log("DATA: " + data)

        return NextResponse.json({ data }, { status: 200 });
    } catch (error) { 
        //console.error("Error scraping:", error);
        console.error("ERROR HAS OCCURRED")
        return NextResponse.json({ error: "Failed to scrape the site" }, { status: 500 });
    }
}
