import Phaser from 'phaser'

import PlayScene from './scenes/PlayScene'
import PreloadScene from './scenes/PreloadScene'

const WIDTH = 600 ;
const HEIGHT = 320 ;
const BIRD_POSITION = { x: WIDTH * 0.1, y: HEIGHT / 2 };

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: BIRD_POSITION,
};

const Scenes = [PreloadScene, PlayScene];
const createScene = (Scene) => new Scene(SHARED_CONFIG);

const initScenes = () => Scenes.map(createScene);

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	...SHARED_CONFIG,
	physics: {
		default: 'arcade',
	},
	scene: initScenes()
}

export default new Phaser.Game(config)
