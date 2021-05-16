import 'tailwindcss/tailwind.css'
import React from 'react'
import dynamic from 'next/dynamic';
import Head from 'next/head'

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
    <main className="inline-flex flex-col items-center w-full p-8">
      <h1 className="text-4xl font-bold py-8">aMaze</h1>
      <GameWithNoSSR />
    </main>
  </>
);

export default IndexPage;
