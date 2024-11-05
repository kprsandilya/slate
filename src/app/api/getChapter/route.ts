import axios from 'axios';
import { load } from 'cheerio';
import { NextResponse } from 'next/server';
import { getServerAuthSession } from "src/server/auth";
import prisma from 'src/app/api/prismaInstance';
import * as fs from 'fs';
import puppeteer from 'puppeteer';

export async function GET(req: Request) {
    const browser = await puppeteer.launch({
        headless: true, // Set to true to avoid developer mode
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36');
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto('https://novelpia.com/');

    // Step 1: Click the login icon
    const loginIconSelector = '#naviconLeftMobile';
    await page.waitForSelector(loginIconSelector, { visible: true });
    await page.click(loginIconSelector);

    // Step 2: Wait for the login form
    const loginFormSelector = '#login_box';
    await page.waitForSelector(loginFormSelector, { visible: true });

    // Step 4: Enter email and password in the popup
    await page.type('input[name="email"]', 'kprsandilya@gmail.com'); // Replace with your email
    await page.type('input[name="wd"]', '!2YJvpBJMqpVHfD'); // Replace with your password

    // Step 4: Submit the login form
    await Promise.all([
        page.click('button[type="submit"]'),
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);

    // Step 5: Wait for the alert and accept
    page.on('dialog', async dialog => {
        console.log('Alert message:', dialog.message());
        await dialog.accept();
    });

    // Step 6: Navigate to the content page
    await page.goto('https://novelpia.com/viewer/3929317', { waitUntil: 'networkidle0' });

    // Step 7: Retrieve the page content
    const content = await page.evaluate(() => {
        return document; // Replace with actual content selector
    });

    console.log(document)
    writeToFile('./temp.html', "a");

    await browser.close();

    return NextResponse.json({ title: "scrapedTitle", img: "coverImg" }, { status: 200 });
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
