"use client"

import React, {useState, FormEvent} from 'react'
import {scrapeAndStoreProduct} from "../lib/actions/index";

const SearchBar = () => {

  const isValidAmazonProductURL = (url: string) => {
    try {
      const parsedURL = new URL(url);
      const hostname = parsedURL.hostname;

      if (
          hostname.includes('amazon.com') || 
          hostname.includes('amazon.') ||
          hostname.endsWith('amazon')
          ) {
            return true;
          }
    } catch (error) {
      return false;
    }
    return false;
  }

  const [SearchPrompt, setSearchPrompt] = useState('');
  const [IsLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValidLink = isValidAmazonProductURL(SearchPrompt);
    
    if (!isValidLink) return alert('Please enter a valid amazon link');
    try {
      setIsLoading(true);
      const product = await scrapeAndStoreProduct(SearchPrompt);
      setSearchPrompt('');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

return (
    <form className='flex flex-wrap mt-[40px] gap-4' onSubmit={handleSubmit}>
        <input value={SearchPrompt} onChange={(e) => setSearchPrompt(e.target.value)} type="text" placeholder='Enter the product link' className='text-[14px] font-light text-Ilightblack h-[40px] sm:w-[380px] w-[260px] pl-[10px] pr-[10px] border-2 border-gray-200 rounded-lg focus:border-Ired focus:outline-none' />
        <button type='submit' disabled={SearchPrompt === ''} className='h-[40px] w-[85px] text-[12px] text-Iwhite font-medium bg-Ired rounded-lg'>{IsLoading ? 'Searching..' : 'Search'}</button>
    </form>
  )
}

export default SearchBar