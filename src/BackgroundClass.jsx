import React from 'react';
import * as PIXI from 'pixi.js';
import { TilingSprite, withApp } from 'react-pixi-fiber';

import dayBackground from './assets/sprites/background-day.png';
import nightBackground from './assets/sprites/background-night.png';

class Background extends React.PureComponent {
  state = {
    xOffset: 0,
    texture: PIXI.Texture.from(
      Math.random() < 0.5 ? dayBackground : nightBackground,
    ),
  };

  onTick = (delta) => {
    const { xOffset } = this.state;
    const { app } = this.props;

    let newXOffset = xOffset - delta * 2.0;
    if (newXOffset < -app.screen.width) {
      newXOffset += app.screen.width;
    }

    this.setState({
      xOffset: newXOffset,
    });
  };

  componentDidMount() {
    this.props.app.ticker.add(this.onTick);
  }

  componentWillUnmount() {
    this.props.app.ticker.remove(this.onTick);
  }

  render() {
    return (
      <TilingSprite
        texture={this.state.texture}
        width={this.props.app.screen.width * 2}
        height={this.props.app.screen.height}
        x={this.state.xOffset}
      />
    );
  }
}

export default withApp(Background);
