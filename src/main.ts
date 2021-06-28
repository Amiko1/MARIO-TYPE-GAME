import Phaser from 'phaser';

import PlayScene from './scenes/lvl1/PlayScene';
import PreloadScene from './scenes/lvl1/PreloadScene';

export interface SharedConfig {
  width: number;
  height: number;
  startPosition: { x: number; y: number };
  debug: boolean
}

const WIDTH = 600;
const HEIGHT = 320;
const BIRD_POSITION = { x: WIDTH * 0.1, y: HEIGHT / 2 };

const SHARED_CONFIG: SharedConfig = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: BIRD_POSITION,
  debug: false,
};

const Scenes = [PreloadScene, PlayScene];
const createScene = (Scene) => new Scene(SHARED_CONFIG);

const initScenes = () => Scenes.map(createScene);

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: 'arcade',
    arcade: {
      debug: SHARED_CONFIG.debug,
    }
    //
  },
  scene: initScenes(),
};

export default new Phaser.Game(config);
