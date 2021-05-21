import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Item } from '@react-stately/collections';
import { useHotkeys } from 'react-hotkeys-hook';

import { AllSizes, Cols, Size } from '../../interfaces';
import { GameContext } from '../../utils/contexts/GameContext';
import { generate } from '../../utils/generate';
import { Card, DropDown, KeyCap } from '../../components/elements';
import { Maze } from '../../components/Maze';
import { MazeData } from '../../models/MazeData';

const LevelPage = () => {
  const { query, push } = useRouter();

  const [size, setSize] = useState<Size>('XL');

  const [loading, setLoading] = useState(true);
  const [maze, setMaze] = useState<MazeData | null>(null);

  const level: number | null = useMemo(() => {
    setLoading(true);
    if (!query.level) return null;
    let result = parseInt(query.level as string);
    return isNaN(result) ? 1 : result;
  }, [query.level]);

  useEffect(() => {
    if (level === null) return;

    const getMaze = async () => {
      const waiter = new Promise<void>((resolve) => {
        setTimeout(() => { resolve(); }, 250);
      })
      const [newMaze] = await Promise.all<MazeData, void>([generate(level * 2 + 3 as Cols), waiter]);
      setMaze(newMaze);
      setLoading(false);
    };
    getMaze();
  }, [level]);

  useHotkeys('escape', () => { push('/level/1'); });

  return (
    <>
      <Card className="space-x-2" width="w-full lg:w-max">
        <div className="flex items-center space-x-2 pt-3 pb-6">
          <h2 className="flex-grow text-center text-2xl font-semibold">
            level {level}
          </h2>
          <DropDown
            selectedKey={size}
            label="Size"
            onSelectionChange={(value) => setSize(value as Size)}
          >
            {AllSizes.map(size => <Item key={size}>{size}</Item>)}
          </DropDown>
        </div>

        <div className="flex space-x-2">
          <span>Press</span>
          <KeyCap keyCode="Esc" href="/level/1" className="w-7 h-7" />
          <span>to start a new game</span>
        </div>
      </Card>
      {loading ? (
        <Card className="text-green-400 text-lg">
          <p className="p-6">Generating level {level} maze...</p>
        </Card>
      ) : (
        <GameContext.Provider value={{
          level: level!,
          currentMaze: maze!,
          nextMaze: () => push(level! >= 4 ? '/end' : `/level/${level! + 1}`),
          size,
          setSize,
        }}>
          <Maze />
        </GameContext.Provider>

      )}
    </>
  )
};

export default LevelPage;
