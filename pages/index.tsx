import 'tailwindcss/tailwind.css'
import React, { useEffect } from 'react'
import dynamic from 'next/dynamic';

const GameWithNoSSR = dynamic(
  () => import('../components/Game'),
  { ssr: false }
)

const IndexPage = () => {

  useEffect(() => { document.body.classList.add('bg-gray-50') });

  return (
    <main className="inline-flex flex-col items-center w-full p-8">
      <h1 className="text-4xl font-bold py-8">aMaze</h1>
      <GameWithNoSSR />
    </main>
  );
}

export default IndexPage;
