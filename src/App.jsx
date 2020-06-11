import React from 'react';
import { Stage } from 'react-pixi-fiber';

import FlippyBird from './FlippyBird/FlippyBird';
import Background from './Background';
import './App.css';

const WIDTH = 288;
const HEIGHT = 512;

const App = () => {
  return (
    <Stage className="pixi-stage" width={WIDTH} height={HEIGHT}>
      <Background />
      <FlippyBird />
    </Stage>
  );
};

export default App;
