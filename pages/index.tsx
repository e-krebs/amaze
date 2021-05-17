import 'tailwindcss/tailwind.css'
import React from 'react'
import dynamic from 'next/dynamic';
import Head from 'next/head'
import Github from '../static/github.svg';

const GameWithNoSSR = dynamic(
  () => import('../components/Game'),
  { ssr: false }
)

const IndexPage = () => (
  <>
    <Head>
      <title>aMaze</title>
      <meta name="description" content="aMaze is a small game about solving mazes." />
    </Head>
    <main className="inline-flex flex-col items-center w-full p-6">
      <header className="flex items-baseline w-full lg:w-1/4 pb-6">
        <h1 className="flex-grow text-center px-8 text-4xl font-bold">aMaze</h1>
        <a
          href="https://github.com/e-krebs/amaze"
          target="_blank"
          rel="noopener"
          className="w-6 h-6 opacity-50 hover:opacity-75"
          title="Sources available on github."
        >
          <Github />
        </a>
      </header>
      <GameWithNoSSR />
    </main>
  </>
);

export default IndexPage;
