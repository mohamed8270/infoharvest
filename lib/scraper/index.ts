import axios from "axios";
import * as cheerio from "cheerio";
import {extractPrice, extractCurreny, extractDiscription} from '../utils';


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

        const originalPrice = extractPrice(
            $('#priceblock_ourprice'),
            $('.a-price.a-text-price span.a-offscreen'),
            $('#listPrice'),
            $('#priceblock_dealprice'),
            $('.a-size-base.a-color-price')
        );

        // const outOfStock = $('#availability span').text().trim().toLowerCase() === 'Currently Unavailable';
        const outOfStock = $('#availability span').text().trim();

        const images = $('#imgBLKFront').attr('data-a-dynamic-image') ||
                      $('#landingImage').attr('data-a-dynamic-image') ||
                      '{}'
        const imageURL = Object.keys(JSON.parse(images));

        const currency = extractCurreny(
            $('.a-price-symbol')
        );

        const discoutPercentage = $('.savingsPercentage').text().replace(/[-%]/g, "");

        const discription = extractDiscription(
            $('#productDescription_feature_div')
            // $('#descriptionInlineExpansionPrimaryContent span')
        );


        const data = {
            url,
            image: imageURL[0],
            title,
            currency: currency || '₹',
            currentPrice: Number(currentPrice),
            originalPrice: Number(originalPrice),
            priceHistory: [],
            discoutPercentage: Number(discoutPercentage),
            category: 'category',
            reviewsCount: 50,
            stars: 4.5,
            inOutOfStock: outOfStock,
        };
     
        console.log(data);

        // console.log({title, currentPrice, originalPrice, outOfStock, imageURL, currency, discoutPercentage, discription});
        // console.log(response.data);
    } catch (error: any) {
        throw new Error(`Failed to Scrape Data: ${error.message}`);
    }

}