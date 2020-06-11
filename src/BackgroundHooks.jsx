import React, { useState } from 'react';
import * as PIXI from 'pixi.js';
import { TilingSprite, usePixiTicker, usePixiApp } from 'react-pixi-fiber';

import dayBackground from './assets/sprites/background-day.png';
import nightBackground from './assets/sprites/background-night.png';

const Background = () => {
  const { screen } = usePixiApp();

  const [xOffset, setXOffset] = useState(0);
  const [texture] = useState(
    PIXI.Texture.from(Math.random() < 0.5 ? dayBackground : nightBackground),
  );

  const onTick = (delta) => {
    let newXOffset = xOffset - delta * 2.0;
    if (newXOffset < -screen.width) {
      newXOffset += screen.width;
    }

    setXOffset(newXOffset);
  };

  usePixiTicker(onTick);

  return (
    <TilingSprite
      texture={texture}
      width={screen.width * 2}
      height={screen.height}
      x={xOffset}
    />
  );
};

export default Background;
