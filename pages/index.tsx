import { GetStaticProps } from 'next'
import { Maze } from '../components/Maze'
import { MazeData } from '../interfaces'
import { sampleMaze } from '../utils/sample-maze'
import 'tailwindcss/tailwind.css'

type Props = {
  maze: MazeData;
}

const IndexPage = ({ maze }: Props) => (
  <main className="p-8">
    <h1 className="text-4xl font-bold text-center py-8">aMaze</h1>
    <Maze maze={maze} />
  </main>
)

export const getStaticProps: GetStaticProps = async () => {
  const maze: MazeData = sampleMaze
  return { props: { maze } }
}

export default IndexPage
