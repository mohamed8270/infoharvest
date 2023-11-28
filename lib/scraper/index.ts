import axios from "axios";
import * as cheerio from "cheerio";
import {extractPrice} from '../utils';


export async function scrapeAmazonProduct(url: string) {
    if(!url) return;


    // BrightData Proxy Configuration
    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    const port = 222225;
    const session_id = (1000000 * Math.random()) | 0;
    const options = {
        auth:{
            username: `${username}-session-${session_id}`,
            password,
        },
        host: 'brd.superproxy.io',
        port,
        rejectUnauthorized: false,
    }

    try {
        // Fecth The Page Data
        const response = await axios.get(url, options);
        const $ = cheerio.load(response.data); 

        // Extract the Product Title
        const title = $('#title').text().trim();
        
        const currentPrice = extractPrice(
            $('.priceToPay span.a-price-whole'),
            $('.a.size.base.a-color-price'),
            $('.a-button-selected .a-color-base'),
        );

        console.log({title, currentPrice});
        // console.log(response.data);
    } catch (error: any) {
        throw new Error(`Failed to Scrape Data: ${error.message}`);
    }

}