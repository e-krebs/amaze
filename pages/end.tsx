import React from 'react'
import { useRouter } from 'next/router';
import { Card, KeyCap } from '../components/elements';
import { useHotkeys } from 'react-hotkeys-hook';

const IndexPage = () => {
  const { push } = useRouter();
  useHotkeys('escape', () => { push('/level/1'); });

  return (
    <Card className="text-lg">
      <p className="p-6 text-green-400">Congrats, you won 🎉</p>
      <div className="flex space-x-2">
        <span>Press</span>
        <KeyCap keyCode="Esc" href="/level/1" className="w-7 h-7" />
        <span>to start a new game</span>

      </div>
    </Card>
  )
};

export default IndexPage;
