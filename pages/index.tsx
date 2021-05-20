import { useRouter } from 'next/router';
import React from 'react'
import { useHotkeys } from 'react-hotkeys-hook';

import { Card, ExternalLink, KeyCap } from '../components/elements';
import Github from '../static/github.svg';

const IndexPage = () => {
  const { push } = useRouter();
  useHotkeys('escape', () => { push('/level/1'); });

  return (
    <>
      <Card className="flex flex-col items-center space-y-4">
        <span>Welcome to aMaze 😀</span>
        <span>This is an experimental game.</span>
        <span>Each maze is randomly generated.</span>
        <p className="text-center">
          Each time you solve a maze,
          <br />the next one is bigger!
        </p>
        <span>Until the last one.</span>
        <span>Have fun!</span>
        <div className="flex space-x-2 pt-6">
          <span>Press</span>
          <KeyCap keyCode="Esc" href="/level/1" className="w-7 h-7" />
          <span>to start a new game</span>
        </div>
      </Card >

      <Card className="flex flex-col items-center space-y-2">
        <div>
          You can find the source code{' '}
          <ExternalLink
            href="https://github.com/e-krebs/amaze"
            title="sources available on github"
            className="inline-flex space-x-2 group"
          >
            <span>on github</span>
            <Github className="w-6 h-6 opacity-50 group-hover:opacity-75" />
          </ExternalLink>
        </div>
        <div className="inline-flex space-x-2">
          <span>Made by</span>
          <ExternalLink
            href="https://github.com/e-krebs"
            title="e-krebs on Github"
          >
            e-krebs
          </ExternalLink>
        </div>
      </Card>
    </>
  );
};

export default IndexPage;
