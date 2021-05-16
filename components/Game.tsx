import { sampleMaze0, sampleMaze1, sampleMaze2, sampleMaze3 } from '../utils/sample-maze'
import { Maze } from '../components/Maze'
import { Card } from '../components/Card'
import { KeyCap } from '../components/KeyCap'
import { GameContext } from '../utils/contexts/GameContext'
import { AllSizes, Size } from '../interfaces'
import { DropDown } from '../components/DropDown'
import { Item } from '@react-stately/collections'
import React, { useCallback, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

const Game = () => {
  const mazeList = [sampleMaze0, sampleMaze1, sampleMaze2, sampleMaze3];
  const [hasWon, setHasWon] = useState(false);
  const [size, setSize] = useState<Size>('XL');
  const [mazeIndex, setMazeIndex] = useState(0);
  const [state, updateState] = React.useState(0);
  const forceUpdate = React.useCallback(() => updateState(value => value + 1), []);

  const reset = useCallback(() => {
    setHasWon(false);
    setMazeIndex(0);
    forceUpdate();
  }, []);

  useHotkeys('enter', reset);

  return (
    <GameContext.Provider value={{ hasWon, setHasWon, mazeIndex, mazeList, setMazeIndex, size }}>
      <Card className="space-x-2">
        <div className="flex items-center space-x-2 pt-3 pb-6">
          <h2 className="flex-grow text-center text-2xl font-semibold">
            level {mazeIndex + 1}
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
          <KeyCap keyCode="↲" onClick={reset} className="w-7 h-7" />
          <span>to start a new game</span>
        </div>
      </Card>

      {hasWon ? (
        <Card className="text-pink-400 text-lg">You won 🎉</Card>
      ) : (
        <Maze key={state} />
      )}
    </GameContext.Provider>
  );
};

export default Game;
