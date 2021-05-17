import { Item } from '@react-stately/collections'
import { useHotkeys } from 'react-hotkeys-hook'
import React, { useCallback, useEffect, useState } from 'react'

import { Card } from '../components/Card'
import { DropDown } from '../components/DropDown'
import { KeyCap } from '../components/KeyCap'
import { Maze } from '../components/Maze'
import { AllSizes, Size } from '../interfaces'
import { sampleMaze0, sampleMaze1, sampleMaze2, sampleMaze3 } from '../utils/sample-maze'
import { GameContext } from '../utils/contexts/GameContext'

const Game = () => {
  const mazeList = [sampleMaze0, sampleMaze1, sampleMaze2, sampleMaze3];
  const [mazeIndex, setMazeIndex] = useState(0);
  const [maze, setMaze] = useState(mazeList[mazeIndex]);
  const [hasWon, setHasWon] = useState(false);
  const [size, setSize] = useState<Size>('XL');
  const [key, forceUpdate] = React.useState(0);

  useEffect(() => {
    if (mazeIndex > mazeList.length - 1) {
      setHasWon(true);
    } else {
      setMaze(mazeList[mazeIndex]);
    }
  }, [mazeIndex]);

  const reset = useCallback(() => {
    setHasWon(false);
    setMazeIndex(0);
    forceUpdate(value => value + 1);
  }, []);

  useHotkeys('escape', reset);

  return (
    <GameContext.Provider value={{
      level: mazeIndex + 1,
      currentMaze: maze,
      nextMaze: () => setMazeIndex(value => value + 1),
      size,
    }}>
      <Card className="space-x-2">
        <div className="flex items-center space-x-2 pt-3 pb-6">
          <h2 className="flex-grow text-center text-2xl font-semibold">
            {hasWon ? "You won 🎉" : `level ${mazeIndex + 1}`}
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
          <p>
            You reached level {mazeIndex}
            <br />Congrats, you won 🎉
          </p>
        </Card>
      ) : (
        <Maze key={key} />
      )}
    </GameContext.Provider>
  );
};

export default Game;
