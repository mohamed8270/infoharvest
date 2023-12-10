import { NextResponse } from "next/server";
import {connectToDB} from "@/lib/mongoose"
import { scrapeAmazonProduct } from "@/lib/scraper";
import Product from "@/lib/models/product.model";
import { getLowestPrice, getHighestPrice, getAveragePrice, getEmailNotifType } from "@/lib/utils";
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";


export const maxDuration = 300;
export const dynamic = 'force-dynamic'
export const revalidate = 0


export async function GET() {
    try {

        connectToDB();

        const prodcuts = await Product.find({});

        if(!prodcuts) return throw new Error("No products found");
        
        const updatedProducts = await Promise.all(
            prodcuts.map(async (currentProduct) => {
                const scrapedProduct = await scrapeAmazonProduct(currentProduct.url);

                if(!scrapedProduct) return throw new Error("No product found");

                const updatedPriceHistory = [
                    ...currentProduct.priceHistory,
                    {
                      price: scrapedProduct.currentPrice,
                    },
                  ];
          
                  const product = {
                    ...scrapedProduct,
                    priceHistory: updatedPriceHistory,
                    lowestPrice: getLowestPrice(updatedPriceHistory),
                    highestPrice: getHighestPrice(updatedPriceHistory),
                    averagePrice: getAveragePrice(updatedPriceHistory),
                  };
          
                  // Update Products in DB
                  const updatedProduct = await Product.findOneAndUpdate(
                    {
                      url: product.url,
                    },
                    product
                  );

                  // check each product and produce email
                  const emailNotifType = getEmailNotifType(scrapedProduct, currentProduct)

                  if(emailNotifType && updatedProduct.users.length > 0) {
                    const productInfo = {
                        title: updatedProduct.title,
                        url: updatedProduct.url,
                    }

                    const emailContent = await generateEmailBody(productInfo, emailNotifType);

                    const userEmails = updatedProduct.users.map((user: any) => user.email)

                    await sendEmail(emailContent, userEmails);

                  }

                return updatedProduct

            })
        )

        return NextResponse.json({
            message: 'OK', data: updatedPriceHistory
        })
    } catch (error) {
        throw new Error(`Error in GET: ${error}`);   
    }
}