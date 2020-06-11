import React, { useState, useEffect } from 'react';
import { Sprite, usePixiTicker, usePixiApp } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

import sprites from './sprites';
import { clamp } from '../utils';

const ANCHOR = new PIXI.Point(0.5, 0.5);
const MAX_VELOCITY = 6;

const FlippyBird = () => {
  const { screen, renderer, ticker } = usePixiApp();

  const initialAltitude = screen.height / 2;
  const [altitude, setAltitude] = useState(initialAltitude);
  const [yVelocity, setYVelocity] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [tapped, setTapped] = useState(false);

  useEffect(() => {
    const onScreenTap = renderer.plugins.interaction.on('pointerdown', () => {
      setTapped(true);
    });

    return () => {
      renderer.plugins.interaction.off('pointerdown', onScreenTap);
    };
  }, [renderer, setTapped]);

  usePixiTicker((delta) => {
    const newYVelocity = clamp(
      tapped ? -MAX_VELOCITY : yVelocity + delta * 0.2,
      -MAX_VELOCITY,
      MAX_VELOCITY,
    );
    const newRotation = (newYVelocity / MAX_VELOCITY) * (Math.PI / 2);
    const newAltitude = clamp(altitude + newYVelocity, 0, screen.height);

    if (tapped) {
      setTapped(false);
    }

    setYVelocity(newYVelocity);
    setRotation(newRotation);
    setAltitude(newAltitude);
  });

  useEffect(() => {
    console.log(ticker.count);
  });

  return (
    <Sprite
      x={screen.width / 2}
      y={altitude}
      anchor={ANCHOR}
      rotation={rotation}
      texture={PIXI.Texture.from(sprites.red.mid)}
    />
  );
};

FlippyBird.propTypes = {};

export default FlippyBird;
