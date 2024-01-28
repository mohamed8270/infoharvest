import Head from 'next/head';
import Image from 'next/image'
import HeroSection from "../components/HeroSection";

export default function Home() {
  return (
    <div className='bg-white'>
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6678637984319183"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <HeroSection/>
    </div>
  )
}
