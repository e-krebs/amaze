import 'tailwindcss/tailwind.css';

import React, { FC } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import Link from 'next/link';

const SafeHydrate: FC = ({ children }) => {
  return (
    <div suppressHydrationWarning className="contents w-full lg:w-max">
      {typeof window === 'undefined' ? null : children}
    </div>
  )
}

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>aMaze</title>
      <meta name="description" content="aMaze is a small game about solving mazes." />
    </Head>
    <main className="inline-flex flex-col items-center w-full p-6">
      <header className="flex items-baseline w-full lg:w-1/4 pb-6">
        <Link href="/">
          <h1 className="flex-grow text-center px-8 text-4xl font-bold cursor-pointer hover:text-pink-600 hover:underline">
            aMaze
          </h1>
        </Link>
      </header>
      <SafeHydrate>
        <Component {...pageProps} />
      </SafeHydrate>
    </main>
  </>
);

export default MyApp;
