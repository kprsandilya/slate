import axios from 'axios';
import { load } from 'cheerio';
import { NextResponse } from 'next/server';
import { getServerAuthSession } from "src/server/auth";
import prisma from 'src/app/api/prismaInstance';
import * as fs from 'fs';
import puppeteer from 'puppeteer';

export async function GET(req: Request) {

    async function fetchPageContent(url: string) {
        try {
            const response = await axios.get(url);
            return response.data; // Returns the HTML content of the page
        } catch (error) {
            console.error('Error fetching page content:', error);
        }
    }

    fetchPageContent('https://novelpia.com/viewer/3929317')
        .then(content => {
            require('fs').writeFileSync('./temp.html', content);
        });


    // const browser = await puppeteer.launch({
    //     headless: true, // Set to true to avoid developer mode
    //     args: ['--no-sandbox', '--disable-setuid-sandbox'],
    // });
    // const page = await browser.newPage();

    // await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36');
    // await page.setViewport({ width: 1280, height: 800 });
    // await page.goto('https://novelpia.com/');

    // // Step 1: Click the login icon
    // const loginIconSelector = '#naviconLeftMobile';
    // await page.waitForSelector(loginIconSelector, { visible: true });
    // await page.click(loginIconSelector);

    // // Step 2: Wait for the login form
    // const loginFormSelector = '#login_box';
    // await page.waitForSelector(loginFormSelector, { visible: true });

    // // Step 4: Enter email and password in the popup
    // await page.type('input[name="email"]', 'kprsandilya@gmail.com'); // Replace with your email
    // await page.type('input[name="wd"]', '!2YJvpBJMqpVHfD'); // Replace with your password

    // // Step 4: Submit the login form
    // await Promise.all([
    //     page.click('button[type="submit"]'),
    //     page.waitForNavigation({ waitUntil: 'networkidle0' }),
    // ]);

    // // Step 5: Wait for the alert and accept
    // page.on('dialog', async dialog => {
    //     console.log('Alert message:', dialog.message());
    //     await dialog.accept();
    // });

    // // Step 6: Navigate to the content page
    // await page.goto('https://novelpia.com/viewer/3929317', { waitUntil: 'networkidle0' });

    // // Step 7: Retrieve the page content
    // const content = await page.evaluate(() => {
    //     return document; // Replace with actual content selector
    // });

    // console.log(document)
    // writeToFile('./temp.html', "a");

    // await browser.close();


    // // Parse the URL to get the query parameters
    // const url = new URL(req.url);
    // const link = url.searchParams.get('link'); // Get the 'link' query parameter
    // const title = url.searchParams.get('title'); // Get the 'title' query parameter
    // const session = await getServerAuthSession();
    // let htmlBeforeRedirect = '';

    // console.log("ATTRIBUTES IN THE GETCHAPTER: " + link, title);

    // if (!link) {
    //     console.log("FAILED")
    //     return NextResponse.json({ error: 'Link query parameter is required' }, { status: 400 });
    // }

    // try {
    //     const browser = await puppeteer.launch({
    //         headless: true,
    //     });
    //     const page = await browser.newPage();
        
    //     // Set user agent and other headers
    //     await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36');
    //     await page.setExtraHTTPHeaders({
    //         'Referer': 'https://example.com',
    //         'Accept-Language': 'en-US,en;q=0.9'
    //     });
        
    //     // Enable request interception to capture responses (if you still need it)
    //     await page.setRequestInterception(true);
        
    //     // Optionally intercept the response
    //     page.on('response', async (response) => {
    //         const url = response.url();
    //         const status = response.status();
        
    //         console.log("PRE: " + url); // Log the URL of each response
        
    //         if (status < 400) {
    //             console.log(`Response from ${url} with status ${status}`);
    //         }
    //     });
        
    //     // Navigate to the link and wait for the page to load
    //     try {
    //         console.log('Navigating to:', link);
    //         await page.goto(link);
    //         console.log('Navigation complete');
        
    //         // Capture the HTML content after navigation
    //         const htmlContent = await page.content(); // Get the full HTML content of the page
    //         console.log('Captured HTML:', htmlContent); // Print or process the captured HTML content
        
    //         // Optionally, write to a file or process with Cheerio
    //         writeToFile('./temp.txt', htmlContent);
        
    //     } catch (error) {
    //         console.error('Failed to navigate:', error);
    //     }
        
    //     // Close the browser
    //     await browser.close();
        


    //     // Load the captured HTML into Cheerio
    //     const $ = load(htmlBeforeRedirect); // Load the HTML into Cheerio


    //     return NextResponse.json({ title: "scrapedTitle", img: "coverImg" }, { status: 200 });
    // } catch (error) { 
    //     console.error("ERROR HAS OCCURRED", error);
    //     return NextResponse.json({ error: "Failed to scrape the site" }, { status: 500 });
    // }
}

async function addNovel(title: string) {
    const existingNovel = await prisma.novel.findUnique({
        where: {
          name: title,  // 'title' is the string you are searching for
        },
      });
    
    // if (existingNovel) {
    //     console.log("Novel already exists:", existingNovel);
    //     return existingNovel; // Return the existing novel if found
    // } else {
    //     // If not found, create a new novel
    //     const newNovel = await prisma.novel.create({
    //         data: {
    //             kr_name: title,
    //             name: "",
    //             image: "",
    //             createdBy: "temp"
    //         },
    //     });
    //     console.log("New novel created:", newNovel);
    //     return newNovel;
    // }
}

// Function to write to a file
function writeToFile(filename: string, content: string): void {
    fs.writeFile(filename, content, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log(`File written successfully: ${filename}`);
        }
    });
}
