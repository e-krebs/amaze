import { GetStaticProps } from 'next'
import { Maze } from '../components/Maze'
import { MazeData } from '../interfaces'
import { sampleMaze } from '../utils/sample-maze'
import 'tailwindcss/tailwind.css'
import { useEffect } from 'react'

type Props = {
  maze: MazeData;
}

const IndexPage = ({ maze }: Props) => {
  useEffect(() => { document.body.classList.add('bg-gray-50') });

  return (
    <main className="inline-flex flex-col items-center w-full p-8">
      <h1 className="text-4xl font-bold py-8">aMaze</h1>
      <Maze maze={maze} />
    </main>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  const maze: MazeData = sampleMaze
  return { props: { maze } }
}

export default IndexPage
