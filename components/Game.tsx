import { Item } from '@react-stately/collections'
import { useHotkeys } from 'react-hotkeys-hook'
import React, { useCallback, useMemo, useState } from 'react'

import { Card } from '../components/Card'
import { DropDown } from '../components/DropDown'
import { KeyCap } from '../components/KeyCap'
import { Maze } from '../components/Maze'
import { AllSizes, Cols, Size } from '../interfaces'
import { GameContext } from '../utils/contexts/GameContext'
import { generate } from '../utils/generate'
import { MazeData } from '../models/MazeData'

const Game = () => {
  const [size, setSize] = useState<Size>('XL');
  const [level, setLevel] = useState(1);
  const [loading, setLoading] = useState(false);
  const hasWon = useMemo(() => level > 4, [level])
  const maze: MazeData | null = useMemo(() => {
    if (hasWon) return null;
    setLoading(true);
    const newMaze = generate(level * 2 + 3 as Cols);
    setLoading(false);
    return newMaze;
  }, [level]);

  const reset = useCallback(() => {
    setLevel(0);
    setLevel(level => level + 1);
  }, []);

  useHotkeys('escape', reset);

  return (
    <>
      <Card className="space-x-2">
        <div className="flex items-center space-x-2 pt-3 pb-6">
          <h2 className="flex-grow text-center text-2xl font-semibold">
            {hasWon ? "You won 🎉" : `level ${level}`}
          </h2>
          <DropDown
            defaultSelectedKey={size}
            label="Size"
            onSelectionChange={(value) => setSize(value as Size)}
          >
            {AllSizes.map(size => <Item key={size}>{size}</Item>)}
          </DropDown>
        </div>

        <div className="flex space-x-2">
          <span>Press</span>
          <KeyCap keyCode="Esc" onClick={reset} className="w-7 h-7" />
          <span>to start a new game</span>
        </div>
      </Card>

      {hasWon ? (
        <Card className="text-pink-400 text-lg">
          <p className="p-6">
            You reached level {level - 1}
            <br />Congrats, you won 🎉
          </p>
        </Card>
      ) : (
        <>
          {loading ? (
              <Card className="text-green-400 text-lg">
                <p className="p-6">Generating maze...</p>
              </Card>
          ) : (
            <GameContext.Provider value={{
              level,
              currentMaze: maze!,
              nextMaze: () => setLevel(level => level + 1),
              size,
            }}>
              <Maze />
            </GameContext.Provider>

          )}
        </>
      )
      }
    </>
  );
};

export default Game;
